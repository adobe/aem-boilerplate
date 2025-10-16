---
name: AEM Content Modeling
description: Design author-friendly content structures that work for non-technical content creators. Use when designing content structures for blocks in AEM Edge Delivery Services.
---

# AEM Content Modeling

## Overview

**Your job is to design content structures that are author-friendly, not developer-friendly.**

Authors create content using various authoring surfaces: Word/Google Docs, Document Authoring (DA), Universal Editor (UE), or custom BYOM (Bring Your Own Markup) sources. Regardless of the authoring surface, they're not developers. Structure should be intuitive for non-technical users.

**Key principle:** If authors struggle with the structure, you designed it wrong.

## The Goal

**Design structures that authors can use successfully without training.**

If authors need documentation to understand your structure, it's too complex.

## Block Table Structure in AEM EDS

### Header Row Convention

In AEM Edge Delivery Services, block tables have a specific header structure:

**The first row is always a merged cell with the block name (and optional variants):**

```
| Carousel (Auto-Play) |
|----------------------|
| image1.jpg           |
| image2.jpg           |
| image3.jpg           |
```

**NOT like a traditional spreadsheet:**
```
❌ WRONG:
| Image | Caption | Link |
|-------|---------|------|
| img1  | Text    | URL  |
```

The block name in the header is how AEM knows which JavaScript/CSS to load. Variants in parentheses provide configuration options.

**IMPORTANT - Never add a second header row:**

❌ **WRONG - Do NOT do this:**
```
| Team Members |
|--------------|
| Image | Name | Title |    ← NEVER add this second header row!
| john.jpg | John Doe | CEO |
```

✅ **CORRECT:**
```
| Team Members |
|--------------|
| john.jpg | John Doe | CEO |    ← Data starts immediately after block name
| jane.jpg | Jane Doe | CTO |
```

Block code determines column meaning by position. Authors should never add header rows with column labels - that's an anti-pattern that breaks how AEM parses blocks.

### Using Rows vs Columns for Structure

**It's an art, not a science.** You have two dimensions to work with:

**Columns** - Good for:
- Attributes of the same item (name, title, bio for one person)
- Parallel data that appears together

**Rows** - Good for:
- Multiple items of the same type (multiple team members)
- Logical sections or groups within the block
- Sequential content

**Example: Rows for logical separation**
```
| Hero |
|------|
| Large headline text |
| Supporting description |
| call-to-action-button.jpg |
```

Each row represents a different piece of the hero block, not different instances.

**Example: Columns for attributes**
```
| Team Members |
|--------------|
| john.jpg | John Doe | CEO |
| jane.jpg | Jane Doe | CTO |
```

The block code parses the table structure - first column is image, second is name, third is title. Authors just fill in the data.

**Think about:** "Does it make more sense to separate this content with a new row or a new column?" There's often more than one valid answer.

---

## Advanced Techniques: Nesting and Simplification

When structures get complex, there are techniques to simplify authoring while maintaining functionality:

### 1. Fragments (Nested Structures)

**When to use:** Complex blocks that contain other blocks, or reusable components.

**How it works:** Nested structures are authored separately as fragments and referenced in the parent block.

**Example:**
```
| Tabs |
|------|
| Overview | /fragments/overview |
| Features | /fragments/features |
| Pricing | /fragments/pricing |
```

Each fragment contains its own blocks and structure. Authors create them separately, making complex content manageable.

**Benefits:**
- Breaks complexity into smaller, manageable pieces
- Reusable across multiple pages
- Authors work on one focused piece at a time
- Easier to maintain and update

**When NOT to use:**
- Content is simple and doesn't need separation
- Content is not reused elsewhere
- Adds unnecessary indirection

### 2. Auto-Blocking

**When to use:** Patterns that can be inferred from semantic markup instead of explicit block tables.

**How it works:** Content is authored using natural document structure (headers, lists, etc.) and block code automatically wraps it based on patterns or section metadata.

**Important note about sections:** In AEM EDS, sections are top-level structural divs inside `<main>`. Each `---` in markdown creates a new section boundary. Sections can have metadata to control styling and behavior.

**Example with section metadata:**
```
---
style: feature-card
---

## Fast Performance
Lightning-fast load times for better user experience.

## Easy to Use
Intuitive interface that anyone can master.

## Secure
Enterprise-grade security built in.
```

