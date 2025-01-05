"use client";
import AddToBasketButton from "@/components/AddToBasketButton";
import useBasketStore from "../../stores";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { imageUrl } from "@/sanity/lib/image";
import Loader from "@/components/Loader";
import { create } from "domain";
import { Metadata } from "../../../../actions/createCheckoutSession";
import Razorpay from "razorpay";
declare global {
  interface Window {
    Razorpay: any;
  }
}
function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className=" text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }

  // const handleCheckout = async () => {
  //   // alert(
  //   //   "Contact developer for further functionalities or email at rawat.mysterymonks@gmail.com"
  //   // );
  //   if (!isSignedIn) return;
  //   setIsLoading(true);

  //   try {
  //     const metadata: Metadata = {
  //       orderNumber: crypto.randomUUID(),
  //       customerName: user?.fullName ?? "Unknown",
  //       customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
  //       clerkUserId: user!.id,
  //     };
  //     const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
  //     if(checkoutUrl) {
  //       window.location.href = checkoutUrl;
  //     }

  //   } catch (error) {
  //     console.error("Error creating checkout session", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      // Send basket items and metadata to the backend for order creation
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: groupedItems, // Send the basket items to the server
          metadata, // Send the metadata (e.g., customer info)
        }),
      });

      const data = await response.json();
      console.log("data is", data);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: function (response: any) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: metadata.customerName,
          email: metadata.customerEmail,
          contact: user?.phoneNumbers[0]?.phoneNumber ?? "",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };
  // const totalAmount = groupedItems.reduce((total: number, item: any) => {
  //   return total + item.product.price * item.quantity;
  // }, 0);
  // const createOrderId = async () => {
  //   try {
  //     const response = await fetch("/api/order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       // body: JSON.stringify({
  //       //  amount: parseFloat(totalAmount)*100,
  //       // })
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     return data.orderId;
  //   } catch (error) {
  //     console.error("There was a problem with your fetch operation:", error);
  //   }
  // };
  // const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const orderId: string = await createOrderId();
  //     const options = {
  //       key: process.env.key_id,
  //       amount: parseFloat(amount) * 100,
  //       currency: INR,
  //       name: "name",
  //       description: "description",
  //       order_id: orderId,
  //       handler: async function (response: any) {
  //         const data = {
  //           orderCreationId: orderId,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //         };

  //         const result = await fetch("/api/verify", {
  //           method: "POST",
  //           body: JSON.stringify(data),
  //           headers: { "Content-Type": "application/json" },
  //         });
  //         const res = await result.json();
  //         if (res.isOk) alert("payment succeed");
  //         else {
  //           alert(res.message);
  //         }
  //       },
  //       prefill: {
  //         name: name,
  //         email: email,
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };
  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.on("payment.failed", function (response: any) {
  //       alert(response.error.description);
  //     });
  //     paymentObject.open();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="container mx-auto p-4 max-w-6x1">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 p-4 border rounded flex items-center justify-between"
            >
              <div
                className="flex items-center cursor-pointer flex-1 min-w-0"
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product image"}
                      className="w-full h-full object-cover rounded"
                      width={96}
                      height={96}
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price: $
                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span> Items: </span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}{" "}
              </span>
            </p>
            <p className="flex justify-between text-2xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>
                ${useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover: bg-blue-600 disabled: bg-gray-400"
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Sign in to Checkout{" "}
              </button>
            </SignInButton>
          )}
        </div>
        <div className="h-64 lg:h-0">{/*THIS DIV IS FOR SPACING*/}</div>
      </div>
    </div>
  );
}
export default BasketPage;
