# Wega Store

A modern e-commerce platform built with reliability and scalability in mind.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database & ORM**: [Prisma](https://www.prisma.io/) with [PostgreSQL](https://www.postgresql.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) & [Axios](https://axios-http.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Table & Charts**: [TanStack Table](https://tanstack.com/table) & [Recharts](https://recharts.org/)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run generate
npx prisma generate

# Run migrations
npx prisma db push

# Start development server
npm run dev
```

## Notes

- Create new account on [Clerk](https://clerk.com/) for authentication
- Create new project on [Neon](https://neon.tech/) for database
