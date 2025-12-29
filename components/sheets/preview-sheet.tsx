"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ShoppingCartIcon } from "lucide-react";

import { useCart } from "@/hooks/use-cart";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Currency } from "@/components/ui/currency";

export function PreviewSheet() {
  const cart = useCart();

  const subtotal = useMemo(
    () =>
      cart.items.reduce((total, product) => {
        return total + +product.price;
      }, 0),
    [cart.items]
  );

  if (cart.items.length === 0) {
    return null;
  }

  return (
    <Modal
      isOpen={cart.isOpen}
      onClose={cart.onClose}
      variant="sheet"
      title="My Cart"
      description="Product details"
    >
      {cart.items.map((item) => (
        <Item key={item.id} variant="muted">
          <ItemMedia variant="image">
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={80}
              height={80}
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{item.title}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Currency value={+item.price} />
          </ItemActions>
        </Item>
      ))}

      <div className="space-y-4">
        <span className="text-xl flex items-center gap-2">
          Subtotal: <Currency value={subtotal} />{" "}
        </span>
        <Separator />

        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/cart">
              <ShoppingCartIcon />
              View Cart
            </Link>
          </Button>
          <Button disabled>Checkout</Button>
        </div>
      </div>
    </Modal>
  );
}
