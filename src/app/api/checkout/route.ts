import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET_KEY!,
});

export async function POST(request: Request) {
  try {
    const { items, metadata } = await request.json(); // Get items and metadata from the client
    console.log("matadata order no", metadata.orderNumber);
    // Calculate total amount
    const totalAmount = items.reduce((total: number, item: any) => {
      return total + item.product.price * item.quantity;
    }, 0);
    console.log(totalAmount);
    // Prepare the items for notes
    const itemDetails = items.map((item: any) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));
    console.log("items details are", itemDetails);
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      receipt: `${metadata.orderNumber}`,
      notes: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        items: JSON.stringify(itemDetails), // Include item details in notes
      },
    });
    console.log("razorpay order is", order);
    // Return the checkout URL
    const checkoutUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/success/${order.id}`;

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      suucessurl: checkoutUrl,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Error creating Razorpay order" },
      { status: 500 }
    );
  }
}
