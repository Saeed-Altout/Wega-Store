import { Banner } from "./_components/banner";
import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProducts } from "@/services/products/api";
import { PreviewSheet } from "@/components/sheets/preview-sheet";
import { SearchCommand } from "@/components/search-command";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Banner />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />

      <PreviewSheet />
      <SearchCommand />
    </HydrationBoundary>
  );
}
