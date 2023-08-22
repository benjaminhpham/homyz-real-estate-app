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

export const updateUserDB = async (email: string, data: any) => {
  return prisma.user.update({
    where: { email },
    data,
  });
};

export const checkUserBooking = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: { bookedVisits: true },
  });
};

export const getAllBookingsDB = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: { bookedVisits: true },
  });
};

export const deleteBookingDB = async (email: string, bookings: any) => {
  return prisma.user.update({
    where: { email },
    data: {
      bookedVisits: bookings?.bookedVisits,
    },
  });
};

export const getFavoriteResidenciesDB = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    select: { favResidenciesID: true },
  });
};