Block code detects the section metadata and converts each ## heading + paragraph into a feature card within that section.

**Example with pattern detection:**
```
> "Customer testimonials are invaluable"
> — Jane Doe, CEO

> "This product changed everything"
> — John Smith, CTO
```

Block code recognizes the blockquote pattern and converts to testimonial cards automatically.

**Benefits:**
- Authors use natural document formatting
- No tables needed for simple repeating patterns
- More portable and semantic
- Easier for non-technical authors

**When NOT to use:**
- Structure is too complex for pattern inference
- Authors need explicit control over block configuration
- Pattern detection could be ambiguous

### 3. Choosing Between Techniques

**Use explicit block tables when:**
- Structure is complex with multiple attributes
- Authors need clear column headers for guidance
- Data is naturally tabular

**Use fragments when:**
- Nesting blocks inside blocks
- Content is reusable
- Structure is too complex for one table

**Use auto-blocking when:**
- Pattern is simple and repeating
- Authors should work with natural document flow
- Structure can be reliably inferred from markup

**Combine techniques:**
```
| Accordion |
|-----------|
| Section 1 | /fragments/section-1 |
| Section 2 | /fragments/section-2 |
```

Each fragment might use auto-blocking internally for its content.

---

## Content Blocks vs Config Blocks

There are two fundamental types of blocks:

### Content Blocks (Preferred)
Content is directly authored by users. The block code decorates and enhances what's already there.

**Example:**
```
| Team Members |
|--------------|
| john.jpg | John Doe | CEO |
| jane.jpg | Jane Smith | CTO |
```

Block code reads the table structure (3 columns = image, name, title) and decorates it with styling, responsive behavior, etc.

### Config Blocks (Use Sparingly)
Authored as key-value pairs. Used to load/display dynamic experiences, often via APIs.

**Example:**
```
| Product Feed |
|--------------|
| API Endpoint | https://... |
| Max Items | 10 |
```

Block code uses these configs to fetch and render dynamic content.

### When to Use Each

**Use Content Blocks for:** Team members, features, testimonials, image galleries, article content, etc.

**Use Config Blocks ONLY for:** Actual configuration (API endpoints, feature flags, integration settings)

**Rule 14 from David's Model:** "Config blocks should only be used for config." Most blocks should be content blocks where authors create the actual content, not configuration that drives code.

## Why Semantic Content Structures Matter

Creating intuitive, semantic content structures is more art than science, but it's critically important. Good structures benefit everyone:

### 1. Easier Authoring
Non-technical users can create and maintain content without training or developer help.

### 2. AI and Agent Compatibility
Semantic content is easier for AI agents to read, understand, and work with. As AI becomes more prevalent, well-structured content becomes increasingly valuable.

### 3. Content Portability
Semantic structures work across multiple authoring surfaces (Word, Google Docs, DA, UE, BYOM). The same codebase can support different authoring platforms.

### 4. Cleaner, Easier Code
Logical content structures produce predictable DOM structures, reducing decoration logic complexity and making debugging easier.

### 5. API and Syndication Ready
Well-structured content serves as a clear contract between systems, making it easy to consume by mobile apps, external platforms, and APIs.

