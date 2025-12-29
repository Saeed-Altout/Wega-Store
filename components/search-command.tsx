"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";

import { useSearchStore } from "@/hooks/use-search-store";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Spinner } from "@/components/ui/spinner";

import { useGetProductsQuery } from "@/services/products/queries";
import { Product } from "@/lib/generated/client";

export function SearchCommand() {
  const router = useRouter();
  const { data: products, isLoading } = useGetProductsQuery();

  const toggle = useSearchStore((state) => state.toggle);
  const onClose = useSearchStore((state) => state.onClose);
  const onOpen = useSearchStore((state) => state.onOpen);
  const isOpen = useSearchStore((state) => state.isOpen);

  const onSelect = (id: string) => {
    router.push(`/products/${id}`);
    onClose();
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  return (
    <CommandDialog open={isOpen} onOpenChange={isOpen ? onClose : onOpen}>
      <CommandInput placeholder={`Search product name...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Products">
          {isLoading ? (
            <div className="h-20 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {products?.map((product: Product) => (
                <CommandItem
                  key={product.id}
                  value={`${product.id}-${product.title}`}
                  title={product.title}
                  onSelect={() => onSelect(product.id)}
                >
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  <span>{product.title}</span>
                </CommandItem>
              ))}
            </>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
