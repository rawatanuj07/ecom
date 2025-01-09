import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET_KEY!,
});

// Define types for the items and metadata
interface BasketItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
}

// Define a type-safe handler
export async function POST(request: Request) {
  try {
    const { items, metadata }: { items: BasketItem[]; metadata: Metadata } =
      await request.json(); // Type the request body
    console.log("metadata order no", metadata.orderNumber);

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    console.log(totalAmount);

    // Prepare the items for notes
    const itemDetails = items.map((item) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));
    console.log("item details are", itemDetails);

    // Create Razorpay order
    const order: any = await razorpay.orders.create({
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
      successUrl: checkoutUrl,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Error creating Razorpay order" },
      { status: 500 }
    );
  }
}
