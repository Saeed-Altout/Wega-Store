"use client";

import Link from "next/link";
import { MenuIcon, ShoppingCartIcon, StoreIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/hooks/use-cart";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const isMobile = useIsMobile();
  const cart = useCart();

  return (
    <Container className="flex items-center justify-between">
      <NavigationMenu viewport={isMobile}>
        <Link href="/" className="flex items-center gap-2 mr-4">
          <StoreIcon className="size-8" />
          <span className="text-xl font-semibold">Wega Store</span>
        </Link>
        <NavigationMenuList className="flex-wrap hidden md:flex">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/products">Products</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex justify-end gap-4">
        <Button className="rounded-full" onClick={() => cart.onOpen()}>
          <ShoppingCartIcon /> {cart.items.length}
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="flex md:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="px-4">
            <SheetHeader>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                This menu for mobile
              </SheetDescription>
            </SheetHeader>
            <NavigationMenu className="flex items-start justify-start flex-col gap-6">
              <Link href="/" className="flex items-center gap-2 mr-4">
                <StoreIcon className="size-8" />
                <span className="text-xl font-semibold">Wega Store</span>
              </Link>
              <NavigationMenuList className="flex-col items-start gap-2">
                <NavigationMenuItem>
                  <Button variant="link" asChild>
                    <Link href="/">Home</Link>
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="link" asChild>
                    <Link href="/products">Products</Link>
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
    </Container>
  );
}
