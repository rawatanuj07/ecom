import { create } from "zustand";

interface FilterState {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  resetPrice: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  priceRange: [0, 1000], // Initial range
  setPriceRange: (range) => {
    console.log("Setting price range in store:", range); // Log here
    set({ priceRange: range });
  },
  resetPrice: () => {
    set({ priceRange: [0, 1000] }); // Reset value to default
  },
}));
