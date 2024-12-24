"use client";
// @ts-ignore

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
export default function ProductFilter() {
  return (
    <>
      <RangeSlider
        id="price-range-slider"
        className="rangeslider"
        min={0}
        max={1000}
        // step={50}
        defaultValue={[100, 500]} // Default range values
        onThumbDragStart={() => console.log("Thumb drag started")}
        onThumbDragEnd={() => console.log("Thumb drag ended")}
        onRangeDragStart={() => console.log("Range drag started")}
        onRangeDragEnd={() => console.log("Range drag ended")}
        disabled={false} // Slider is active
        rangeSlideDisabled={false} // Allow dragging the range
        thumbsDisabled={[false, false]} // Both thumbs are active
        orientation="horizontal" // Horizontal slider
      />
    </>
  );
}
