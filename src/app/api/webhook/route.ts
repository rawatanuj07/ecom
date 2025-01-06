import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text(); // Get the raw body of the request
  const razorpaySignature = req.headers.get("x-razorpay-signature");
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET; // Your Razorpay secret
  if (!secret) {
    console.error("RAZORPAY_WEBHOOK_SECRET is not defined");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  // Create HMAC to verify the signature
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (razorpaySignature === expectedSignature) {
    console.log("Webhook signature verified.");

    // Process the payload
    const payload = JSON.parse(body);
    console.log("Webhook payload:", payload);

    return NextResponse.json({ status: "Webhook received and verified" });
  } else {
    console.error("Invalid webhook signature");
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }
}
