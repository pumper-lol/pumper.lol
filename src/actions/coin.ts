"use server";

import { pinata } from "@/helpers/pinata";
import prisma from "@/helpers/prisma";
import { findOrCreateCreator } from "@/actions/creator";
import { Prisma, PrismaPromise } from "@prisma/client";
import QueryMode = Prisma.QueryMode;

export async function createCoin(form: FormData) {
  const data = (await pinata.upload.file(form.get("image") as File)) as {
    IpfsHash: string;
  };
  const creator = (await findOrCreateCreator(
    form.get("creatorAddress") as string,
  )) as { id: string };

  return prisma.coin.create({
    data: {
      name: form.get("name") as string,
      symbol: form.get("symbol") as string,
      description: form.get("description") as string,
      imageIpfsHash: data.IpfsHash,
      twitterUrl: form.get("twitterUrl") as string,
      telegramUrl: form.get("telegramUrl") as string,
      websiteUrl: form.get("websiteUrl") as string,
      discordUrl: form.get("discordUrl") as string,
      address: form.get("address") as string,
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
  imageIpfsHash?: string | undefined;
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
      imageIpfsHash: true,
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
    imageIpfsHash: coin?.imageIpfsHash,
  };
}

export async function getCoins({
  page,
  search,
}: { page?: number; search?: string } = {}) {
  return prisma.coin.findMany({
    where: search
      ? {
          OR: [
            { address: { contains: search, mode: QueryMode.insensitive } },
            { symbol: { contains: search, mode: QueryMode.insensitive } },
            { name: { contains: search, mode: QueryMode.insensitive } },
          ],
        }
      : {},
    include: {
      creator: true,
    },
    skip: page && page > 0 ? (page - 1) * 20 : 0,
    take: 20,
  }) as unknown as PrismaPromise<Coin[]>;
}
