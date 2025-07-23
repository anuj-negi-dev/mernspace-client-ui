"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function CartCounter() {
  const searchParams = useSearchParams();

  const cartItems = useAppSelector((state) => state.cart.cartItems).length;

  return (
    <>
      <div className="relative ml-4">
        <Link href={`/cart?tenantId=${searchParams.get("tenantId")}`}>
          <ShoppingBasket className="hover:text-primary duration-200" />
          <span className="absolute -top-5 -right-2  h-6 w-6 rounded-full bg-primary font-bold flex justify-center text-white">
            {cartItems}
          </span>
        </Link>
      </div>
    </>
  );
}

export default CartCounter;
