"use client";

import ImageNext from "next/image";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { ExpandIcon, ShoppingCartIcon } from "lucide-react";

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

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <Card onClick={handleClick} className="group gap-1 p-1">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <ImageNext
          fill
          src={product?.imageUrl}
          alt={`product-${product.title}`}
          className="aspect-square rounded-xl object-cover"
        />
        <div className="absolute bottom-5 w-full opacity-0 transition group-hover:opacity-100">
          <div className="flex justify-center gap-x-6">
            <Button onClick={onPreview} size="icon" variant="secondary">
              <ExpandIcon />
              <span className="sr-only">Preview</span>
            </Button>
            <Button onClick={onAddToCart} size="icon" variant="secondary">
              <ShoppingCartIcon />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
      <CardHeader className="gap-0 p-2 h-[80px]">
        <CardTitle className="text-xl">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-2">
        <Currency value={+product?.price} />
      </CardFooter>
    </Card>
  );
}
