import { prisma } from "../config/figmaConfig";

export const getUserDB = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUserDB = async (data: any) => {
  return prisma.user.create({
    data,
  });
};
