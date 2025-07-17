import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/lib/Types";
import ProductModel from "./ProductModel";

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
          <span className="font-semibold">₹100</span>
        </p>
        <ProductModel product={product} />
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
