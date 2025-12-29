"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useParams } from "next/navigation";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/ui/currency";
import { Spinner } from "@/components/ui/spinner";

import { useGetProductQuery } from "@/services/products/queries";

export default function ProductPage() {
  const params = useParams<{ productId: string }>();
  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductQuery(params.productId);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.productId]);

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6">
      <div className="grid min-h-[600px] lg:grid-cols-2 gap-y-6">
        <div className="bg-muted relative rounded-xl overflow-hidden min-h-[400px]">
          <Image
            src={product.imageUrl}
            alt={`product-${product.title}`}
            className="absolute inset-0 h-full w-full object-cover"
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
