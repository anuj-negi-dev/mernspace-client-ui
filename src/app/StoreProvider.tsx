"use client";

import { setInitialCartItem } from "@/lib/features/cart/cartSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;
    if (isLocalStorageAvailable) {
      const cartItems = window.localStorage.getItem("cartItems");

      try {
        const parsedItem = JSON.parse(cartItems as string);
        storeRef.current.dispatch(setInitialCartItem(parsedItem));
      } catch (err) {
        console.log(err);
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
