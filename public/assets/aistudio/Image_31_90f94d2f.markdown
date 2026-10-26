---
name: KiPay Ecosystem
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#00174b'
  on-tertiary-container: '#497cff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  currency-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  currency-display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a high-trust, swift, and authoritative transactional environment engineered for Uganda's emerging digital economy—spanning instant mobile money transfers (MTN MoMo, Airtel Money), smart municipal parking enforcement, utility bills, and merchant point-of-sale settlements.

The design movement combines **Corporate Modernism** with **Fintech Functionalism**. It avoids frivolous visual clutter in favor of crisp delineation, high scan-ability in high-glare equatorial sunlight, and an instant psychological sense of bank-grade security.

### Core Principles
- **Clarity Under Pressure:** Transactions, parking session countdowns, and tariff breakdowns must be legible at a glance on low-tier smartphones as clearly as on flagship displays.
- **Uncompromised Fidelity:** Numerical values, currency codes (`UGX`), USSD shortcode badges, and transaction statuses communicate finality and confidence.
- **African Utility & Precision:** Visual feedback is snappy and tactile, reducing cognitive load for repetitive high-velocity actions like QR scans, license plate input, and mobile wallet cash-ins.

## Colors

The palette balances institutional stability with energetic financial validation:

- **Primary (`#0F172A` - Deep Midnight Slate):** Anchors headers, primary interactive states, structural cards, and high-emphasis textual readouts. Represents institutional permanence and financial security.
- **Secondary (`#0D9488` - Kinetic Mint/Teal):** The transactional engine. Used for affirmative actions, wallet top-ups, positive cashflows, paid parking receipts, and confirmed ledger states.
- **Tertiary (`#2563EB` - Systemic Blue):** Designated for utility integrations, telecommunication pathways (MoMo/Airtel routing), transit checkpoints, and informational callouts.
- **Neutral Palette (`#64748B` - Slate Neutral):** Extends from slate-900 down to warm alabaster (`#F8FAFC`). Ensures non-fatiguing contrast for ledger lines, table rows, and secondary metadata without resorting to pure lifeless greys.

### Semantic Status Colors
- **Success:** `#059669` (Completed transfers, active parking meters)
- **Warning / Pending:** `#D97706` (Escrowed payments, parking grace periods under 10m)
- **Destructive / Expired:** `#DC2626` (Overdue parking fines, failed gateway authorizations, expired sessions)
- **Canvas Base:** `#F8FAFC` for page backgrounds, contrasted with pure `#FFFFFF` for primary surface containers.

## Typography

The typography couples the modern geometry and approachable humanist terminals of **Plus Jakarta Sans** for headers, marketing banners, and balance totals, with the strict tabular precision of **Inter** for data grids, badges, transaction histories, and input labels.

### Currency Formatting Rules (UGX)
- Currency tokens must always present the ISO prefix `UGX` set in `Inter` (medium weight, slightly tracking outward) followed by a non-breaking space and the numerical sum formatted with full thousands comma separators (`UGX 250,000`).
- Because UGX does not utilize cents or fractional denominations in standard consumer flows, decimal points are omitted entirely unless representing foreign exchange rate tables.
- Monospaced numerical features (`tnum` font feature flag) must be enabled on all balances, countdown clocks, transaction IDs, and license plates to prevent layout jitter during live updates.

## Layout & Spacing

The spatial architecture is strictly built upon an **8-point grid rhythm**, utilizing `0.25rem` (4px) as a surgical micro-adjustment step for badges and borders.

### Layout Model
- **Mobile (Base to 639px):** 4-column fluid layout with `1rem` margins and `1rem` gutters. Touch targets adhere to minimum `48px` squares. Primary actions sit sticky at the bottom viewport above the device navigation bar.
- **Tablet (640px to 1023px):** 8-column layout with `2rem` margins and `1.5rem` gutters. Splits parking meters and payment summaries into balanced dual panels.
- **Desktop (1024px+):** 12-column layout capped at a maximum container width of `1280px`, centered with `3rem` gutters, dedicated to web dashboards, multi-terminal fleet management, and merchant reconciliation screens.

