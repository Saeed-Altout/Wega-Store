export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto py-6">
        <p className="text-center text-muted-foreground">
          © {new Date().getFullYear()} Wega Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
