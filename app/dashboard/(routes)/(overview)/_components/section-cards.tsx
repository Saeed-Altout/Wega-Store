import { IconFolderCheck, IconWallet } from "@tabler/icons-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card>
        <CardHeader>
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            +10
          </CardTitle>
          <CardAction>
            <IconFolderCheck className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Sales</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            20000$
          </CardTitle>
          <CardAction>
            <IconWallet className="size-4 text-muted-foreground" />
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
