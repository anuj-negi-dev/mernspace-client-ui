import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";
import { Category, Product } from "@/lib/Types";

async function ProductList() {
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
                {products.data
                  .filter(
                    (product: Product) => product.categoryId === category._id
                  )
                  .map((product: Product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default ProductList;
