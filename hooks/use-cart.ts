import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { toast } from "sonner";
import { Product } from "@/lib/generated/client";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  isOpen: boolean;
  onOpen: (data?: Product) => void;
  onClose: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      isOpen: false,
      data: undefined,
      items: [],
      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item already in cart.");
        }

        set({ items: [...get().items, data] });
        get().onOpen(data);
        toast.success("Item added to cart.");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
