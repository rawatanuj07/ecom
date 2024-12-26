import { create } from "zustand";

type ValueStore = {
  value: string;
  setValue: (categoryId: string) => void; // Action to update the value};
  resetValue: () => void;
};
export const useValueStore = create<ValueStore>((set) => ({
  value: "",
  setValue: (categoryId) => {
    set((state) => ({
      value: state.value === categoryId ? "" : categoryId,
    }));
  },
  resetValue: () => {
    set({ value: "" }); // Reset value to default
  },
}));
