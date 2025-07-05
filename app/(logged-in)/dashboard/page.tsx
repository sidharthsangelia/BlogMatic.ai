import BgGradient from "@/components/common/bg-gradient";
import { Badge } from "@/components/ui/badge";
import UpgradeYourPlan from "@/components/UpgradeYourPlan";
import UploadForm from "@/components/UploadForm";
import { prisma } from "@/lib/prisma";
import {
  doesUserExist,
  getPlanType,
  hasCancelledSubscription,
  updateUser,
} from "@/lib/user-helpers";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

export default async function Dashboard() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return redirect("/sign-in");
  }

  const email = clerkUser?.emailAddresses?.[0].emailAddress ?? "";

  // Update the user id
  let userId = null;
  let priceId = null;

  const hasUserCancelled = await hasCancelledSubscription(email);
  const user = await doesUserExist(email);

  if (user && user.length > 0) {
    // Update the user_id in users table
    userId = clerkUser.id;
    if (userId) {
      await updateUser(userId, email as string);
    }
    priceId = user[0].priceId;
  }

  // Handle undefined return from getPlanType
  const planType = getPlanType(priceId as string);
  const { id: planTypeId = "starter", name: planTypeName = "Starter" } = planType || {};

  const isBasicPlan = planTypeId === "basic";
  const isProPlan = planTypeId === "pro";
  const isStarterPlan = planTypeId === "starter";

  // Check number of posts per plan
  const posts = userId ? await prisma.post.findMany({
    where: {
      userId: userId,
    },
  }) : [];

  // Logic for showing upload form:
  // 1. User must exist and have a valid userId
  // 2. User must not have cancelled subscription
  // 3. Either:
  //    - Basic plan with less than 3 posts
  //    - Pro plan (unlimited posts)
  const canShowUploadForm = 
    userId && 
    !hasUserCancelled && 
    ((isBasicPlan && posts.length < 3) || isProPlan);

  // Debug info for display - REMOVE THIS IN PRODUCTION
  const debugInfo = {
    email,
    userExists: !!user,
    userId,
    priceId,
    planTypeId,
    planTypeName,
    hasUserCancelled,
    postsCount: posts.length,
    isBasicPlan,
    isProPlan,
    isStarterPlan,
    canShowUploadForm
  };

  return (
    <BgGradient>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Badge className="bg-gradient-to-r from-purple-700 to-pink-800 text-white px-4 py-1 text-lg font-semibold capitalize">
            {planTypeName} Plan
          </Badge>

          <h2 className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Start creating amazing content
          </h2>

          <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
            Upload your audio or video file and let our AI do the magic!
          </p>

          {/* DEBUG INFO - REMOVE THIS IN PRODUCTION */}
          <div className="bg-gray-100 p-4 rounded-lg text-left text-sm max-w-2xl">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>

          {(isBasicPlan || isProPlan) && (
            <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
              You get{" "}
              <span className="font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
                {isBasicPlan ? "3" : "Unlimited"} blog posts
              </span>{" "}
              as part of the{" "}
              <span className="font-bold capitalize">{planTypeName}</span> Plan.
            </p>
          )}

          {canShowUploadForm ? (
            <UploadForm />
          ) : (
            <UpgradeYourPlan />
          )}
        </div>
      </div>
    </BgGradient>
  );
}