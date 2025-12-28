import Image from "next/image";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/ui/currency";

import { Product } from "@/lib/generated/client";
import { getProduct } from "@/services/products/api";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  const product: Product = await getProduct(productId);

  return (
    <div className="px-4 md:px-6">
      <div className="grid min-h-[600px] lg:grid-cols-2 gap-y-6">
        <div className="bg-muted relative rounded-xl overflow-hidden min-h-[400px]">
          <Image
            src={product.imageUrl}
            alt={`product-${product.title}`}
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            fill
          />
        </div>
        <div className="flex flex-col gap-4 px-4 md:px-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div>
            <Item size="sm">
              <ItemContent>
                <ItemTitle>Category:</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Badge>{product.category}</Badge>
              </ItemActions>
            </Item>
            <Item size="sm">
              <ItemContent>
                <ItemTitle>Price:</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Currency value={+product.price} />
              </ItemActions>
            </Item>
          </div>
        </div>
      </div>
    </div>
  );
}
