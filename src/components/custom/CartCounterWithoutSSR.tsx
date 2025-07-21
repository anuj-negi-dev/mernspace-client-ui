"use client";

import dynamic from "next/dynamic";

export const CartCounterWithoutSSR = dynamic(() => import("./CartCounter"), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});
