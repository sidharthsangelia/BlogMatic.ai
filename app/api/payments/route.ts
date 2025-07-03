import { handleCheckOutSessionComplete } from "@/lib/payment-helpers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!)
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature!,
      process.env.STRIPE_WEBHOOK_KEY!
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          { expand: ["line_items"] }
        );
        console.log({ session });
        // connect to db and handle session

        await handleCheckOutSessionComplete({session, stripe})
        break;
      }
      case "customer.subscription.deleted": {
        const subscriptionId = event.data.object.id;
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        // update user subscription status

        
        break;
      }
      case "payment_method.attached": {
        const paymentMethod = event.data.object;
        // handle payment method
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "Failed", error: (err as Error).message }, { status: 400 });
  }

  return NextResponse.json({ status: "success" }, { status: 200 });
}
