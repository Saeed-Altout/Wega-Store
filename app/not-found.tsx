import Link from "next/link";
import { FrownIcon, ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4 px-4">
      <FrownIcon className="size-16" />
      <h1 className="text-4xl md:text-6xl font-bold">
        Not Found <span className="text-indigo-600">404</span>
      </h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">
          <ArrowLeftIcon /> Go back to home
        </Link>
      </Button>
    </div>
  );
}
