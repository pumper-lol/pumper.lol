"use server";
import prisma from "@/helpers/prisma";
import { PrismaPromise } from "@prisma/client";

export async function findOrCreateCreator(address: string) {
  const creator = await prisma.creator.findFirst({
    where: { address },
  });
  if (creator) return creator as unknown as PrismaPromise<Creator>;

  return prisma.creator.create({
    data: { address },
  }) as unknown as PrismaPromise<Creator>;
}
