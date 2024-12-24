import { create } from "zustand";

type ValueStore = {
  value: string;
  setValue: (categoryId: string) => void; // Action to update the value};
};
export const useValueStore = create<ValueStore>((set) => ({
  value: "",
  setValue: (categoryId) => {
    set((state) => ({
      value: state.value === categoryId ? "" : categoryId,
    }));
  },
}));
