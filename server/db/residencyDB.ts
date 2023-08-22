import { prisma } from "../config/figmaConfig";

export const getResidenciesDB = async () => {
  return prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getResidencyDB = async (id: string) => {
  return prisma.residency.findUnique({ where: { id } });
};

export const createResidencyDB = async (data: any) => {
  return prisma.residency.create({ data });
};
