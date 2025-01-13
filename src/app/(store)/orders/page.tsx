import { getMyOrders } from "@/sanity/lib/products/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function Orders() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>You have not placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="bg-white border border-black shadow-sm overflow-hidden rounded-lg"
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-bold">
                        Order Number
                      </p>
                      <p className="font-mono text-sm text-green-600 break-all">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600 mb-1">Order Date</p>
                      <p className="font-medium">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="font-bold text-lg">
                      {formatCurrency(
                        order.totalAmount ?? 0,
                        order.currency ?? "INR"
                      )}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 border-t border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Order Items
                  </h2>
                  <div className="space-y-4">
                    {order.products?.map((product) => (
                      <div
                        key={product._key}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <p className="text-sm text-gray-600">
                            {product.name} x {product.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(
                              (product.price ?? 0) * (product.quantity ?? 0),
                              order.currency ?? "INR"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export default Orders;
