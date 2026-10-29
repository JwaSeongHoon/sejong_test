---
name: Sejong EduCare AI Admin Platform
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#40608b'
  on-secondary: '#ffffff'
  secondary-container: '#aeceff'
  on-secondary-container: '#375782'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a8c8f9'
  on-secondary-fixed: '#001c3a'
  on-secondary-fixed-variant: '#264872'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Noto Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.002em
  body-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Noto Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0em
  label-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-xs:
    fontFamily: Noto Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system establishes a high-assurance, government-grade administrative environment for early childhood education and care integration (유보통합). The target audience comprises municipal education officers, kindergarten and daycare directors, and administrative reviewers managing policy integration, funding, personnel, and compliance under the Sejong City Office of Education.

The visual direction follows **Corporate / Modern Enterprise SaaS**, explicitly distancing itself from obsolete public-sector portal aesthetics (such as visual noise, cluttered banner modules, and fragmented navigation tables) and frivolous tech gimmicks. The core emotional signature is institutional credibility, cognitive clarity, and effortless operational speed.

Visual principles:
- **Administrative Precision**: Layouts prioritize data hierarchy, predictable keyboard navigation, dense information legibility, and strict typographic order.
- **Controlled Modernity**: Architectural structural frames, quiet borders, and balanced whitespace replace ornate decorative containers.
- **Intentional AI Differentiation**: Artificial intelligence operations and recommendations are not stylized as whimsical chat widgets; instead, they are grounded as audited, system-level intelligence demarcated by structured mint accents and rigorous status indicators.

## Colors
The palette balances authoritative civic stewardship with modern SaaS readability. 

### Palette Architecture
- **Primary Blue (`#2563EB`)**: Focus anchors, primary CTA buttons, active tab states, and key navigational interactions.
- **Deep Navy (`#163A63`)**: Institutional ground layer. Utilized for global sidebar chrome, persistent structural navigation, and top-tier administrative framing.
- **Mint Accent (`#10B981`)**: Dedicated exclusively to automated intelligence features, machine-assisted document summaries, algorithmic validation states, and AI copilots.
- **Neutral Surface Ecosystem**:
  - App Canvas Ground: `#F8FAFC`
  - Base Surface & Cards: `#FFFFFF`
  - Subtle Inset Background: `#F1F5F9`
  - Structural Borders & Hairlines: `#E2E8F0`
  - Active & Hover Borders: `#CBD5E1`
- **Text & Content**:
  - Primary Text: `#0F172A` (WCAG AAA compliant against surface white)
  - Secondary / Helper Text: `#64748B`
  - Disabled / Placeholder Text: `#94A3B8`
- **Status & Compliance Semantics**:
  - Success: `#16A34A` (Light background: `#F0FDF4`, Border: `#BBF7D0`)
  - Warning / Verification Required: `#F59E0B` (Light background: `#FFFBEB`, Border: `#FDE68A`)
  - Error / Regulatory Rejection: `#EF4444` (Light background: `#FEF2F2`, Border: `#FECACA`)
  - Info / Policy Memo: `#0284C7` (Light background: `#F0F9FF`, Border: `#BAE6FD`)

Color must never serve as the sole conveyor of regulatory status; all stateful indicators pair these colors with dedicated typographic labels and unambiguous icon glyphs.

## Typography
Typography is tuned for dense administrative forms, legal policy guidelines, Korean institutional terminology, and numeric financial accounting.

Implementation relies on the system stack: `Pretendard, "Noto Sans KR", -apple-system, BlinkMacSystemFont, system-ui, sans-serif`.

### Typographic Rules
1. **Vertical Rhythm**: Korean glyphs possess greater vertical optical density than Latin letterforms; a minimum line-height of 1.5x is enforced across all body passages, scaling to 1.55x for legal policy guidelines.
2. **Tabular Numerals**: All numerical data (budget figures, birthdates, teacher-to-child ratios, application counts) must enable `font-variant-numeric: tabular-nums` to maintain vertical decimal alignment across administrative grid tables.
3. **Hierarchy and Restraint**: Font weights are strictly limited to `400` (Regular), `600` (Semi-Bold), and `700` (Bold). Avoid lightweight fonts (`300` and below) to guarantee readability on variable government hardware and low-contrast displays.

## Layout & Spacing
The layout uses an explicit **8px baseline metric system** (0.5rem = 8px) designed for data-heavy desktop environments with responsive accommodations for tablets and mobile monitors.

### Layout Engine
- **Global Structure**: Persistent Left Navigation Rail/Sidebar (`260px` fixed, collapsible to `72px`), Top Utility Bar (`56px` fixed height), and a Fluid Administrative Canvas.
- **Main Viewport Constraint**: The core workspace uses a fluid grid with a maximum content canvas boundary of `1600px` for wide monitor efficiency.
- **Desktop Grid (1200px+)**: 12-column layout, `24px` (`1.5rem`) gutters, `24px` outer canvas margins.
- **Tablet / Split View (768px - 1199px)**: 8-column layout, `16px` (`1rem`) gutters, `16px` outer margins. The sidebar collapses into an icon rail or slide-out drawer.
- **Mobile / Field Review (Under 768px)**: 4-column layout, `12px` gutters, `16px` margins. Administrative tables switch to structured card-stack records.

### Spacing Scale Rules
- `space-xs` (4px): Micro-spacing between paired icons and text, inner badge padding.
- `space-sm` (8px): Form label-to-input gap, compact table cell vertical padding, button icon gaps.
- `space-md` (16px): Standard form element gap, card interior padding, table cell horizontal padding.
- `space-lg` (24px): Card-to-card gap, section sub-grouping, modal dialog padding.
- `space-xl` (32px): Major administrative view division, dashboard section headers.

