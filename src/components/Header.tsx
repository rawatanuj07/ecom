"use client";
import Link from "next/link";
import React from "react";
import Form from "next/form";
import { TrolleyIcon } from "@sanity/icons";
export default function Header() {
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <Link
        href="/"
        className="
        text-2xl
        font-bold
        ■text-blue-500
        hover:opacity-50 cursor-pointer
        mx-auto
        sm: mx-0"
      >
        Shopping
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
            ру-2
            rounded focus: out line-none
            focus: ring-2
            focus: ring-blue-500
            focus: ring-opacity-50 border w-full
            max-w-4xl"
        />
      </Form>
      <div>
        <Link
          href="/basket"
          className="flex-1 relative flex justify-center sm:justify-start
        sm: flex-none items-center space-x-2 bg-blue-500 hover: bg-blue-700
        text-white font-bold py-2 px-4 rounded"
        >
          <TrolleyIcon />
          <span>My-Basket</span>
        </Link>
      </div>
    </header>
  );
}
