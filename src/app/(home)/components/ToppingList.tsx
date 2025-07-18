import { useEffect, useState } from "react";
import ToppingCard from "./ToppingCard";
import { Topping } from "@/lib/Types";

function ToppingList() {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedTopping, setSelectedTopping] = useState<Topping[]>([]);

  useEffect(() => {
    const fetchToppings = async () => {
      // TODO: Make tenantId dynamic
      const toppingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings?tenantId=12&perPage=3&currentPage=1`,
      );
      if (!toppingResponse.ok) {
        throw new Error("Failed to fetch topping..");
      }
      const toppings = await toppingResponse.json();
      setToppings(toppings.data);
      setSelectedTopping([toppings.data[0]]);
    };
    fetchToppings();
  }, []);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedTopping.some(
      (element) => element._id === topping._id
    );
    if (isAlreadyExists) {
      setSelectedTopping((prev) =>
        prev.filter((ele) => ele._id !== topping._id)
      );
      return;
    }
    setSelectedTopping((prev) => [...prev, topping]);
  };
  return (
    <section>
      <h4 className="mt-6">Extra Toppings</h4>
      <div className="grid grid-cols-3 gap-8 my-2">
        {toppings.map(
          (topping) =>
            topping.isPublish && (
              <ToppingCard
                topping={topping}
                selectedTopping={selectedTopping}
                handleCheckBoxCheck={handleCheckBoxCheck}
                key={topping._id}
              />
            )
        )}
      </div>
    </section>
  );
}

export default ToppingList;
