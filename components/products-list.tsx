"use client";

import { Search } from "lucide-react";
import { useTransition } from "react";
import { debounce, useQueryState } from "nuqs";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ProductCard } from "@/components/cards/product-card";

import { CATEGORIES } from "@/constants/index";
import { Product } from "@/lib/generated/client";

export function ProductsList({ products }: { products: Product[] }) {
  const [isLoading, startTransition] = useTransition();

  const [search, setSearch] = useQueryState("search", {
    limitUrlUpdates: debounce(1000),
    defaultValue: "",
    startTransition,
    shallow: false,
  });

  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  });

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSearch =
      search.trim() === "" ||
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const onClear = () => {
    setCategory("all");
    setSearch("");
  };

  return (
    <div className="mt-5">
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
        <div className="flex items-center gap-x-2">
          <Button
            className="rounded-full"
            size="sm"
            variant={category === "all" ? "secondary" : "ghost"}
            onClick={() => setCategory("all")}
          >
            All
          </Button>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.value}
              className="rounded-full"
              size="sm"
              variant={cat.value === category ? "secondary" : "ghost"}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <InputGroup className="md:max-w-md">
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value, {
                limitUrlUpdates:
                  e.target.value === "" ? undefined : debounce(1000),
              })
            }
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          {isLoading && (
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>
      <div className="mt-10 space-y-5">
        {filteredProducts.length === 0 && (
          <div className="h-[300px] flex justify-center items-center">
            <p className="text-center text-muted-foreground">
              <Button variant="outline" onClick={onClear}>
                Clear Filter
              </Button>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
