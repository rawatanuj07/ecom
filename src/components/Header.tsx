"use client";
import Link from "next/link";
import React from "react";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import {
  ClerkLoaded,
  SignInButton,
  useUser,
  UserButton,
  SignedIn,
} from "@clerk/nextjs";
import useBasketStore from "@/app/stores";
import { useValueStore } from "@/app/valueStore";
import { useFilterStore } from "@/app/priceFilterStore";

export default function Header() {
  const { resetValue } = useValueStore();
  const { resetPrice } = useFilterStore();
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const handleReset = () => {
    resetValue();
    resetPrice();
  };
  const handleOrdersClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert(
      "Contact developer for this feature. You can also email at at anuj@decode-parvati.tech"
    );
  };

  return (
    <header className=" flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          onClick={handleReset}
          href="/"
          className="
        text-2xl
        font-bold
        text-blue-500
        hover:opacity-50 cursor-pointer
        mx-auto
        sm: mx-0"
        >
          yourBrandName
        </Link>
        <Form
          action="search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            placeholder="Search for products"
            name="query"
            id=""
            className="
            bg-gray-100
            text-gray-800
            px-4
            py-2
            rounded focus: out line-none
            focus: ring-2
            focus: ring-blue-500
            focus: ring-opacity-50 border w-full
            max-w-4xl"
          />
        </Form>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start
          sm: flex-none items-center space-x-2 bg-blue-500 hover: bg-blue-700
          text-white font-bold py-2 px-4 rounded"
          >
            <TrolleyIcon />

            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white
              rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              {itemCount}
            </span>
            <span>My-Basket</span>
          </Link>
          {/*user area*/}
          <ClerkLoaded>
            <SignedIn>
              <Link
                onClick={handleOrdersClick}
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start
              sm: flex-none items-center space-x-2 bg-blue-500
              hover: bg-blue-700
              text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="tailhidden sm:block text-xs">
                  {" "}
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName} !</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
            {/* {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded
              border-blue-300 border"
              >
                Create Passkey
              </button>
            )} */}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
