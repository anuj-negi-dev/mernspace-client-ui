import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard from "./components/ProductCard";
import { Category, Product } from "@/lib/Types";

export default async function Home() {
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/categories`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await categoryResponse.json();

  const productResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=12`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!productResponse.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await productResponse.json();

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
          <Tabs defaultValue={categories[0]._id}>
            <TabsList>
              {categories.map((category: Category) => (
                <TabsTrigger key={category._id} value={category._id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category: Category) => (
              <TabsContent key={category._id} value={category._id}>
                <div className="grid grid-cols-4 gap-6 mt-6">
                  {products.data.filter((product: Product) => product.categoryId === category._id).map((product: Product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
}
