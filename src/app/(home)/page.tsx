import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/ProductCard";

const products: Product[] = [
  {
    _id: "1",
    name: "Margherita Pizza",
    description:
      "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
    price: 12.99,
    image: "/pizza-main.png",
  },
  {
    _id: "2",
    name: "Pepperoni Pizza",
    description: "Spicy pepperoni slices on a bed of melted cheese.",
    price: 14.99,
    image: "/pizza-main.png",
  },
  {
    _id: "3",
    name: "Pepperoni Pizza",
    description: "Spicy pepperoni slices on a bed of melted cheese.",
    price: 14.99,
    image: "/pizza-main.png",
  },
  {
    _id: "4",
    name: "Pepperoni Pizza",
    description: "Spicy pepperoni slices on a bed of melted cheese.",
    price: 14.99,
    image: "/pizza-main.png",
  },
  {
    _id: "5",
    name: "Pepperoni Pizza",
    description: "Spicy pepperoni slices on a bed of melted cheese.",
    price: 14.99,
    image: "/pizza-main.png",
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-white">
        <div className="container flex items-center justify-around py-18">
          <div>
            <h1 className="text-6xl font-black font-sans">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-xl py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image
              alt="pizza-main"
              width={400}
              height={400}
              src={"/pizza-main.png"}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container px-24 mt-4">
          <Tabs defaultValue="pizza">
            <TabsList>
              <TabsTrigger value="pizza" className="text-md">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="text-md">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
