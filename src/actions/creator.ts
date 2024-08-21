"use server";
import prisma from "@/helpers/prisma";

export async function findOrCreateCreator(address: string) {
  const creator = await prisma.creator.findFirst({
    where: { address },
  });
  if (creator) return creator;

  return prisma.creator.create({
    data: { address },
  });
}
