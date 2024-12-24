"use client";
import type { SliderValue } from "@nextui-org/react";

import React from "react";
import { Slider } from "@nextui-org/react";

export default function ProductFilter() {
  const [value, setValue] = React.useState<SliderValue>([100, 300]);

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
      <Slider
        className="max-w-lg "
        formatOptions={{ style: "currency", currency: "USD" }}
        label="Select a budget"
        maxValue={3000}
        minValue={0}
        step={50}
        value={value}
        onChange={setValue}
        classNames={{
          filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
          track: "h-2 w-full", // Apply gradient to filler
          thumb:
            "w-8 h-8 bg-blue-500 rounded-full cursor-pointer hover:scale-110 transition-transform ease-in-out duration-300",
        }}
      />
      <p className="text-default-500 font-medium text-small">
        Selected budget:{" "}
        {Array.isArray(value) && value.map((b) => `$${b}`).join(" – ")}
      </p>
    </div>
  );
}
