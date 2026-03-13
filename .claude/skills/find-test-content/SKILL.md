---
name: find-test-content
description: Search for existing content pages containing a specific block in AEM Edge Delivery Services. Reports URLs with occurrences and variants to help identify test content during development.
---

# Find Test Content

This skill searches for existing pages containing a specific block, helping you identify test content during the Content Driven Development workflow.

## When to Use This Skill

**Use this skill when:**
- Modifying an existing block (CSS, JS, or structural changes)
- Adding variants to existing blocks
- Fixing bugs in existing blocks
- Need to find test content that already uses the block

**Do NOT use when:**
- Building a brand new block that doesn't exist yet (no content to find)
- User already provided test URL(s) (just validate those instead)

## What This Skill Does

This skill will:
1. Query the site's query-index for all pages
2. Search each page for the specified block
3. Detect and report all variants found
4. Report all matching pages with their URLs

**This skill does NOT:**
- Validate content quality (you'll do that during implementation)
- Create new content (that happens in Step 4b of CDD if needed)
- Analyze content structure (that's part of implementation)

## How to Use

**Required parameter:**
- `blockName` - Name of the block to search for (e.g., "hero", "cards", "carousel")

**Optional parameter:**
- `host` - Dev server host (default: "localhost:3000")
  - Use "localhost:3000" for local dev server
  - Or use live/preview URLs like "main--mysite--owner.aem.live" or "main--mysite--owner.aem.page"

## Workflow

### 1. Get Parameters

Check if searching on local dev or live/preview:
- Default: localhost:3000 (local dev server)
- Alternative: User can specify live/preview URL

### 2. Run Search

Execute the find-block-content script:

```bash
# Search for block
node .claude/skills/find-test-content/scripts/find-block-content.js <block-name> [host]
```

**Examples:**
```bash
# Find hero block on local dev (default)
node .claude/skills/find-test-content/scripts/find-block-content.js hero

# Find hero block on local dev (explicit)
node .claude/skills/find-test-content/scripts/find-block-content.js hero localhost:3000

# Find cards block on live
node .claude/skills/find-test-content/scripts/find-block-content.js cards main--mysite--owner.aem.live

# Find carousel block on preview
node .claude/skills/find-test-content/scripts/find-block-content.js carousel main--mysite--owner.aem.page
```

**The script will automatically detect and report:**
- All pages containing the block
- Number of block instances per page
- All variants found on each page

### 3. Report Results

**If content found:**
- List all URLs found with their variants
- Note the total count (e.g., "Found 5 pages containing the cards block")
- For each page, show variants discovered (e.g., "- variants: dark, featured")
- Suggest which URLs might be best for testing based on:
  - Variety (pages with different variants for comprehensive testing)
  - Simplicity (simpler pages easier for initial testing)

**If no content found:**
- Report that no content was found
- Suggest possible reasons:
  - Block is new and no content exists yet
  - Block name spelling might be different
  - Content exists but hasn't been published
- Recommend creating test content (CDD Step 4, Option B)

### 4. Next Steps

**If sufficient content found:**
- Recommend specific URL(s) for testing
- Note variety of variants available
- If working on new variant: Note if that specific variant exists or needs to be created
- Return control to CDD workflow to validate URLs

**If insufficient or no content found:**
- Recommend creating test content
- Return control to CDD workflow Step 4, Option B (create test content)

## Example Usage

### Example 1: Finding Hero Block

**Input:**
- Block name: "hero"
- Host: "localhost:3000" (default)

**Command:**
```bash
node .claude/skills/find-test-content/scripts/find-block-content.js hero
```

**Possible outputs:**
```
✓ Found 3 page(s) containing the "hero" block:

1. http://localhost:3000/ - variants: dark
2. http://localhost:3000/about - variants: featured
3. http://localhost:3000/products
```

**Interpretation:**
- Found 3 pages with hero blocks
- Page 1 has "dark" variant
- Page 2 has "featured" variant
- Page 3 has default/no variant
- Good variety for testing different variants

### Example 2: Finding Cards Block

**Input:**
- Block name: "cards"
- Host: "localhost:3000"

**Command:**
```bash
node .claude/skills/find-test-content/scripts/find-block-content.js cards localhost:3000
```

**Possible outputs:**
```
✓ Found 2 page(s) containing the "cards" block:

1. http://localhost:3000/services - variants: three-up, dark
2. http://localhost:3000/team - variants: two-up
```

**Interpretation:**
- Found 2 pages with cards blocks
- Page 1 has both "three-up" and "dark" variants applied
- Page 2 has "two-up" variant
- Good starting point for testing existing functionality

## Integration with CDD Workflow

This skill is invoked from **Step 4: Identify/Create Test Content, Option C: Existing Block**

**Before this skill:**
- Step 1: Dev server running
- Step 2: Requirements analyzed
- Step 3: Content model designed (if structural changes)

**After this skill:**
- Return to CDD Step 4 with findings
- If content found: Validate URLs and proceed to Step 5 (implementation)
- If no content found: Create test content (Step 4, Option B approaches)

## Limitations

- Requires query-index to be available (dev server must be running)
- Only searches indexed pages (new/unpublished content won't appear)
- Cannot search inside blocks for specific content patterns (only finds block presence)
- Variant detection based on CSS classes (only shows variants applied as classes on block element)

## Troubleshooting

**"No pages found in query index"**
- Dev server may not be running: Check `curl http://localhost:3000`
- Query index may not be generated yet: Try accessing a page first
- Using wrong host: Verify host parameter

**"No pages found containing the block"**
- Block name may be misspelled: Verify block name matches CSS class
- Block may be new: No content exists yet
- Content may not be published: Check in CMS

**Script errors**
- jsdom dependency missing: Run `npm install` in project root
- Fetch errors: Check network/server connectivity
