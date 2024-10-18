"use server";
import prisma from "@/helpers/prisma";
import { PrismaPromise } from "@prisma/client";
import { ensureRequestOrigin } from "@/actions/coin";

export async function findOrCreateCreator(address: string) {
  const creator = await prisma.creator.findFirst({
    where: { address },
  });
  if (creator) return creator as unknown as PrismaPromise<Creator>;
  await ensureRequestOrigin();

  return prisma.creator.create({
    data: { address },
  }) as unknown as PrismaPromise<Creator>;
}
