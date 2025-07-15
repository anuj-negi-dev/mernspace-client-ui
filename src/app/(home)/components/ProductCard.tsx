import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";

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
      <CardFooter className="flex items-center justify-between">
        <p>
          <span>From </span>
          <span className="font-semibold">${product.price}</span>
        </p>
        <Button className="bg-orange-200 text-orange-500 hover:bg-orange-300 px-6 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150 ease-in-out">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
