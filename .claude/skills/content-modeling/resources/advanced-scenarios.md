# Advanced Content Modeling Scenarios

This document covers common challenges in content modeling and their solutions. These scenarios go beyond the basic canonical models and address real-world complexity.

---

## Challenge 1: Nested Blocks

**The Problem:**
Sometimes a block needs to contain other blocks. Examples:
- Tabs where each tab contains a cards or columns block
- Accordions with complex content including multiple blocks

**Solutions:**

### Solution A: Auto-Blocking with Sections
Authors create separate sections with section metadata. The auto-blocking code merges them into one block with nested content.

**Example: Tabs with nested blocks**

```markdown
| Section Metadata |
|------------------|
| style | tabs |

## Getting Started

Welcome to our platform! Here's how to begin.

| Hero |
|------|
| ![Welcome](welcome.jpg) | # Start Here<p>Your journey begins now.</p> |

---

| Section Metadata |
|------------------|
| style | tabs |

## Features

| Cards |
|-------|
| ![Feature 1](f1.jpg) | ## Real-time Collaboration<p>Work together seamlessly.</p> |
| ![Feature 2](f2.jpg) | ## Advanced Analytics<p>Insights at your fingertips.</p> |
```

Multiple consecutive sections with `style | tabs` metadata get merged into one tabs block, with each section becoming one tab. Any blocks within the sections are preserved as nested blocks.

### Solution B: Fragments
Authors create the outer block and link to a fragment containing the inner blocks.

**Example: Accordion with fragment**

```markdown
| Accordion |
|-----------|
| ## How do I get started? | [Getting started guide](../fragments/getting-started) |
| ## What features are available? | [Feature overview](../fragments/features) |
```

The fragment documents contain the detailed content with multiple blocks, which get embedded into the accordion items.

**When to use which:**
- **Auto-blocking**: When authors naturally think in sections and the pattern is common/predictable
- **Fragments**: When the nested content is complex, reused across pages, or managed separately

---

## Challenge 2: Item-Level Configurations in Collections

**The Problem:**
In a collection block, each item might need its own configuration - not content, but behavioral or styling settings. This is different from the item's actual content (text, images, links). Examples:
- Each card in a grid could potentially be "featured" with different sizing
- Each accordion item needs to specify whether it starts expanded or collapsed
- Each carousel slide might have different transition effects or display durations

The challenge is that this configuration isn't really content that authors should have to think about for every item, but you need a way to specify it when needed.

**Solutions:**

### Solution A: Variant Lists
Use variants at the block level to specify which items get special configuration.

**Example: Cards with featured items**

```markdown
| Cards (Featured-2, Featured-4) |
|--------------------------------|
| ![Product 1](p1.jpg) | ## Standard Product<p>Regular card styling.</p> |
| ![Product 2](p2.jpg) | ## Featured Product<p>This one stands out with larger size.</p> |
| ![Product 3](p3.jpg) | ## Another Product<p>Back to regular styling.</p> |
| ![Product 4](p4.jpg) | ## Also Featured<p>This one is also larger and featured.</p> |
| ![Product 5](p5.jpg) | ## Standard Product<p>Regular card styling.</p> |
```

The decoration code parses the variant list `Featured-2, Featured-4` and applies the "featured" styling to items 2 and 4 (using 1-based indexing).

**Example: Accordion with default-open items**

```markdown
| Accordion |
|-----------|
| ## First Question (Open) | The answer to the first question appears here. |
| ## Second Question | This one starts collapsed. |
| ## Third Question | Also starts collapsed. |
```

### Solution B: Optional Configuration Cell
Add an additional (optional) column for configuration when variants aren't sufficient.

**Example: Collection with per-item config**

```markdown
| Gallery |
|---------|
| ![Image 1](img1.jpg) | Beautiful sunset over mountains | |
| ![Image 2](img2.jpg) | City skyline at night | zoom-enabled |
| ![Image 3](img3.jpg) | Forest path in autumn | |
```

The third column is optional. When present, it configures that specific item (in this case, enabling zoom for image 2).

**When to use which:**
- **Variants**: When the configuration is simple styling/behavior that maps to CSS classes (Featured, Large, Open, etc.)
- **Optional config cell**: When the configuration is more complex or doesn't fit the variant pattern well
- **Neither**: If every (or nearly every) item needs unique configuration, those settings might actually be content that varies per item, not behavioral config - consider whether Collection is the right model

**Trade-offs:**
- Variants are more author-friendly and semantic
- Config cells are more flexible but less intuitive, and non-semantic
- Both add complexity - use sparingly, only when truly needed

---

## Challenge 3: Lists

**The Problem:**
Blocks often contain things that feel "list-like" to developers - repeating items that would naturally be rendered as `<ul>` or `<ol>` elements. However, authors often struggle to create list elements in their authoring tools (Google Docs, SharePoint, etc.), especially when list items are complex (like a list of related articles with images and links).

**The key principle:** Never require authors to create lists when they can be avoided. What looks like a list to a developer can often be better modeled as a Collection or other structure that's easier to author.

