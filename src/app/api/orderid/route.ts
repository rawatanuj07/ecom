// import Razorpay from "razorpay";
// import { NextRequest, NextResponse } from "next/server";

// const razorpay = new Razorpay({
//   key_id: process.env.key_id!,
//   key_secret: process.env.key_secret,
// });

// export async function POST(request: NextRequest) {
//     const { items, metadata } = await request.json(); // Get items and metadata from the client
//   const { amount, currency } = (await request.json()) as {
//     amount: string;
//     currency: string;
//   };

//   // Create Razorpay order
//   const order = await razorpay.orders.create({
//     amount: totalAmount * 100, // Convert to paise
//     currency: "INR",
//     receipt: `${metadata.orderNumber}`,
//     notes: {
//       orderNumber: metadata.orderNumber,
//       customerName: metadata.customerName,
//       customerEmail: metadata.customerEmail,
//       items: JSON.stringify(itemDetails), // Include item details in notes
//     },
//   });

//   console.log(order);
//   return NextResponse.json({ orderId: order.id }, { status: 200 });
// }
// // const options = {
// //     amount: 50000, // amount in the smallest currency unit (e.g., paise for INR)
// //     currency: "INR",
// //     receipt: "receipt#1",
// //     payment_capture: true,
// //     notes: {
// //         key1: "value1",
// //         key2: "value2"
// //     },
// //     method: "card",
// //     callback_url: "https://example.com/callback",
// //     customer: {
// //         name: "John Doe",
// //         contact: "9999999999",
// //         email: "john.doe@example.com"
// //     },
// //     offer_id: "offer_123",
// //     partial_payment: false,
// //     expire_by: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
// //     order_id: "order_123"
// // };
