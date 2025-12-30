"use client";

import ImageNext from "next/image";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon } from "lucide-react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Currency } from "@/components/ui/currency";

import { Product } from "@/lib/generated/client";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const cart = useCart();

  const handleClick = () => {
    router.push(`/products/${product?.id}`);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(product);
  };

  return (
    <Card onClick={handleClick} className="group gap-1 p-1">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <ImageNext
          fill
          src={product?.imageUrl}
          alt={`product-${product.title}`}
          className={cn(
            "aspect-square rounded-xl object-cover opacity-0 scale-95 transition-all blur-lg",
            isLoaded && "opacity-100 scale-100 blur-none"
          )}
          onLoadingComplete={() => setIsLoaded(true)}
        />
        <div className="absolute bottom-5 w-full md:opacity-0 opacity-100 transition group-hover:opacity-100">
          <div className="flex justify-center gap-x-6">
            <Button onClick={onAddToCart} size="icon" variant="secondary">
              <ShoppingCartIcon />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
      <CardHeader className="gap-1 p-2">
        <CardTitle className="line-clamp-1">{product.title}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardFooter className="p-2">
        <Currency value={+product?.price} />
      </CardFooter>
    </Card>
  );
}
