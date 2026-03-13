# Visual Analysis Guide

This guide provides comprehensive techniques for analyzing screenshots, design files, and existing URLs to extract requirements for AEM Edge Delivery Services development.

## When to Use This Guide

Use this guide when you have:
- Screenshots of designs or mockups
- Design files (Figma, Sketch, Adobe XD, etc.)
- Existing URLs to match design from
- Reference examples to replicate

## Visual Analysis Workflow

### 1. Capture/View the Visuals

**Gather all visual materials:**
- Screenshots of designs at different viewports
- Design files (access or screenshots)
- URLs of existing implementations
- Reference examples

**Take screenshots if needed:**
- Full page screenshots
- Component-level screenshots
- Different viewport sizes (mobile, tablet, desktop)
- Interactive states if visible (hover, focus, open menus, etc.)

---

### 2. Analyze Visual Elements

Systematically document structural and stylistic properties:

**Layout Structure:**
- Grid system (columns, gutters)
- Flexbox patterns (row/column, alignment, spacing)
- Absolute positioning (overlays, fixed elements)
- Container widths and breakpoints
- Section boundaries and groupings

**Typography:**
- Font families
- Font sizes (headings, body, small text)
- Font weights (light, regular, medium, bold)
- Line heights and letter spacing
- Text colors
- Heading hierarchy (h1, h2, h3, etc.)

**Color Scheme:**
- Primary colors
- Secondary/accent colors
- Background colors
- Text colors (body, headings, links, muted)
- Border colors
- Color usage patterns

**Spacing and Padding:**
- Margins between sections
- Padding within containers
- Spacing between elements
- Consistent spacing patterns (8px, 16px, 24px, etc.)
- Negative space usage

**Visual Effects:**
- Borders (width, color, radius)
- Box shadows (offset, blur, spread, color)
- Text shadows
- Gradients
- Opacity/transparency
- Filters (blur, brightness, etc.)

**Icons and Imagery:**
- Icon style (outline, filled, custom)
- Icon sizes
- Image aspect ratios
- Image treatments (filters, overlays, borders)
- Placeholder patterns
- SVG vs raster usage

---

### 3. Analyze Interactive Elements

Identify all user-triggerable components and their behaviors:

**Interactive Components:**
- Buttons (primary, secondary, tertiary, etc.)
- Links (inline, navigation, footer, etc.)
- Form inputs (text, select, checkbox, radio, etc.)
- Toggles and switches
- Sliders and range inputs
- Navigation menus
- Search inputs

**Interactive States:**
- Default state
- Hover state (color, background, border changes)
- Focus state (outline, border, shadow)
- Active state (pressed, clicked)
- Disabled state (opacity, cursor)
- Loading state (spinners, skeleton screens)
- Error/validation states

**Animations and Transitions:**
- Fade in/out effects
- Slide animations
- Scale/zoom effects
- Rotation or transforms
- Duration and easing
- Trigger conditions (scroll, hover, click)

**Dynamic UI Patterns:**
- Modal dialogs (size, positioning, backdrop)
- Tooltips (positioning, arrow, trigger)
- Dropdown menus (positioning, animation)
- Accordions (expand/collapse)
- Tabs (active state, transition)
- Carousels (navigation, auto-play, indicators)
- Sticky headers (scroll behavior, shadow on scroll)

---

### 4. Analyze Content Structure

Examine how information is organized and presented:

**Content Types:**
- Text content (headings, paragraphs, lists)
- Images (photos, illustrations, icons)
- Video (embedded, background, player controls)
- Data tables
- Code blocks
- Quotes/testimonials
- CTAs (calls-to-action)

**Hierarchical Organization:**
- Page structure (header, main sections, footer)
- Section nesting (parent/child relationships)
- Content groupings (cards, lists, grids)
- Information flow (top to bottom, left to right)
- Visual hierarchy (what's emphasized, what's secondary)

**Repeating Patterns:**
- Consistent component usage
- Repeated layouts (card grids, feature lists)
- Template structures
- Content blocks that appear multiple times
- Variations of the same pattern

**Content Density:**
- Amount of content per section
- White space vs filled space ratio
- Vertical rhythm
- Content-to-chrome ratio

---

### 5. Analyze Responsive Behavior

When multiple viewport designs exist, document cross-viewport observations:

**Mobile Behavior:**
- Layout changes (stack vs side-by-side)
- Hidden/shown elements
- Navigation patterns (hamburger menu, bottom nav)
- Touch-friendly sizing (44px minimum)
- Mobile-specific features

