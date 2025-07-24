import { CartItem } from "../features/cart/cartSlice";
import { useMemo } from "react";
import { getItemTotal } from "../utils";

export function useTotal(product: CartItem) {
  const totalPrice = useMemo(() => {
    return getItemTotal(product);
  }, [product]);
  return totalPrice;
}
