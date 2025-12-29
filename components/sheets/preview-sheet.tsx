"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ShoppingCartIcon, TrashIcon } from "lucide-react";

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
      <div className="space-y-4 h-[72vh] overflow-y-auto w-full px-4 py-2">
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
              <Button
                variant="destructive"
                onClick={() => cart.removeItem(item.id)}
                size="icon-sm"
                className="ml-2"
              >
                <TrashIcon />
                <span className="sr-only">Remove</span>
              </Button>
            </ItemActions>
          </Item>
        ))}
      </div>

      <div className="space-y-4 px-4">
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
