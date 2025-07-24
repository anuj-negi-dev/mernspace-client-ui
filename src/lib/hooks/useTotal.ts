import { CartItem } from "../features/cart/cartSlice";
import { useMemo } from "react";

export function useTotal(product: CartItem) {
  const totalPrice = useMemo(() => {
    const toppingsTotal = product.chosenConfiguration.selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    const configPrice = Object.entries(
      product.chosenConfiguration.priceConfiguration
    ).reduce((acc, [key, value]) => {
      const price = product.priceConfiguration[key].availableOptions[value];
      return acc + price;
    }, 0);
    return configPrice + toppingsTotal;
  }, [product]);
  return totalPrice;
}
