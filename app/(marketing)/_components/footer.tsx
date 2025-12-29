import Link from "next/link";
import { FiGithub } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="py-6 flex items-center justify-between">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} Wega Store. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              asChild
              size="icon"
              className="hidden sm:flex"
            >
              <Link
                href="https://github.com/Saeed-Altout/Wega-Store"
                rel="noopener noreferrer"
                target="_blank"
                className="dark:text-foreground"
              >
                <FiGithub />
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </Container>
    </footer>
  );
}
