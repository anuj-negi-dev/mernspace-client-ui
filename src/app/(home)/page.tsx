import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

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
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
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
        <div className="container px-24">
          <Tabs defaultValue="pizza" className="w-[480px]">
            <TabsList>
              <TabsTrigger value="pizza" className="text-md">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="text-md">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">
              <p>Pizza Content</p>
            </TabsContent>
            <TabsContent value="beverages">
              <p>Beverages Content</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
