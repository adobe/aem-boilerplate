---
name: content-modeling
description: Create effective content models for your blocks that are easy for authors to work with. Use this skill anytime you are building new blocks, making changes to existing blocks that modify the initial structure authors work with.
---

# Content Modeling for AEM Edge Delivery Blocks

This skill guides you through designing content models for AEM Edge Delivery Services blocks. A content model defines the table structure that authors work with when creating content

## Related Skills

- **content-driven-development**: This skill is typically invoked FROM the CDD skill during Step 3 (Design Content Model)
- **building-blocks**: After content modeling is complete, this skill handles implementation
- **block-collection-and-party**: Use to find similar blocks and their content models for reference

## When to Use This Skill

✅ **Use this skill when:**
- Creating new blocks (usually invoked by CDD at Step 3)
- Modifying existing blocks in ways that change author-facing structure
- Reviewing content models for best practices conformance
- User explicitly asks about content modeling

❌ **Skip this skill when:**
- Block already has a well-defined content model
- You're only changing decoration code or styles (not structure)
- Making minor tweaks that don't affect what authors create

## Content Modeling Checklist

Track your progress through content model design:

- [ ] Step 1: Understand content requirements. See "Step 1: Understand Content Requirements" below
- [ ] Step 2: Design block structure. See "Step 2: Design Block Structure" below
- [ ] Step 3: Validate against best practices. See "Step 3: Validate Against Best Practices" below
- [ ] Step 4: Document and return content model. See "Step 4: Document and Return" below

## Core Principles

A good content model is:
- **Semantic**: Structure carries meaning on its own without decoration
- **Predictable**: Authors, developers, and agents all know what to expect
- **Reusable**: Works across authoring surfaces and projects

## Step 1: Understand Content Requirements

Before designing a content model, understand what the block needs to accomplish and what content it requires.

**Ask these questions:**
- **What is the block's purpose?** What problem does it solve for users?
- **What content elements are needed?** (images, text, headings, links, etc.)
- **What is the visual layout?** How should content be arranged on the page?
- **Is this content unique or repeating?** One hero, or multiple cards?
- **Where does the content come from?** Authored by users, or fetched from an API?
- **How complex is the authoring experience?** Can authors create this easily, or does it need simplification?

**Use canonical models as reference patterns:**

AEM Edge Delivery has 4 canonical block models that serve as proven patterns:

| Model | Best For | Examples |
|-------|----------|----------|
| **Standalone** | Unique visual elements, one-off structures | Hero, Blockquote |
| **Collection** | Repeating semi-structured items | Cards, Carousel |
| **Configuration** | API-driven content ONLY (not static content) | Blog Listing, Search Results |
| **Auto-Blocked** | Simplify complex authoring, pattern detection | Tabs, YouTube Embed |

Use these patterns to inform your design in Step 2, but focus first on understanding the content requirements.

**Detailed resources:**
- Read `resources/canonical-models.md` for detailed examples and guidance on the 4 canonical models
- If your content model is particularly complex or combines multiple models, see `resources/advanced-scenarios.md`

## Step 2: Design Block Structure

Design the structure your block will follow in a document, using these key guidelines:

**Essential rules:**
- Maximum 4 cells per row
- Use semantic formatting (headings, bold, italic) to define meaning
- Prefer block variants over config cells (use `| Hero (Dark) |` not `| style | dark |`)
- Infer from context and use smart defaults to minimize author input
- Be flexible with input structure - your decoration code can handle variations

**Common patterns to reference:**

These patterns align with the canonical models and can inform your design:

- **Standalone blocks:** Use rows/columns as needed for unique structures. Be flexible about how authors organize content. Example: Hero where image and text can be in separate rows, columns, or combined.

- **Collection blocks:** Each row = one item, columns = parts of each item. Keep columns consistent. Example: Cards with columns for [image] [heading, description, CTA].

- **Configuration blocks:** Two-column key/value pairs for settings. Keep minimal - only true behavioral settings. Example: Blog Listing with `limit | 10`, `sort | date-desc`.

- **Auto-Blocked content:** Design for simplest possible authoring. Often uses sections and section metadata. Example: Tabs auto-blocked from sections with H2 headings.

**Detailed resources:**
- Read `resources/canonical-models.md` for examples of good vs. bad block structures
- If dealing with complex scenarios (nested blocks, lists, forms), see `resources/advanced-scenarios.md`

## Step 3: Validate Against Best Practices

Use this checklist to validate your content model:

- [ ] Maximum 4 cells per row
- [ ] Semantic formatting defines meaning (not just visual styling)
- [ ] Structure is predictable (clear what goes where)
- [ ] Structure is reusable (works across different authoring tools)
- [ ] Smart defaults minimize required author input
- [ ] Avoids configuration cells unless truly needed for dynamic content
- [ ] Considers edge cases (empty cells, optional content, etc.)

**Common anti-patterns to avoid:**
- ❌ Too many columns (>4 per row)
- ❌ Using configuration structure when simpler patterns would work
- ❌ Header rows with cell names in collection blocks (making them spreadsheet-like)
- ❌ Non-semantic cell content (splitting related content unnecessarily)
- ❌ Requiring authors to input data that could be inferred
- ❌ Complex nested structures that confuse authors
- ❌ Structures that only work in one specific authoring tool

## Step 4: Document and Return

Provide the content model back to the calling skill (or user) in this format:

```markdown
## Content Model: [Block Name]

### Block Structure

| Block Name |
|------------|
| [Cell description] | [Cell description] |
| [Cell description] | [Cell description] |

### How It Works
[Explain what authors create and how the block structure works. Describe the
purpose of each row/column and any semantic formatting used.]

### Key Points
- [Important authoring guidelines]
- [Examples of semantic formatting (e.g., "h2 indicates the heading")]
- [Any flexibility in structure (e.g., "content can be in one cell or split across two")]
- [Common variants if applicable]
```

**Important:** This skill focuses on designing the content model. After documenting the model, return this to the calling skill (content-driven-development or building-blocks), which will handle what to do next, such as creating test content or implementing the block.

## Resources

### `resources/canonical-models.md`
Detailed guide to the 4 canonical block models (Standalone, Collection, Configuration, Auto-Blocked) with comprehensive examples showing both good and bad implementations. Includes "why this works" and "why this fails" explanations for each pattern, multiple variations, and anti-patterns to avoid.

### `resources/advanced-scenarios.md`
Solutions for complex content modeling challenges including nested blocks, item-level configurations in collections, handling lists (with important guidance on not requiring authors to create lists), and form patterns.

## Key Principles Revisited

When in doubt, remember:

1. **Understand content requirements first** - What does the block need to accomplish? What content elements are required? This understanding drives everything else.
2. **Use canonical models as reference patterns** - The 4 canonical models (Standalone, Collection, Configuration, Auto-Blocked) are proven patterns to inform your design, not rigid templates to follow.
3. **Keep it simple** - Authors should understand the structure intuitively. If it feels complex to explain, it's probably too complex to author.
4. **Use semantic formatting** - Let the structure carry meaning through headings, bold, italic, etc. - not through cell positions or complex configurations.
5. **Be flexible** - Your decoration code can handle variations in author input. Don't force authors into rigid structures for developer convenience.
6. **Validate against best practices** - Check your design against guidelines (4 cells per row, avoid spreadsheet-like structures, etc.) to inform a better design and surface potential concerns.

Content models are the foundation of author experience. Invest time in understanding requirements and designing thoughtful structures.
