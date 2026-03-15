# Agent Guidelines for BoroBazar

## Project Structure

This is a monorepo with:
- `/client` - React frontend (Vite + TypeScript)
- `/server` - Express backend (TypeScript)

## Commands

### Client (React)

```bash
# Development
cd client && npm run dev

# Build for production
cd client && npm run build

# Lint code
cd client && npm run lint

# Preview production build
cd client && npm run preview
```

### Server (Express)

```bash
# Development (auto-restart)
cd server && npm run dev

# Build TypeScript
cd server && npm run build

# Start production
cd server && npm run start
```

## Code Style Guidelines

### Imports

- Use path aliases: `@/` for `src/` (e.g., `@/components/ui/button`)
- Order imports: external libs → internal modules → relative paths
- Use `import type` for type-only imports when possible

```typescript
// Good
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"

// Avoid
import React, { useState, useEffect } from "react"
```

### TypeScript

- Use strict mode - avoid `any` type
- Prefer interfaces over types for object shapes
- Use `type` for unions, intersections, and primitives
- Enable `strict: true` in tsconfig (already set)

```typescript
// Good
interface User {
  id: string
  name: string
  email: string
}

type Status = "pending" | "active" | "completed"

// Avoid
interface User {
  [key: string]: any
}
```

### Naming Conventions

- Components: PascalCase (`HomePage`, `ProductCard`)
- Hooks: camelCase with `use` prefix (`useCart`, `useAuth`)
- Files: kebab-case for components (`product-card.tsx`), camelCase for utils
- Constants: UPPER_SNAKE_CASE for config values, camelCase otherwise
- Types/Interfaces: PascalCase with `type`/`interface` suffix where helpful

### Component Structure

- Use functional components with hooks
- Extract types to `/src/types/` directory
- Co-locate related files (component + tests + types)
- Use index.ts for clean exports

```typescript
// Button.tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

// Use cva (class-variance-authority) for variant props
import { cva, type VariantProps } from "class-variance-authority"
```

### Styling (TailwindCSS)

- Use `@/lib/utils` cn() function for class merging
- Follow shadcn/ui patterns with CSS variables
- Use design tokens from tailwind.config.ts (colors, spacing)
- Prefer utility classes over custom CSS

```typescript
// Good
import { cn } from "@/lib/utils"
<div className={cn("base-class", condition && "conditional-class")} />

// Avoid
<div className={`base-class ${condition ? 'conditional-class' : ''}`} />
```

### Error Handling

- Use try/catch for async operations
- Return typed responses from API calls
- Handle 401 (unauthorized) globally via axios interceptor
- Use toast/notification for user-facing errors

```typescript
// API calls
try {
  const response = await api.get("/products")
  return response.data
} catch (error) {
  console.error("Failed to fetch products:", error)
  throw error
}
```

### State Management

- Use React Query (TanStack Query) for server state
- Use useState/useReducer for local UI state
- Store auth token in localStorage/sessionStorage

### API Patterns

- Use axios with interceptors for auth tokens
- Base API: `import api from "@/lib/Api"`
- Create service files in `/src/services/`

### Linting

- ESLint runs with TypeScript ESLint plugin
- React hooks linting enabled
- React refresh enabled for HMR
- Fix issues before committing: `npm run lint -- --fix`

### Testing

- No test framework configured yet - consider adding Vitest/Jest
- Follow component-driven testing patterns when added

### Git Conventions

- Work on feature branches, merge via PR
- Resolve merge conflicts carefully (project has pending conflicts)
- Run lint before committing

### shadcn/ui

- UI components in `/src/components/ui/`
- Uses Radix primitives
- Customized via tailwind.config.ts
- Icons from Lucide React

## Important Notes

- Project has merge conflicts in some files - resolve before making changes
- TailwindCSS version: conflicts between v3 and v4 - pick one branch and resolve
- Environment variables: Use `.env` files, never commit secrets
- API proxy configured in vite.config.ts for development