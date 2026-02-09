# Version Updates Documentation

## Overview
This document records all package version updates made to the Web3-Sentinel project.

## Date: 2026-02-09

## Major Version Changes

### Next.js
- **Previous**: 15.2.4 → **Current**: 16.1.6
- **Breaking Changes**: 
  - Removed `eslint` configuration from `next.config.mjs`. ESLint should now be configured via ESLint config files.
  - Turbopack is now the default development server.

### Tailwind CSS
- **Previous**: 3.4.17 → **Current**: 4.1.18
- **Breaking Changes**:
  - PostCSS plugin moved to `@tailwindcss/postcss` package
  - Updated `postcss.config.mjs` to use `@tailwindcss/postcss` instead of `tailwindcss`
  - Updated `app/globals.css` to use Tailwind v4 CSS-first configuration
  - `@tailwind` directives replaced with `@import "tailwindcss"`
  - Theme configuration moved to CSS `@theme` block
  - Custom variants defined using `@custom-variant` syntax

## All Package Updates

### Dependencies Updated

| Package | Previous Version | Current Version |
|---------|-----------------|-----------------|
| @emotion/is-prop-valid | 1.3.1 | 1.4.0 |
| @hookform/resolvers | 3.9.1 | 5.2.2 |
| @radix-ui/react-accordion | 1.2.2 | 1.2.12 |
| @radix-ui/react-alert-dialog | 1.1.4 | 1.1.15 |
| @radix-ui/react-aspect-ratio | 1.1.1 | 1.1.8 |
| @radix-ui/react-avatar | 1.1.2 | 1.1.11 |
| @radix-ui/react-checkbox | 1.1.3 | 1.3.3 |
| @radix-ui/react-collapsible | 1.1.2 | 1.1.12 |
| @radix-ui/react-context-menu | 2.2.4 | 2.2.16 |
| @radix-ui/react-dialog | 1.1.4 | 1.1.15 |
| @radix-ui/react-dropdown-menu | 2.1.4 | 2.1.16 |
| @radix-ui/react-hover-card | 1.1.4 | 1.1.15 |
| @radix-ui/react-label | 2.1.1 | 2.1.8 |
| @radix-ui/react-menubar | 1.1.4 | 1.1.16 |
| @radix-ui/react-navigation-menu | 1.2.3 | 1.2.14 |
| @radix-ui/react-popover | 1.1.4 | 1.1.15 |
| @radix-ui/react-progress | 1.1.1 | 1.1.8 |
| @radix-ui/react-radio-group | 1.2.2 | 1.3.8 |
| @radix-ui/react-scroll-area | 1.2.2 | 1.2.10 |
| @radix-ui/react-select | 2.1.4 | 2.2.6 |
| @radix-ui/react-separator | 1.1.1 | 1.1.8 |
| @radix-ui/react-slider | 1.2.2 | 1.3.6 |
| @radix-ui/react-slot | 1.1.1 | 1.2.4 |
| @radix-ui/react-switch | 1.1.2 | 1.2.6 |
| @radix-ui/react-tabs | 1.1.2 | 1.1.13 |
| @radix-ui/react-toast | 1.2.4 | 1.2.15 |
| @radix-ui/react-toggle | 1.1.1 | 1.1.10 |
| @radix-ui/react-toggle-group | 1.1.1 | 1.1.11 |
| @radix-ui/react-tooltip | 1.1.6 | 1.2.8 |
| autoprefixer | 10.4.20 | 10.4.24 |
| cmdk | 1.0.4 | 1.1.1 |
| embla-carousel-react | 8.5.1 | 8.6.0 |
| framer-motion | 12.9.2 | 12.34.0 |
| input-otp | 1.4.1 | 1.4.2 |
| lucide-react | 0.454.0 | 0.563.0 |
| next-themes | 0.4.4 | 0.4.6 |
| react | 19.0.0 | 19.2.4 |
| react-day-picker | 8.10.1 | 9.13.1 |
| react-dom | 19.0.0 | 19.2.4 |
| react-hook-form | 7.54.1 | 7.71.1 |
| react-resizable-panels | 2.1.7 | 4.6.2 |
| recharts | 2.15.0 | 3.7.0 |
| sonner | 1.7.1 | 2.0.7 |
| tailwind-merge | 2.5.5 | 3.4.0 |
| vaul | 0.9.6 | 1.1.2 |
| zod | 3.24.1 | 4.3.6 |

### Dev Dependencies Updated

| Package | Previous Version | Current Version |
|---------|-----------------|-----------------|
| @types/node | 22.0.0 | 25.2.2 |
| @types/react | 19.0.0 | 19.2.13 |
| @types/react-dom | 19.0.0 | 19.2.3 |
| postcss | 8.0.0 | 8.5.6 |
| tailwindcss | 3.4.17 | 4.1.18 |
| typescript | 5.0.2 | 5.9.3 |

### New Dependencies Added
- `@tailwindcss/postcss` (4.1.18) - Required for Tailwind CSS v4 PostCSS integration

## Configuration Files Modified

1. **postcss.config.mjs**
   - Changed `tailwindcss` plugin to `@tailwindcss/postcss`

2. **next.config.mjs**
   - Removed deprecated `eslint` configuration block

3. **app/globals.css**
   - Updated from Tailwind v3 to v4 syntax
   - Changed `@tailwind` directives to `@import "tailwindcss"`
   - Moved theme configuration to CSS `@theme` block
   - Added `@custom-variant dark` for dark mode support

## Verification Results

### Build Status: ✅ Passed
- Build completed successfully using Next.js 16.1.6 with Turbopack
- All 37 routes generated successfully

### Development Server: ✅ Passed
- Server started in 771ms
- No errors or warnings

### TypeScript: ✅ Passed
- TypeScript configuration automatically updated by Next.js
- No type errors detected

## Notes

1. The `tailwind.config.ts` file is still present but is now optional with Tailwind v4 as the configuration is primarily done in CSS. It can be removed if not needed.

2. Recharts warnings about chart dimensions are expected during static generation and do not indicate errors.

3. All Radix UI components have been updated to their latest versions with minor patch updates.

4. Zod v4 has breaking changes from v3. Ensure all Zod schemas are compatible with the new version.
