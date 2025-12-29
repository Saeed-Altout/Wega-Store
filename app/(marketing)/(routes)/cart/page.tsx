"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { TrashIcon, ShoppingCartIcon } from "lucide-react";

import { useCart } from "@/hooks/use-cart";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Currency } from "@/components/ui/currency";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export default function CartPage() {
  const cart = useCart();

  const subtotal = useMemo(
    () =>
      cart.items.reduce((total, product) => {
        return total + +product.price;
      }, 0),
    [cart.items]
  );

  if (cart.items.length === 0) {
    return (
      <Empty className="h-[600px]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingCartIcon />
          </EmptyMedia>
          <EmptyTitle>Cart is empty</EmptyTitle>
          <EmptyDescription>You have no items in your cart.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm" asChild>
            <Link href="/products">Continue to shopping</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <section className="py-10" id="cart-items-section">
      <Container>
        <div className="grid md:grid-cols-3 gap-4 w-full">
          <div className="space-y-4 md:col-span-2">
            <Heading title="Your cart" />
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

          <div className="space-y-4 md:col-span-1">
            <Heading title="Summary Order" />
            <span className="text-xl flex items-center gap-2">
              Subtotal: <Currency value={subtotal} />{" "}
            </span>
            <Separator />

            <Button disabled className="w-full rounded-full">
              Process to Checkout
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
