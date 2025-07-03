import { plans } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function Dashboard() {
  const clerkUser = await currentUser();

  const email = clerkUser?.emailAddresses[0]?.emailAddress;
  // update user id
  let userId = null;
  let planType = "starter";
  const user = await prisma.user.findMany({
    where: {
      email: email,
    },
  });

  if (user && user.length > 0) {
    userId = clerkUser?.id;

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        userId: userId,
      },
    });
    const priceId = user[0].priceId;

    const checkPlanType = plans.filter((plan) => plan.priceId === priceId);
    planType = checkPlanType?.[0].id || "starter";
  }

  const isBasicPlan = planType === "basic";
  const isProPlan = planType === "Pro";

  return (
    <section>
      Dashboard status: {isBasicPlan ? "3" : isProPlan ? "unlimitted" : ""}
    </section>
  );
}
