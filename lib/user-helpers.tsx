import { plans } from "./constants";
import { prisma } from "./prisma";

export async function hasCancelledSubscription(email: string) {
  const querry = await prisma.user.findMany({
    where: {
      email: email,
      status: "cancelled",
    },
  });

  return querry && querry.length > 0;
}
export function getPlanType(priceId: string) {
  const checkPlanType = plans.filter((plan) => plan.priceId === priceId);
  return checkPlanType?.[0];
}
export async function updateUser(userId: string, email: string) {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      userId: userId,
    },
  });
}
export async function doesUserExist(email: string) {
  const querry = await prisma.user.findMany({
    where: {
      email: email,
    },
  });

  if (querry && querry.length > 0 ){
    return querry ;
  }
  return null 
}
