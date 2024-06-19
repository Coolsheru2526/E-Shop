import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "stream/consumers";
import Stripe from "stripe";
import prisma from "@/libs/prismadb"; // Ensure prisma is correctly set up here
// Partial of ./pages/api/webhooks/index.ts
import Cors from 'micro-cors';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});
// ...

export const config = {
    api: {
        bodyParser: false
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10"
});

const convertStripeAddressToPrisma = (address: Stripe.Address | null | undefined) => {
    if (!address) return null;

    const prismaAddress: any = {};
    if (address.city !== undefined) prismaAddress.city = address.city;
    if (address.country !== undefined) prismaAddress.country = address.country;
    if (address.line1 !== undefined) prismaAddress.line1 = address.line1;
    if (address.line2 !== undefined) prismaAddress.line2 = address.line2;
    if (address.postal_code !== undefined) prismaAddress.postal_code = address.postal_code;
    if (address.state !== undefined) prismaAddress.state = address.state;

    return prismaAddress;
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!

    if (!sig) {
        return res.status(400).send("Missing stripe signature");
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_KEY!);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err}`);
    }

    switch (event.type) {
        case 'charge.succeeded':
            const charge = event.data.object as Stripe.Charge;

            if (typeof charge.payment_intent === "string") {
                await prisma.order.update({
                    where: {
                        paymentIntentId: charge.payment_intent,
                    },
                    data: {
                        status: "complete",
                        address: convertStripeAddressToPrisma(charge.shipping?.address) ?? undefined,
                    },
                });
            }
            break;
        default:
            console.log('Unhandled Event type: ' + event.type);
    }

    res.json({ received: true });
}

export default cors(handler as any);
