import { prisma } from "../config/figmaConfig";

export const createResidencyDB = async (data: any) => {
  return prisma.residency.create({ data });
};
