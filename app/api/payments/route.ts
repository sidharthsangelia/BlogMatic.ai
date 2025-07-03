import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);
export async function POST(req: NextResponse) {
  //    webhook functionality

  const payload = await req.text();

  const signature = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature!,
      process.env.STRIPE_WEBHOOK_KEY!
    );

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          { expand: ["Line_items"] }
        );
        console.log({ session });
        // connect to db
        break;
      case "customer.subscription.deleted":
        // connet to db
        const subscriptionId = event.data.object.id;
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        // connect to db
        // update user status to cancel/revoke access
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    return NextResponse.json({ status: "Failed", err });
  }

  return NextResponse.json({
    status: "success",
  });
}
