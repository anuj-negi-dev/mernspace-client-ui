"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyCoupon } from "@/lib/http/api";
import { useAppSelector } from "@/lib/store/hooks";
import { CouponData } from "@/lib/Types";
import { getItemTotal } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";

const TAXES_PERCENTAGE = 5;

export const OrderSummary = () => {
  const searchParams = useSearchParams();

  const couponCodeRef = useRef<HTMLInputElement>(null);

  const cart = useAppSelector((state) => state.cart.cartItems);

  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  const [discountError, setDiscountError] = useState<string>("");

  const subTotal = useMemo(() => {
    return cart.reduce((acc, curr) => {
      return acc + curr.qty * getItemTotal(curr);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((subTotal * discountPercentage) / 100);
  }, [subTotal, discountPercentage]);

  const taxesAmount = useMemo(() => {
    const amountAfterDiscount = subTotal - discountAmount;
    return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
  }, [subTotal, discountAmount]);

  const deliveryAmount = useMemo(() => {
    if (subTotal >= 500) return 0;
    else return 100;
  }, [subTotal]);

  const grandWithDiscountTotal = useMemo(() => {
    return subTotal - discountAmount + taxesAmount + deliveryAmount;
  }, [subTotal, discountAmount, taxesAmount, deliveryAmount]);

  const grandWithoutDiscountTotal = useMemo(() => {
    return subTotal + taxesAmount + deliveryAmount;
  }, [subTotal, taxesAmount, deliveryAmount]);

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["couponCode"],
    mutationFn: async () => {
      if (!couponCodeRef.current?.value) return;
      if (!searchParams.get("tenantId")) return;
      const data: CouponData = {
        code: couponCodeRef.current.value,
        tenantId: searchParams.get("tenantId")!,
      };
      return await verifyCoupon(data).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.valid) {
        setDiscountPercentage(data.discount);
        setDiscountError("");
        return;
      }
      setDiscountError("Coupon is invalid");
      setDiscountPercentage(0);
    },
  });

  const handleCouponValidation = (e: React.MouseEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Card className="w-2/5 border-none h-auto self-start">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-bold">₹{subTotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span className="font-bold">₹{taxesAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery charges</span>
          <span className="font-bold">₹{deliveryAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-bold">₹{discountAmount}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="font-bold">Order total</span>
          <span className="font-bold flex flex-col">
            <span
              className={
                discountPercentage ? "line-through text-gray-400 mb-2" : ""
              }
            >
              {grandWithoutDiscountTotal}
            </span>
            {discountPercentage ? (
              <span className="text-green-700">{grandWithDiscountTotal}</span>
            ) : null}
          </span>
        </div>
        {discountError && (
          <span className="text-red-500 m-2">{discountError}</span>
        )}
        {isError && <span className="text-red-500 m-2">Coupon is invalid</span>}
        <div className="flex items-center gap-4">
          <Input
            id="fname"
            name="code"
            type="text"
            className="w-full"
            placeholder="Coupon code"
            ref={couponCodeRef}
          />
          <Button variant={"outline"} onClick={handleCouponValidation}>
            {isPending ? "Applying.." : "Apply"}
          </Button>
        </div>

        <div className="text-right mt-6">
          <Button>Place order</Button>
        </div>
      </CardContent>
    </Card>
  );
};
