---
name: preview-import
description: Preview and verify imported content in local AEM Edge Delivery Services dev server. Validates rendering, compares with original page, and troubleshoots common issues.
---

# Preview Import

Open and verify imported content in local development server.

## When to Use This Skill

Use this skill when:
- You have generated HTML file (from generate-import-html)
- Ready to preview in browser and verify rendering
- Need to compare with original page structure

**Invoked by:** page-import skill (Step 5)

## Prerequisites

From previous skills, you need:
- ✅ HTML file at correct path (from generate-import-html)
- ✅ Images folder in same directory
- ✅ screenshot.png from scrape-webpage (for comparison)
- ✅ documentPath from metadata.json (for URL construction)

## Related Skills

- **page-import** - Orchestrator that invokes this skill
- **generate-import-html** - Provides HTML file to preview
- **scrape-webpage** - Provides screenshot for comparison

## Preview Workflow

### Step 1: Start Development Server with HTML Folder Flag

**Determine the folder from metadata.json:**
- Look at `paths.dirPath` from metadata.json (e.g., `/us`)
- This is the root folder containing your imported HTML file

**Command:**
```bash
aem up --html-folder {dirPath}
```

**Examples based on imported content location:**

| HTML File Location | Command | Preview URL |
|-------------------|---------|-------------|
| `us/en.plain.html` | `aem up --html-folder us` | `http://localhost:3000/us/en` |
| `products/widget.plain.html` | `aem up --html-folder products` | `http://localhost:3000/products/widget` |
| `blog/2024/post.plain.html` | `aem up --html-folder blog` | `http://localhost:3000/blog/2024/post` |

**Why this is required:**
- Without `--html-folder`, AEM CLI proxies requests to the remote server
- The remote server doesn't have your locally imported content
- Result: 404 "Page not found" errors

---

### Step 2: Navigate in Browser

**For most files, use the document path directly:**
```
http://localhost:3000${documentPath}
```

Example:
- HTML file: `us/en/about.plain.html`
- URL: `http://localhost:3000/us/en/about`

**IMPORTANT: For index files, use `/` instead of `/index`:**
```
If file is: index.plain.html
Preview at: http://localhost:3000/
NOT: http://localhost:3000/index
```

**Note:** If you used `--html-folder` flag (e.g., `aem up --html-folder drafts`), prepend that folder to the URL:
```
File: drafts/test.plain.html
URL: http://localhost:3000/drafts/test
```

Use `paths.documentPath` from metadata.json, but for index files ensure the path is `/` not `/index`

---

### Step 3: Verify Rendering

**Check the following:**
- ✅ Blocks render with correct styling
- ✅ Layout matches original page structure (compare to screenshot.png)
- ✅ Images load (or show appropriate placeholders)
- ✅ No raw HTML visible
- ✅ Metadata appears in page source (view source, check `<meta>` tags)
- ✅ Section styling applied correctly

---

### Step 4: Compare with Original

**Side-by-side comparison:**
1. Open `./import-work/screenshot.png` alongside browser preview
2. Check that content structure matches
3. Verify blocks decorated correctly
4. Confirm section boundaries align
5. Validate styling consistency

---

## Troubleshooting

**Blocks don't render correctly:**
- Check HTML structure matches expected format
- Verify block names match exactly (case-sensitive)
- Review `../page-import/resources/html-structure.md` for format guidance

**Images not loading:**
- Verify images folder is in same directory as HTML file
- Check image paths are `./images/...` format
- Ensure images were copied correctly from `./import-work/images/`

**Raw HTML visible:**
- Block name might not match existing block in project
- Check browser console for JavaScript errors
- Verify block exists in `blocks/` directory

**Metadata not in page source:**
- Check metadata block is at end of HTML file
- View page source and search for `<meta>` tags in `<head>`
- Verify metadata properties match expected format

**Dev server not running:**
- Start server with `aem up`
- Check for port conflicts (default 3000)
- Verify you're in correct project directory

**Page not found (404):**
- **Most common cause:** Missing `--html-folder` flag - restart server with `aem up --html-folder {dirPath}`
- Verify HTML file exists at expected path
- Check documentPath from metadata.json matches URL
- For index files, use `/index` not `/`
- Check terminal output confirms "Serving HTML files from folder: {folder}"

---

## Output

This skill provides:
- ✅ Verified preview that matches original page structure
- ✅ Visual confirmation of correct rendering
- ✅ Validated block decoration
- ✅ Confirmed metadata presence

**Import complete when all verification points pass.**