**Tablet Behavior:**
- Intermediate layout adjustments
- Column reflow
- Font size changes
- Spacing adjustments

**Desktop Behavior:**
- Maximum widths
- Multi-column layouts
- Larger imagery
- Additional navigation options
- Hover states and interactions

**Cross-Viewport Patterns:**
- Breakpoint logic (when does layout shift?)
- Progressive enhancement patterns
- What changes, what stays the same?
- Mobile-first vs desktop-first approach

---

### 6. Systematic Mapping

Map the design to AEM implementation patterns:

**Page vs Component:**
- Is this a complete page design?
- Is this a reusable component/block?
- Does this span multiple sections?
- Is this part of a larger system?

**Existing Patterns:**
- Search codebase for similar blocks
- Check if similar layouts already exist
- Identify opportunities for reuse
- Note differences from existing patterns

**Block Model Classification:**
- **Standalone Block:** Self-contained component
- **Collection Block:** Repeating items (cards, lists)
- **Configuration Block:** Controlled by classes/attributes
- **Auto-Blocked:** Generated from content patterns

**Content Model Implications:**
- What structure will authors use?
- Table-based authoring model
- Number of cells/columns needed
- Variant classes needed
- Metadata requirements

---

## Documentation Template

Use this template to document your visual analysis:

```markdown
# Visual Analysis: [Component/Page Name]

## Overview
- Type: [Page/Block/Component]
- Purpose: [What this does]
- Viewports analyzed: [Mobile/Tablet/Desktop]

## Visual Elements

### Layout
- Structure: [Grid/Flex/etc.]
- Container width: [px or %]
- Breakpoints: [values]

### Typography
- Heading fonts: [family, sizes, weights]
- Body font: [family, size, weight]
- Hierarchy: [h1, h2, h3 usage]

### Colors
- Primary: [hex/rgb]
- Secondary: [hex/rgb]
- Background: [hex/rgb]
- Text: [hex/rgb]

### Spacing
- Section margins: [values]
- Element padding: [values]
- Spacing system: [pattern]

### Visual Effects
- Borders: [style]
- Shadows: [values]
- Other effects: [description]

### Icons/Images
- Icon style: [description]
- Image aspect ratios: [values]
- Treatment: [filters, overlays]

## Interactive Elements

### Components
- [List all interactive components]

### States
- Hover: [description]
- Focus: [description]
- Active: [description]

### Animations
- [List animations and triggers]

### Dynamic Patterns
- [List modals, tooltips, dropdowns, etc.]

## Content Structure

### Content Types
- [List content types present]

### Hierarchy
- [Describe organization]

### Repeating Patterns
- [Identify patterns]

## Responsive Behavior

### Mobile
- [Layout changes]
- [Hidden/shown elements]

### Tablet
- [Intermediate adjustments]

### Desktop
- [Full layout]

## Implementation Mapping

### Classification
- Block type: [Standalone/Collection/Configuration/Auto-blocked]
- Similar to: [Existing blocks if any]

### Content Model
- Authoring structure: [Table/List/etc.]
- Variant classes: [List classes]
- Metadata: [Requirements]

## Key Requirements Extracted

1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

## Questions/Assumptions

- [Question 1]
- [Assumption 1]
```

---

## Tips for Effective Visual Analysis

**Be Systematic:**
- Don't skip sections - analyze everything
- Use the documentation template
- Take notes as you go

**Look for Patterns:**
- Identify reusable components
- Note consistent spacing/sizing
- Find design system patterns

**Think About Authors:**
- How will this be created in CMS?
- Is the content model author-friendly?
- What variants are needed?

**Consider Edge Cases:**
- Very long content
- Missing images
- Different content lengths
- Mobile vs desktop content

**Use Tools:**
- Browser dev tools (inspect, measure)
- Screenshot comparison
- Design file measurements
- Color pickers

**Ask Questions:**
- Clarify unclear designs
- Confirm assumptions
- Understand intent, not just visuals
- Get missing viewport designs

---

## Output

Your visual analysis should produce:

✅ **Documented visual requirements** covering all elements above
✅ **Implementation mapping** to AEM patterns
✅ **Content model implications** for authoring
✅ **Key requirements** extracted for next steps
✅ **Questions and assumptions** documented

This documentation will inform requirements analysis, content modeling, and implementation steps.