## Elevation & Depth

Visual hierarchy relies on structural **tonal layers** paired with clean, crisp perimeter micro-borders and soft ambient diffusion. Pure heavy drop shadows are forbidden.

### Depth Hierarchy
1. **Level 0 (Floor/Canvas):** Hex `#F8FAFC`. Base backdrop.
2. **Level 1 (Default Containers & Cards):** Pure Hex `#FFFFFF` with a crisp boundary: `border: 1px solid #E2E8F0` and subtle ambient lift `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`.
3. **Level 2 (Dropdowns, Floating Summaries, Hover States):** `#FFFFFF` paired with `border: 1px solid #CBD5E1` and ambient elevation `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
4. **Level 3 (Modals, PIN Verification Drawers, USSD Confirmation Sheets):** Elevated sheet with `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)` underpinned by a semi-transparent scrim (`#0F172A` at 40% opacity).

## Shapes

The design system employs a **Rounded** aesthetic (`level 2`, `0.5rem` / `8px` baseline radius). This geometry hits the golden mean between the welcoming tactility of modern mobile wallets and the disciplined rigor of municipal and banking software.

### Shape Scales
- **Inputs, Buttons, and Quick-Action Tiles:** `8px` (`rounded-md`).
- **Cards, Modals, Transaction Drawers:** `16px` (`rounded-lg`).
- **Surface Panels & Bottom-Sheet Sheets:** `24px` top corners (`rounded-xl`).
- **Pills, Transaction Badges, Status Dots, Avatar Wrappers:** Fully rounded circular contours (`rounded-full` / 9999px).

## Components

### Buttons
- **Primary:** Deep Slate background (`#0F172A`), crisp white text, 48px height, 8px corner radius. On active press, transforms to `#1E293B`.
- **Secondary / Accent:** Teal fill (`#0D9488`), white text, used strictly for final confirmation actions (e.g., "Confirm UGX 5,000", "Start Parking").
- **Outline / Ghost:** 1px border (`#CBD5E1`), Slate-900 text, transparent canvas, transitioning to `#F1F5F9` on hover.

### Inputs & Phone Number Fields
- Built for Ugandan cellular standards. Prefix fixed chip: `+256` in slate-100 container paired with automatic telecom logo detection (MTN yellow dot, Airtel red dot) based on the subsequent 2-digit dial prefix (e.g., 77/78 for MTN, 70/75 for Airtel).
- Border: `1px solid #CBD5E1`, focusing to `2px solid #0D9488` with a 2px offset halo (`rgba(13, 148, 136, 0.15)`).

### Transaction Badges & Status Chips
- Height: 24px, pill-shaped (`rounded-full`), padded with 8px horizontal spacing.
- Font: Inter SemiBold, 11px uppercase with tracked spacing.
- **Success (Settled/Active):** Mint background (`#CCFBF1`), deep emerald text (`#115E59`).
- **Pending (USSD Processing):** Amber background (`#FEF3C7`), amber text (`#92400E`).
- **Failed (Declined/Expired):** Rose background (`#FFE4E6`), crimson text (`#9F1239`).

### Cards & Ledger Tiles
- White canvas on Slate-50 background, bounded by a 1px `#E2E8F0` border.
- **Transaction Line Item:** Left-hand circular category avatar (40px) with dedicated icon; central 2-line title and timestamp; right-aligned tabular currency total in bold (positive receipts prepended with `+` in teal `#0D9488`).

### Dedicated Parking Widget
- High-contrast visual timer displaying remaining minutes, vehicle registration plate (formatted with classic black-on-yellow or white-on-dark font styling), zone designation (e.g., "Kampala Central - Zone 1A"), and an instantaneous single-tap "Extend Time" button.