import Stripe from "stripe";
import { prisma } from "./prisma";

export async function handleCheckOutSessionComplete({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0].price?.id;
  if ("email" in customer && priceId) {
    await createOrUpdateUser(customer, customerId);

    await updateUserSubscription(priceId, customer.email as string);
    await insertPayment(session, priceId, customer.email as string);
  }
}

async function insertPayment(
  session: Stripe.Checkout.Session,
  priceId: string,
  customerEmail: string
) {
  try {
    await prisma.payment.create({
      data: {
        amount: session.amount_total!,
        status: session.status!,
        stripePaymentId: session.id,
        priceId: priceId,
        userEmail: customerEmail,
      },
    });
  } catch (error) {
    console.error("Error in creating user", error);
  }
}

async function createOrUpdateUser(
  customer: Stripe.Customer,
  customerId: string
) {
  try {
    const user = await prisma.user.findMany({
      where: {
        email: customer.email ?? undefined,
      },
    });

    if (user.length === 0) {
      await prisma.user.create({
        data: {
          email: customer.email!,
          fullName: customer.name,
          customerId: customerId,
        },
      });
    }
  } catch (error) {
    console.error("Error in creating user", error);
  }
}

async function updateUserSubscription(priceId: string, email: string) {
  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        priceId: priceId,
        status: "active",
      },
    });
  } catch (error) {
    console.error("Error in creating user", error);
  }
}
