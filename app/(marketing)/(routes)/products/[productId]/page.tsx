"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

import { useGetProductQuery } from "@/services/products/queries";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams<{ productId: string }>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const cart = useCart();

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
    <section className="py-10">
      <Container>
        <div className="grid min-h-[600px] lg:grid-cols-2 gap-y-6">
          <div className="bg-muted relative rounded-xl overflow-hidden min-h-[400px]">
            <Image
              src={product.imageUrl}
              alt={`product-${product.title}`}
              className={cn(
                "absolute inset-0 h-full w-full object-cover opacity-0 scale-95 transition-all blur-lg",
                isLoaded && "opacity-100 scale-100 blur-none"
              )}
              onLoadingComplete={() => setIsLoaded(true)}
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

            <Button
              className="w-full rounded-full"
              onClick={() => cart.addItem(product)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