## Elevation & Depth
This design system avoids theatrical 3D layering and fuzzy, saturated drop shadows. Depth is generated through **crisp low-contrast borders combined with quiet, ambient shadows** that maintain clean separation in dense multi-window administrative interfaces.

### Elevation Hierarchy
- **Level 0 (Flat Canvas)**: `#F8FAFC`. The foundational canvas; strictly zero elevation.
- **Level 1 (Structural Cards & Data Tables)**: Surface `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 1px 2px 0 rgba(15, 23, 42, 0.05)`. Used for KPI stat blocks, document records, and form sheets.
- **Level 2 (Hover States & Active Dropdowns)**: Surface `#FFFFFF`, border `1px solid #CBD5E1`, shadow `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Floating Overlays, Modals, Slide Panels)**: Surface `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05)`. Paired with an administrative backdrop scrim: `rgba(15, 23, 42, 0.45)` with `backdrop-filter: blur(2px)`.

### AI Surface Treatment
Surfaces containing generative or algorithmic administrative assistance (e.g., auto-classified subsidy audit summaries) receive a subtle ambient highlight: an interior hairline tint `inset 0 0 0 1px rgba(16, 185, 129, 0.2)` accompanied by a pale mint accent boundary (`#10B981`), signaling non-destructive system recommendations.

## Shapes
The shape philosophy communicates governance, stability, and utility.

### Geometry Specifications
- **Structural Cards, Panels, Modals**: Corner radius fixed at `12px` (`0.75rem`). This softens the administrative grid while preserving strict spatial alignment with 8px layout increments.
- **Interactive Controls (Inputs, Selectors, Buttons)**: Corner radius fixed at `6px` (`0.375rem`). Ensures inputs maintain architectural clarity and resist looking like toy consumer apps.
- **Status Chips, Count Pills, Badges**: Full pill radius (`9999px`) to immediately differentiate metadata tags and process labels from rectangular data entry boxes and buttons.
- **Icon Enclosures & Micro-Avatars**: `6px` or `8px` squircle containers. Circular elements are reserved strictly for human profile portraits and radio selection controls.

## Components

### Buttons
- **Primary Action**: Height `40px` (standard) or `44px` (modal confirm). Background `#2563EB`, text `#FFFFFF`, radius `6px`, font weight `600`. Hover: `#1D4ED8`. Active: `#1E40AF`. Focus: 2px offset outline in `#2563EB`.
- **Secondary Action**: Height `40px`. Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#0F172A`. Hover: `#F8FAFC` with border `#CBD5E1`.
- **AI Assist Action**: Height `40px`. Background `#ECFDF5`, border `1px solid #A7F3D0`, text `#065F46`, paired with a 16px mint sparkle glyph. Hover: `#D1FAE5`.
- **Destructive**: Height `40px`. Background `#EF4444`, text `#FFFFFF`. Hover: `#DC2626`.

### Form Fields & Inputs
- **Text Inputs & Dropdowns**: Height `40px` (compact grid) to `44px` (primary data-entry). Base surface `#FFFFFF`, border `1px solid #E2E8F0`, radius `6px`, padding `0 12px`.
- **Typography**: 14px text. Primary text `#0F172A`, placeholder `#94A3B8`.
- **States**: 
  - Focus: border `#2563EB`, box-shadow `0 0 0 3px rgba(37, 99, 235, 0.15)`.
  - Error: border `#EF4444`, box-shadow `0 0 0 3px rgba(239, 68, 68, 0.15)`.
  - Read-Only / Disabled: Background `#F1F5F9`, border `#E2E8F0`, text `#94A3B8`, cursor `not-allowed`.

### Administrative Data Tables
- **Header Cells (`<th>`)**: Height `40px`, background `#F8FAFC`, border-bottom `1px solid #E2E8F0`, text `#64748B`, font-size `12px`, font-weight `600`, text-transform upper/regular, padding `0 16px`.
- **Data Rows (`<tr>`)**: Height `48px` (dense: `40px`). Border-bottom `1px solid #F1F5F9`. Hover state: background `#F8FAFC`.
- **Selected Row**: Background `#EFF6FF` with `#2563EB` 2px left border accent.
- **Numbers & Dates**: Monospace/tabular numerical alignment, right-aligned for currency and child capacities.

### Badges & Status Chips
- **Geometry**: Pill radius (`9999px`), padding `2px 8px`, font size `12px`, weight `600`.
- **Status Variants**:
  - *Approved / Completed*: Background `#DCFCE7`, text `#15803D`.
  - *Review Pending*: Background `#FEF3C7`, text `#B45309`.
  - *Correction Needed*: Background `#FEE2E2`, text `#B91C1C`.
  - *Standard Metadata*: Background `#F1F5F9`, text `#475569`.
- **AI Recommendation Badge**: Background `#ECFDF5`, border `1px solid #6EE7B7`, text `#047857`, prefixed with an AI indicator dot.

### KPI Stat Cards
- Container: Surface `#FFFFFF`, border `1px solid #E2E8F0`, radius `12px`, padding `20px`.
- Structure:
  - Label: 13px, weight `500`, `#64748B`.
  - Metric Value: 28px, weight `700`, `#0F172A`, tabular figures.
  - Sub-Context: Trend chip (e.g., `+4.2% YoY`) alongside baseline explanatory text in 12px `#94A3B8`.

### Checkboxes & Radios
- Size: `16px x 16px`, radius `4px` (checkbox) or circular (radio).
- Default: Border `1px solid #CBD5E1`, background `#FFFFFF`.
- Checked: Background `#2563EB`, border `#2563EB`, icon white checkmark.
- Focus: `0 0 0 3px rgba(37, 99, 235, 0.2)`.