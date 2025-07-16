"use client"

import { useState } from "react";
import ToppingCard, { Topping } from "./ToppingCard";

const data = [
  {
    id: "1",
    name: "Cheese",
    price: 1.5,
    image: "/cheese.png",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Chicken",
    price: 1.0,
    image: "/chicken.png",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Jalapenos",
    price: 2.0,
    image: "/jalapeno.png",
    isAvailable: true,
  },
];

function ToppingList() {
  const [selectedTopping, setSelectedTopping] = useState<Topping[]>([data[0]]);
  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedTopping.some(
      (element) => element.id === topping.id
    );
    if (isAlreadyExists) {
      setSelectedTopping((prev) => prev.filter((ele) => ele.id !== topping.id));
      return;
    }
    setSelectedTopping((prev) => [...prev, topping]);
  };
  return (
    <section>
      <h4 className="mt-6">Extra Toppings</h4>
      <div className="grid grid-cols-3 gap-8 my-2">
        {data.map(
          (topping) =>
            topping.isAvailable && (
              <ToppingCard
                topping={topping}
                selectedTopping={selectedTopping}
                handleCheckBoxCheck={handleCheckBoxCheck}
                key={topping.id}
              />
            )
        )}
      </div>
    </section>
  );
}

export default ToppingList;