**Reference:** [Content Document Semantics](https://www.aem.live/blog/content-document-semantics)

---

## References and Resources

**David's Model** (https://www.aem.live/docs/davidsmodel)
- Semantic markup principles
- Proven patterns for common structures
- Author-first design guidance
- Rules like "max ~3 cells per row" and "config blocks only for config"

**AEM Block Collection**
- Real-world examples of content structures
- See how existing blocks model similar content
- Learn what works and what to avoid

**Your project's existing blocks**
- Established patterns in your codebase
- Consistency with current structures

**Content Document Semantics Blog**
- Why semantic structures matter
- Benefits for AI, portability, maintainability
- Practical guidelines

These references provide proven patterns and examples - use them to inform your design decisions.

---

## Design Workflow

### Step 1: Understand Who Authors Are (2 min)

**Ask yourself:**
- Are they technical or non-technical?
- What tools are they comfortable with? (Excel? Word?)
- Do they create content often or occasionally?
- Will they need to maintain this over time?

**Why this matters:**
- Excel-comfortable authors → tables work well
- Word-comfortable authors → lists and sections work well
- Occasional users → simpler structures needed
- Frequent users → can handle more complexity

### Step 2: Design Content Structure (10-15 min)

**Consider multiple approaches:**

**Option A: Table**
- Good for: Structured data, multiple attributes per item
- Author experience: Familiar (like Excel/spreadsheet)
- Example: Team members with name, title, bio, links
- **Tip:** Use formatting within cells to group related content (bold labels, lists)
- **Rows vs Columns:** Consider whether to use rows for different items (team members) or rows for different sections of one item (hero: headline, description, CTA)

**Option B: List**
- Good for: Simple collections, minimal attributes
- Author experience: Very simple, just bullet points
- Example: Feature list, testimonial quotes
- **Tip:** Use bold for feature names, regular text for descriptions

**Option C: Sections**
- Good for: Rich content, varied structure, grouping related blocks
- Author experience: Natural document flow
- Example: Long-form bios, articles, categorized content
- **Important:** Sections are top-level `<div>` elements inside `<main>`. Each page can have many sections. Blocks and content live inside sections. Use `---` in markdown to create section boundaries.
- **Tip:** Use headers to label sections, section metadata for styling/behavior

**Option D: Combination**
- Good for: Complex requirements
- Author experience: Flexible but needs guidance
- Example: Sections with embedded tables
- **Tip:** Keep each part simple, use formatting to differentiate content types

**Option E: Fragments**
- Good for: Nested blocks, reusable components, breaking complexity
- Author experience: Work on smaller focused pieces
- Example: Tabs where each tab content is a separate fragment
- **Tip:** Use when one block needs to contain other blocks

**Option F: Auto-Blocking**
- Good for: Simple repeating patterns that can be inferred
- Author experience: Natural document flow, no explicit blocks
- Example: Testimonials as blockquotes, features as sections with headers
- **Tip:** Use when pattern is obvious and authors shouldn't think about "blocks"

### Step 3: Present Structure and Get Human Approval (REQUIRED)

**CRITICAL: You MUST get human approval before proceeding to implementation.**

After designing the content structure, present your proposal to the human:

```
"I've designed the content structure for [block name].

Here's my proposed approach:

**Structure:** [Table/List/Sections/etc.]
**Columns/Format:** [describe the structure]

**Example:**
[Show concrete example of how authors would create this]

**Reasoning:** [Why this structure is author-friendly]

Does this structure work for you? Any changes needed before I implement?
```

**Why this step is MANDATORY:**
- Prevents implementing the wrong structure
- Authors know their workflow better than you
- Reveals constraints you didn't know
- Ensures buy-in before you write code
- Saves 30-60 minutes of rework

**DO NOT SKIP THIS STEP.** Implement only after human approval.

### Step 4: Document the Content Model (5 min)

**Create documentation showing:**

**For Authors:**
```markdown
## Team Members Block - Author Guide

**How to create content:**

1. Create a table with these columns:
   - Image: Photo file name or URL
   - Name: Team member's full name
   - Title: Their job title
   - Bio: 2-3 sentences about them
   - LinkedIn: Full LinkedIn URL
   - Twitter: Full Twitter URL

2. Each row = one team member

**Example:**
| Image | Name | Title | Bio | LinkedIn | Twitter |
|-------|------|-------|-----|----------|---------|
| john.jpg | John Doe | CEO | John leads our... | https://linkedin.com/... | https://twitter.com/... |
```

**For Developers:**
```markdown
## Content Structure

- Format: Table
- Columns: 6 (Image, Name, Title, Bio, LinkedIn, Twitter)
- Parsing: Each row = one team member object
- Optional fields: Social links (gracefully handle empty)
```

### Step 5: Proceed with Implementation

**After completing steps 1-4:**
- Check for existing blocks (Block Reusability skill)
- Implement block to parse your documented structure
- Create test content matching the structure

---

## Common Rationalizations to Ignore

### ❌ "Structure Is Obvious from Requirements"

**Rationalization:** "The requirements clearly define the data, I know what structure to use"

**Reality:**
- Requirements define WHAT data, not HOW to author it
- Same data can be structured multiple ways
- Some are author-friendly, some aren't
- You don't know until you consider alternatives

**Counter:** Requirements ≠ content model. Design the authoring experience.

---

### ❌ "I'll Figure It Out While Coding"

**Rationalization:** "I can design the structure as I build the block"

**Reality:**
- Leads to developer-friendly structures (JSON-like tables)
- Forces authors to adapt to your implementation
- Requires rework when authors struggle
- Backwards (code drives content, should be content drives code)

**Counter:** Content structure drives implementation. Not the other way around.

---

### ❌ "Authors Will Understand This"

**Rationalization:** "This table structure makes sense, authors will get it"

**Reality:**
- Authors aren't developers
- What's "obvious" to you may not be to them
- You're guessing unless you ask
- Bad UX = resistance to using the platform

**Counter:** Don't assume. Ask the actual authors.

---

### ❌ "I Don't Need References"

**Rationalization:** "I can design this structure from scratch, no need to check references"

**Reality:**
- References like David's Model contain proven patterns
- Fixing bad content structure later: hours of rework
- Common patterns prevent mistakes
- Faster to learn from established approaches

**Counter:** Learning from references saves time and prevents known mistakes.

---

### ❌ "Tables Are Always the Answer"

**Rationalization:** "When in doubt, use a table"

**Reality:**
- Tables work for structured data
- But not for everything
- Lists are simpler for simple content
- Sections are better for rich content
- One size doesn't fit all

**Counter:** Choose the structure that fits the content and authors.

---

### ❌ "Config Blocks Are More Flexible"

**Rationalization:** "Key-value pairs give authors more flexibility and make the code easier"

**Reality:**
- Config blocks make code easier for YOU, not authors
- Authors have to think in abstract key-value pairs instead of actual content
- Most blocks should be content blocks (Rule 14 from David's Model)
- Config blocks only for actual configuration

**Counter:** Use content blocks unless you're actually configuring something (API endpoints, feature flags, etc.).

---

## Design Principles for Author-Friendly Structures

### 1. Author-First, Not Developer-First

**Bad (developer-friendly):**
```
| Team Members |
|--------------|
| 001 | employee | {"role":"ceo"} |
```

**Good (author-friendly):**
```
| Team Members |
|--------------|
| john.jpg | John Doe | CEO |
```

Authors provide actual content (images, names, titles), not technical IDs or JSON configs.

---

### 2. Semantic Markup

Use Word/Google Docs features naturally:
- Headers for hierarchy
- Lists for collections
- Tables for structured data
- Bold/italic for emphasis
- **Formatting within cells** to differentiate content types

**Example: Using formatting to group related content**
Instead of separate columns for each link type:
```
| Team Members |
|--------------|
| John | CEO | **LinkedIn:** https://...<br>**Twitter:** https://... |
```

Or using lists within a cell:
```
| Features |
|----------|
| Security | • Two-factor authentication<br>• Encrypted data<br>• Daily backups |
| Performance | • Fast load times<br>• Optimized delivery |
```

**Benefits:**
- Fewer columns = simpler for authors
- Authors use familiar formatting (bold, lists)
- No special syntax to learn
- Easier to add/remove items

Don't force authors to learn special syntax.

---

### 3. Simple Over Complex

**Prefer:**
- **Max ~3 cells per row** (from David's Model) - If you need more, it's probably too complex
- Lists over complex nested tables
- One table over multiple related tables
- Standard patterns over custom syntax

Simpler = more likely to be used correctly.

---

### 4. Avoid Complexity Traps

**Don't:**
- Use column/row spans - they're confusing for authors and break portability
- Make authors input data you can infer (e.g., don't ask for both full URL and link text if one implies the other)
- Create structures that require special formatting or magic strings
- Disable linting rules to accommodate complex structures - simplify the structure instead

**Do:**
- Leverage field collapse to simplify inputs
- Infer data when possible
- Respect linting constraints as design feedback

---

### 5. Be Flexible with Input

**Structure should handle:**
- Missing optional fields (gracefully degrade)
- Extra fields authors add (ignore or incorporate)
- Variations in content length
- Different data types in similar positions

Don't assume perfect compliance. Authors will vary the structure - design for it.

---

### 6. Use Placeholders for Site-Wide Strings

**The Problem:**
Blocks often need strings like button labels, error messages, search placeholders, or other UI text. Hardcoding these in JavaScript prevents:
- Internationalization (supporting multiple languages)
- Author control over messaging
- Consistency across the site

**The Solution: Placeholders**

AEM EDS provides a [placeholders pattern](https://www.aem.live/developer/placeholders) for centrally managing site-wide strings.

**Important:** Do not introduce "config" rows or columns in block tables just to house UI strings. Those labels belong in placeholders so authors keep a clean, predictable content structure.

**How it works:**

1. **Authors create a `placeholders` sheet** with two columns:
   - Key: Identifier for the string (e.g., `faq-search-placeholder`)
   - Text: The actual string (e.g., `Search frequently asked questions...`)

2. **System converts to JSON** at `/placeholders.json` (or `/en/placeholders.json` for language-specific)

3. **Blocks fetch placeholders** using `fetchPlaceholders()` from `scripts/placeholders.js`

**Example - FAQ Block:**

Instead of hardcoding:
```javascript
// ❌ BAD - Hardcoded strings
searchInput.placeholder = 'Search FAQs...';
noResults.textContent = 'No results found';
```

Use placeholders:
```javascript
// ✅ GOOD - Author-controllable strings
import { fetchPlaceholders } from '../../scripts/placeholders.js';

const placeholders = await fetchPlaceholders();
searchInput.placeholder = placeholders.faqSearchPlaceholder || 'Search FAQs...';
noResults.textContent = placeholders.faqNoResults || 'No results found';
```

**Placeholder Keys:**
- Keys with spaces/dashes are automatically camelCased: `faq-search-placeholder` → `faqSearchPlaceholder`
- Use descriptive, namespaced keys: `blockname-purpose` (e.g., `faq-no-results`, `cart-add-button`)

**When to use placeholders:**
- ✅ UI strings (labels, buttons, messages, placeholders)
- ✅ Error messages and validation text
- ✅ Accessibility labels (aria-label)
- ✅ Any string that might need translation
- ❌ Content that belongs in the block itself (questions, answers, etc.)

**Setup:**

1. Add `scripts/placeholders.js` (from AEM Block Collection)
2. Have authors Create `/placeholders.json` in the CMS
3. Import and use in blocks

**Benefits:**
- Centralized string management
- Easy internationalization (separate placeholders per language)
- Authors control messaging without code changes
- Consistent terminology across blocks

**Fallbacks:**
Always provide default values in code for graceful degradation if placeholders don't load:
```javascript
const config = placeholders.faqSearchLabel || 'Search FAQs';
```

---

## Quick Reference

| Step | Action | Time | Skip? |
|------|--------|------|-------|
| Understand authors | Who are they, what tools do they use | 2 min | **NO** |
| Design structure | Consider alternatives | 10-15 min | **NO** |
| **Get human approval** | **Present structure and wait for approval** | **2-5 min** | **NO** |
| Document model | Author guide + dev notes | 5 min | **NO** |

**Total: 20-25 minutes of content design**

**CRITICAL:** Step 3 (Get human approval) is MANDATORY before implementation.

---

## The Bottom Line

**Your job is to design structures that are author-friendly, not developer-friendly.**

Authors create content using various authoring surfaces (Word, Google Docs, DA, UE, BYOM). They're not developers. Structure should be intuitive for non-technical users.

**Key principles:**
1. **Most blocks should be content blocks** - authors create content directly, not config key-value pairs
2. **Understand who your authors are** - what tools they're comfortable with, how often they'll use this
3. **Consider multiple structure options** - table, list, sections, fragments, auto-blocking
4. **Keep it simple** - max ~3 cells per row, no spans, infer data when possible
5. **Use advanced techniques when appropriate** - fragments for nesting, auto-blocking for simple patterns
6. **Ask authors what's easier** - don't assume, validate your design
7. **Use references for proven patterns** - David's Model, Block Collection, existing blocks
8. **Document the structure** - author guide + developer notes
9. **Use placeholders for UI strings** - don't hardcode labels, messages, or any text that might need translation

**Why this matters:**
- Semantic structures work better with AI agents
- Portable across authoring surfaces
- Cleaner, easier code
- Ready for APIs and syndication

**If authors struggle with your structure, you designed it wrong.**
