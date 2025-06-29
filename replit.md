# Rest Express Full-Stack Application

## Overview

This is a full-stack TypeScript application built with Express.js backend and React frontend, featuring modern development tools and a sophisticated UI component system. The application uses a monorepo structure with shared types and schemas, PostgreSQL database with Drizzle ORM, and shadcn/ui components for the user interface.

## System Architecture

### Monorepo Structure
- **Frontend**: React 18 with TypeScript, located in `client/` directory
- **Backend**: Express.js with TypeScript, located in `server/` directory  
- **Shared**: Common schemas and types in `shared/` directory
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations

### Build System
- **Frontend**: Vite for fast development and optimized production builds
- **Backend**: ESBuild for server bundling with Node.js target
- **Development**: TSX for TypeScript execution in development mode
- **Styling**: Tailwind CSS with custom design system

## Key Components

### Frontend Architecture
- **React Router**: Client-side routing with BrowserRouter
- **State Management**: TanStack React Query for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: Framer Motion for smooth transitions and interactions
- **Theme System**: Dark/light mode with system preference detection

### Backend Architecture
- **Express.js**: RESTful API server with TypeScript
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Database**: PostgreSQL with Drizzle ORM (configured but not yet connected)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Vite middleware integration for seamless full-stack development

### Database Schema
- **Users Table**: Basic user entity with id, username, and password fields
- **Schema Validation**: Zod schemas for runtime type validation
- **Type Safety**: Full TypeScript integration with inferred types from Drizzle

### UI Component System
- **Design System**: shadcn/ui with "new-york" style variant
- **Component Library**: Comprehensive set of reusable components (buttons, forms, dialogs, etc.)
- **Accessibility**: Built on Radix UI primitives ensuring WCAG compliance
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Routes**: Express routes handle requests and interact with storage layer
3. **Storage Interface**: Abstracted CRUD operations (currently in-memory, prepared for database)
4. **Database Integration**: Drizzle ORM ready for PostgreSQL connection
5. **Response Handling**: Type-safe responses with shared TypeScript interfaces

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database client
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management for React
- **framer-motion**: Animation library for React components

### UI and Styling
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional class name utility

### Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR on port 3000
- **Backend**: Express server with Vite middleware integration
- **Database**: Drizzle migrations with push command for schema updates

### Production Build
1. **Frontend**: `vite build` creates optimized static assets in `dist/public`
2. **Backend**: `esbuild` bundles server code to `dist/index.js`
3. **Deployment**: Single Node.js process serves both API and static files
4. **Database**: PostgreSQL connection via environment variable `DATABASE_URL`

### Environment Configuration
- **Development**: Local development with file watching and hot reload
- **Production**: Optimized builds with static file serving
- **Database**: Environment-based connection string configuration

## Changelog

```
Changelog:
- June 29, 2025. Initial setup - Migrated from Lovable to Replit
- June 29, 2025. Added Arabic language translation support with RTL text direction
- June 29, 2025. Enhanced scroll animations with advanced effects (zoomOut, wave, blur, elastic, flipX, etc.)
- June 29, 2025. Implemented comprehensive bilingual portfolio website with language switcher
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```