**Reference:** See [Rule 5 from David's Model](https://www.aem.live/docs/davidsmodel)

**Solutions:**

The solution is almost always to use a Collection model, but the specific approach depends on the complexity of each item.

### Solution A: Collection Block for Complex Items
When each "list item" has multiple parts (image, heading, description, link), use a Collection block.

**Example: Related articles**

```markdown
| Related Articles |
|------------------|
| ![Article 1](article1.jpg) | ## Understanding Edge Delivery<p>Learn the basics of AEM Edge Delivery Services.</p><p>[Read more](article1)</p> |
| ![Article 2](article2.jpg) | ## Content Modeling Best Practices<p>Design content models that authors love.</p><p>[Read more](article2)</p> |
| ![Article 3](article3.jpg) | ## Performance Optimization<p>Make your site lightning fast.</p><p>[Read more](article3)</p> |
```

Each row is one article. Columns separate the parts (image, content). Decoration code renders this as cards or a list, depending on styling needs.

### Solution B: Flexible Input for Simple Items
When each "list item" is simple (text only, or text with minimal formatting), support multiple authoring approaches.

**Example: Recipe ingredients - support both approaches**

**Option 1: One item per line in one cell**
```markdown
| Recipe |
|--------|
| ![Finished dish](dish.jpg) |
| ## Chocolate Chip Cookies |
| <p>2 cups flour</p><p>1 cup butter</p><p>1 cup sugar</p><p>2 eggs</p><p>2 cups chocolate chips</p> |
```

**Option 2: One item per row**
```markdown
| Recipe |
|--------|
| ![Finished dish](dish.jpg) |
| ## Chocolate Chip Cookies |
| 2 cups flour |
| 1 cup butter |
| 1 cup sugar |
| 2 eggs |
| 2 cups chocolate chips |
```

Both are valid. The decoration code handles both patterns - it checks if there's a `<ul>` or `<ol>` in one cell, or if there are multiple rows of simple text. This flexibility makes it easy for authors to copy/paste ingredients or type them however feels natural.

**When to use which:**
- **Collection for complex items (Solution A)**: When each item has multiple distinct parts (image + heading + description, or any combination that benefits from column structure)
- **Flexible input for simple items (Solution B)**: When items are just text or links, and you want to make authoring as easy as possible by supporting multiple input methods

**Key takeaway:** Don't make authors create formal list elements in their authoring tool. Use Collection models or flexible text input instead. Your decoration code can always render the final output as a `<ul>` or `<ol>` if that's the right semantic HTML.

---

## Challenge 4: Forms

**The Problem:**
Forms seem like Standalone blocks (distinct visual element, typically appears once) but have many input fields, which pushes them toward Configuration or Collection models. How do you balance author ease with the structural complexity of forms?

**Solutions:**

Forms are relatively uncommon in content-driven sites. When they do appear, consider these approaches in order of preference:

### Solution A: External Form Services
For complex forms or forms requiring advanced features (multi-step, conditional logic, integrations), use external services like Marketo, HubSpot, Google Forms, etc. Embed them via iframe or integration blocks.

### Solution B: Spreadsheet-Based Forms
Use a spreadsheet to define form fields, and create a Standalone form block that links to it.

**Example: The form block**

```markdown
| Form |
|------|
| [Contact Form Fields](/forms/contact-form.json) |
```

**Example: The spreadsheet (contact-form.xlsx)**

| Field Name | Type | Required | Label | Placeholder |
|------------|------|----------|-------|-------------|
| name | text | true | Full Name | Enter your name |
| email | email | true | Email Address | you@example.com |
| message | textarea | false | Message | How can we help? |

In AEM, spreadsheets get published as JSON. The form block's decoration code fetches the JSON and builds the form dynamically. See the Block Collection for examples of this pattern.

**Why this works:**
- Separates form definition (spreadsheet) from form placement (block)
- Authors can manage form fields in a familiar spreadsheet interface
- Form definition is reusable across multiple pages
- Easy to update fields without touching content pages

### Solution C: Configuration Model (Anti-Pattern, but Sometimes Necessary)
Use a Configuration block for one-off forms where a spreadsheet feels like overkill.

**Example:**

```markdown
| Form |
|------|
| action | /submit-contact |
| fields | name,email,message |
| submit-label | Send Message |
```

**Warning:** This is non-semantic and requires authors to understand the configuration format. Only use for very simple, one-off forms that won't be reused or frequently modified.

**When to use which:**
- **External services (Solution A)**: For complex forms or when integrating with marketing/CRM systems
- **Spreadsheet (Solution B)**: For most custom forms, especially if reused or frequently updated
- **Configuration (Solution C)**: Only for very simple one-off forms

---

## Key Principles for Advanced Scenarios

When facing complex content modeling challenges:

1. **Start simple**: Can this be handled with a basic canonical model? Don't add complexity prematurely.

2. **Prioritize author experience**: The best technical solution isn't always the one that's easiest to author. Can authors understand this intuitively?

3. **Be consistent**: If you solve a problem one way for one block, use the same pattern for similar blocks.

4. **Document edge cases**: When supporting optional cells, variants, or multiple models, document what authors can expect.

5. **Test with real authors**: Complex models often reveal usability issues only when real people try to use them.

6. **Consider alternatives**: Sometimes the answer isn't a better content model, but a different feature (fragments, section metadata, auto-blocking, external tools).

The goal is always the same: make it easy for authors to create great content while giving developers the structure they need to build great experiences.
