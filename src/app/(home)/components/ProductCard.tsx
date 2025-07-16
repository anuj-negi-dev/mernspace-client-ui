import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import Image from "next/image";
import ToppingList from "./ToppingList";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="border-none rounded-xl">
      <CardHeader className="flex items-center justify-center">
        <Image
          src={product.image}
          alt="product-image"
          height={150}
          width={150}
        />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between w-full">
        <p>
          <span>From </span>
          <span className="font-semibold">₹{product.price}</span>
        </p>
        <Dialog>
          <DialogTrigger className="bg-orange-200 text-orange-500 hover:bg-orange-300 px-6 py-1 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150 ease-in-out">
            Choose
          </DialogTrigger>
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Order product</DialogTitle>
            </VisuallyHidden>
            <DialogContent className="p-0 max-w-3xl">
              <div className="flex">
                <div className="w-1/3 bg-white rounded-xl flex items-center justify-center p-8">
                  <Image
                    src={product.image}
                    width={450}
                    height={450}
                    alt={product.name}
                  />
                </div>
                <div className="w-2/3 p-8">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="mt-1">{product.description}</p>
                  <div>
                    <h4 className="mt-6">Choose the size</h4>
                    <RadioGroup
                      defaultValue="small"
                      className="grid grid-cols-3 gap-4 mt-2"
                    >
                      <div>
                        <RadioGroupItem
                          value="small"
                          id="small"
                          className="peer sr-only"
                          aria-label="Small"
                        />
                        <Label
                          htmlFor="small"
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Small
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="medium"
                          id="medium"
                          className="peer sr-only"
                          aria-label="Medium"
                        />
                        <Label
                          htmlFor="medium"
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Medium
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="large"
                          id="large"
                          className="peer sr-only"
                          aria-label="Large"
                        />
                        <Label
                          htmlFor="large"
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Large
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <h4 className="mt-6">Choose the crust</h4>
                    <RadioGroup
                      defaultValue="thin"
                      className="grid grid-cols-3 gap-4 mt-2"
                    >
                      <div>
                        <RadioGroupItem
                          value="thin"
                          id="thin"
                          className="peer sr-only"
                          aria-label="Thin"
                        />
                        <Label
                          htmlFor="thin"
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Thin
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="thick"
                          id="thick"
                          className="peer sr-only"
                          aria-label="Thick"
                        />
                        <Label
                          htmlFor="thick"
                          className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          Thick
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <ToppingList />

                  <div className="mt-12 flex items-center justify-between">
                    <span>$400</span>
                    <Button className="flex items-center justify-center">
                      <ShoppingCart className="text-white" />
                      <span className="text-white">Add to Cart</span>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </DialogHeader>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
