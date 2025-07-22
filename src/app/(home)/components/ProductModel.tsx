"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ToppingList from "./ToppingList";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product, Topping } from "@/lib/Types";
import Image from "next/image";
import { Suspense, useState, startTransition, useMemo } from "react";
import Spinner from "@/components/custom/Spinner";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { hashTheItem } from "@/lib/utils";

type chosenConfig = {
  [key: string]: string;
};

function ProductModel({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [dialogOpen, setDialogOpen] = useState(false);
  const defaultConfig = Object.entries(product.category.priceConfiguration)
    .map(([key, value]) => {
      return {
        [key]: value.availableOptions[0],
      };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

  const [chosenConfig, setChoseConfig] = useState<chosenConfig>(defaultConfig);

  const handleRadioChange = (key: string, data: string) => {
    setChoseConfig((prev) => {
      return {
        ...prev,
        [key]: data,
      };
    });
  };

  const [selectedTopping, setSelectedTopping] = useState<Topping[]>([]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedTopping.some(
      (element) => element._id === topping._id
    );
    startTransition(() => {
      if (isAlreadyExists) {
        setSelectedTopping((prev) =>
          prev.filter((ele) => ele._id !== topping._id)
        );
        return;
      }
      setSelectedTopping((prev) => [...prev, topping]);
    });
  };

  const totalPrice = useMemo(() => {
    const toppingsTotal = selectedTopping.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    const configPrice = Object.entries(chosenConfig).reduce(
      (acc, [key, value]) => {
        const price = product.priceConfiguration[key].availableOptions[value];
        return acc + price;
      },
      0
    );
    return configPrice + toppingsTotal;
  }, [selectedTopping, chosenConfig, product]);

  const alreadyHasInCart = useMemo(() => {
    const currentConfiguration = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      chosenConfiguration: {
        priceConfiguration: { ...chosenConfig },
        selectedToppings: selectedTopping,
      },
      qty: 1,
    };
    const hash = hashTheItem(currentConfiguration);
    return cartItems.some((item) => item.hash === hash);
  }, [product, chosenConfig, selectedTopping, cartItems]);

  const handleAddToCart = (product: Product) => {
    const itemToAdd = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      chosenConfiguration: {
        priceConfiguration: chosenConfig,
        selectedToppings: selectedTopping,
      },
      qty: 1,
    };
    dispatch(addToCart(itemToAdd));
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="bg-orange-200 text-orange-500 hover:bg-orange-300 px-6 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150 ease-in-out">
        Choose
      </DialogTrigger>
      <DialogHeader>
        <VisuallyHidden>
          <DialogTitle>Order product</DialogTitle>
        </VisuallyHidden>
        <DialogContent className="p-0 max-w-7xl">
          <div className="flex">
            <div className="w-1/2 bg-white rounded-xl flex items-center justify-center p-8">
              <Image
                src={product.image}
                width={250}
                height={250}
                alt={product.name}
              />
            </div>
            <div className="w-3/3 p-8">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="mt-1">{product.description}</p>

              {Object.entries(product.category.priceConfiguration).map(
                ([key, value]) => (
                  <div key={key}>
                    <h4 className="mt-6">Choose the {key}</h4>
                    <RadioGroup
                      defaultValue={chosenConfig[key]}
                      className="grid grid-cols-3 gap-4 mt-2"
                      onValueChange={(data) => {
                        handleRadioChange(key, data);
                      }}
                    >
                      {value.availableOptions.map((option: string) => (
                        <div key={option}>
                          <RadioGroupItem
                            value={option}
                            id={option}
                            className="peer sr-only"
                            aria-label={option}
                          />
                          <Label
                            htmlFor={option}
                            className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )
              )}
              {/* This solution is not ideal add hasTopping in category collection */}
              {product.category.name === "Pizza" && (
                <Suspense fallback={<Spinner />}>
                  <ToppingList
                    selectedTopping={selectedTopping}
                    handleCheckBoxCheck={handleCheckBoxCheck}
                  />
                </Suspense>
              )}
              <div className="mt-12 flex items-center justify-between">
                <span>&#8377;{totalPrice}</span>

                <Button
                  className={`flex items-center justify-center cursor-pointer ${
                    alreadyHasInCart ? `bg-gray-700` : `bg-primary`
                  } `}
                  onClick={() => handleAddToCart(product)}
                  disabled={alreadyHasInCart}
                >
                  <ShoppingCart className="text-white" />
                  <span className="text-white">
                    {alreadyHasInCart ? "Already in cart" : "Add to cart"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogHeader>
    </Dialog>
  );
}

export default ProductModel;
