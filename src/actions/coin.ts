"use server";

import prisma from "@/helpers/prisma";
import { findOrCreateCreator } from "@/actions/creator";
import { Prisma, PrismaPromise } from "@prisma/client";
import { headers } from "next/headers";
import { pinata, s3 } from "@/helpers/file-storage";
import QueryMode = Prisma.QueryMode;
import SortOrder = Prisma.SortOrder;

export async function ensureRequestOrigin() {
  if (typeof window !== "undefined") {
    throw new Error("This function must be used on the server-side");
  }

  const allowedOrigins = ["https://www.pumper.lol", "http://localhost:3000"];
  const requestOrigin = headers().get("origin") as string;

  if (!allowedOrigins.includes(requestOrigin)) {
    throw new Error("Invalid request origin");
  }
}

export async function createCoin(form: FormData) {
  await ensureRequestOrigin();

  let IpfsHash = "";
  try {
    const image = form.get("image") as File;
    const data = (await pinata.upload.file(image)) as {
      IpfsHash: string;
    };
    IpfsHash = data.IpfsHash;
  } catch (error) {
    throw new Error("Error uploading image");
  }

  const creator = (await findOrCreateCreator(
    (form.get("creatorAddress") as string).toLowerCase(),
  )) as { id: string };

  return prisma.coin.create({
    data: {
      name: form.get("name") as string,
      symbol: form.get("symbol") as string,
      description: form.get("description") as string,
      imageUrl: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/ipfs/${IpfsHash}`,
      twitterUrl: form.get("twitterUrl") as string,
      telegramUrl: form.get("telegramUrl") as string,
      websiteUrl: form.get("websiteUrl") as string,
      discordUrl: form.get("discordUrl") as string,
      address: (form.get("address") as string).toLowerCase(),
      creator: {
        connect: {
          id: creator.id,
        },
      },
    },
  }) as unknown as PrismaPromise<Coin>;
}

export async function getCoin(id: string) {
  return prisma.coin.findFirst({
    where: {
      OR: [{ id }, { address: id }],
    },
    include: {
      creator: true,
    },
  }) as unknown as PrismaPromise<Coin>;
}

type Metadata = {
  imageUrl?: string | undefined;
  description?: string | undefined;
  title: string | undefined;
};

export async function getCoinMetadata(id: string): Promise<Metadata> {
  const coin = (await prisma.coin.findFirst({
    where: {
      OR: [{ id }, { address: id }],
    },
    select: {
      name: true,
      imageUrl: true,
      description: true,
    },
  })) as Partial<Coin>;

  if (!coin)
    return {
      title: "Not found",
    };
  return {
    title: coin?.name,
    description: coin?.description,
    imageUrl: coin?.imageUrl,
  };
}

export async function getCoins({
  page,
  search,
}: { page?: number; search?: string } = {}) {
  const where = search
    ? {
        OR: [
          { address: { contains: search, mode: QueryMode.insensitive } },
          { symbol: { contains: search, mode: QueryMode.insensitive } },
          { name: { contains: search, mode: QueryMode.insensitive } },
        ],
      }
    : {};
  const [data, length] = await Promise.all([
    prisma.coin.findMany({
      where: where,
      include: {
        creator: true,
      },
      skip: page && page > 0 ? (page - 1) * 60 : 0,
      take: 60,
      orderBy: {
        createdAt: SortOrder.desc,
      },
    }) as unknown as PrismaPromise<Coin[]>,
    prisma.coin.count({ where }),
  ]);
  return { data: data as Coin[], length: length as number };
}

async function uploadToSpaces(file: File): Promise<string> {
  // Generate a unique filename
  const extension = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}.${extension}`;

  // Convert File to Buffer
  // Upload to DigitalOcean Spaces
  const uploadParams = {
    Bucket: process.env.SPACES_BUCKET_NAME,
    Key: `coins/${filename}`,
    Body: Buffer.from(await file.arrayBuffer()),
    ACL: "public-read",
    ContentType: file.type,
  };

  try {
    await s3.upload(uploadParams).promise();
    // Return the public URL of the uploaded file
    return `${process.env.SPACES_CDN_ENDPOINT}/${uploadParams.Key}`;
  } catch (error) {
    console.error("Error uploading to DigitalOcean Spaces:", error);
    throw new Error("Error uploading image");
  }
}
