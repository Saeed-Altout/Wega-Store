"use client";

import { FilterIcon, Search } from "lucide-react";
import { useTransition } from "react";
import { debounce, useQueryState } from "nuqs";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";

import { CATEGORIES } from "@/constants";
import { Product } from "@/lib/generated/client";
import { Label } from "@/components/ui/label";
import { ProductsList } from "../products-list";
import { EmptyState } from "../ui/empty-state";

export function ProductsSection({ products }: { products: Product[] }) {
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    limitUrlUpdates: debounce(500),
    startTransition,
  });

  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  });

  const [minPrice, setMinPrice] = useQueryState("min", {
    defaultValue: "",
  });

  const [maxPrice, setMaxPrice] = useQueryState("max", {
    defaultValue: "",
  });

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = products.filter(
    ({ title, description, category: c, price }) => {
      const p = Number(price);

      if (category !== "all" && c !== category) return false;
      if (minPrice !== "" && p < Number(minPrice)) return false;
      if (maxPrice !== "" && p > Number(maxPrice)) return false;

      if (!normalizedSearch) return true;

      return (
        title.toLowerCase().includes(normalizedSearch) ||
        description.toLowerCase().includes(normalizedSearch)
      );
    }
  );

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <aside className="col-span-1 hidden md:block space-y-4">
        <Heading title="Filters" />
        <div className="space-y-2">
          <Label>Search</Label>
          <InputGroup>
            <InputGroupInput
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value, {
                  limitUrlUpdates:
                    e.target.value === "" ? undefined : debounce(500),
                })
              }
            />
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            {isPending && (
              <InputGroupAddon align="inline-end">
                <Spinner />
              </InputGroupAddon>
            )}
          </InputGroup>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant={category === "all" ? "secondary" : "ghost"}
              onClick={() => setCategory("all")}
              className="justify-start"
            >
              All
            </Button>

            {CATEGORIES.map((cat) => (
              <Button
                key={cat.value}
                size="sm"
                variant={category === cat.value ? "secondary" : "ghost"}
                onClick={() => setCategory(cat.value)}
                className="justify-start"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </aside>

      <div className="md:hidden flex items-center justify-between gap-4">
        <InputGroup>
          <InputGroupInput
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value, {
                limitUrlUpdates:
                  e.target.value === "" ? undefined : debounce(500),
              })
            }
          />
          <InputGroupAddon>
            <Search className="size-4" />
          </InputGroupAddon>
          {isPending && (
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          )}
        </InputGroup>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              Filters <FilterIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Filter</SheetTitle>
              <SheetDescription>you can filter products</SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant={category === "all" ? "secondary" : "ghost"}
                    onClick={() => setCategory("all")}
                    className="justify-start"
                  >
                    All
                  </Button>

                  {CATEGORIES.map((cat) => (
                    <Button
                      key={cat.value}
                      size="sm"
                      variant={category === cat.value ? "secondary" : "ghost"}
                      onClick={() => setCategory(cat.value)}
                      className="justify-start"
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={minPrice ?? ""}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={maxPrice ?? ""}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="md:col-span-4 space-y-4">
        <Heading title="Explore Products" />
        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No Products"
            description="Sorry, we could not find any products"
            label="Clear filter"
            onClick={clearFilters}
            className="py-40!"
          />
        ) : (
          <ProductsList products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
