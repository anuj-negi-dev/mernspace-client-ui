"use client";

// import { increment } from "@/lib/features/cart/cartSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

function CartCounter() {
  // const dispatch = useAppDispatch();

  // const value = useAppSelector((state) => state.cart.value);

  // const handleIncrement = () => {
  //   dispatch(increment());
  // };

  return (
    <>
      <div className="relative ml-4">
        <Link href={"/cart"}>
          <ShoppingBasket className="hover:text-primary duration-200" />
          <span className="absolute -top-5 -right-2  h-6 w-6 rounded-full bg-primary font-bold flex justify-center text-white">
            0
          </span>
        </Link>
      </div>
    </>
  );
}

export default CartCounter;
