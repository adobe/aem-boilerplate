---
name: AEM Development Workflow
description: Required workflow for AEM EDS development - linting, testing, preview validation, and PRs with demo links. Use when developing blocks or features for AEM Edge Delivery Services projects, before doing anything else.
---

# AEM Development Workflow

## Overview

**AEM Edge Delivery Services has a required development workflow with non-negotiable quality gates.**

These gates ensure code works in production, not just locally. Skipping gates under pressure leads to broken demos, failed builds, and technical debt.

## The Required Workflow

```
1. Define Content Structure
2. Request Real CMS Content (human creates in parallel)
3. Create Local HTML
4. Implement Block
5. Lint
6. Test Locally (with HTML)
7. Push Feature Branch
8. Test in Preview (with real CMS content)
9. Open PR with Demo Link (real content)
10. Validate PR Checks Pass
```

**Every step is required. No exceptions.**

**Critical:** AEM EDS is content-first. You request real CMS content BEFORE implementing, then use local HTML for rapid development. PR must use real authored content.

## The Non-Negotiable Gates

### 1. Linting MUST Pass Before Commit

```bash
npm run lint
```

**If linting fails, fix it.** Don't commit.

**Common rationalizations to ignore:**
- ❌ "Just style issues, functionality works"
- ❌ "Client is waiting, I'll fix later"
- ❌ "Linting is too slow"

**Reality:** Linting takes 10-30 seconds. Lint failures can break builds. Fix it now.

---

### 2. Test Content MUST Exist Before Implementation

**Content-first approach:** Define content structure and create (or locate) test content BEFORE implementing the block.

**Two types of test content:**

**A. Local HTML for Development (You create)**
- Static HTML file matching AEM's HTML structure
- Used with `aem up --html-folder=./drafts/agent` (or `npx aem up --html-folder=./drafts/agent`)
- Lives in project's `drafts/agent/` folder
- Allows rapid local development iteration
- **Not sufficient for PR** - this is for your development only

**B. Real Authored Content for PR (Human creates in CMS)**
- Word/Google Doc created by human in the CMS
- Published to `/drafts/` folder (e.g., `/drafts/testimonials-test`)
- Required for PR demo link
- Shows block works with real author workflow

**The workflow:**
1. **Before implementation:** Ask human to create real test content in CMS
   - "Can you create test content at /drafts/[block-name]-test with [structure description]?"
   - This happens in PARALLEL while you implement
2. **During implementation:** Create local HTML in drafts/agent/ to match that structure
   - Faster iteration during development
   - Must match the structure of what authors will create
3. **For PR:** Use the real CMS content path (in /drafts/) for demo link

**Common rationalizations to ignore:**
- ❌ "I'll implement first, then request content"
- ❌ "Local HTML is enough for the PR" (NO - must use real authored content)
- ❌ "It's simple, doesn't need real content"
- ❌ "I'll create content in the CMS myself" (NO - let authors create it)

**Reality:** You need BOTH. Local HTML for fast development, real CMS content for PR validation.

---

### 3. Feature Branch Workflow Always

```bash
git checkout -b feature/block-name
git add blocks/block-name/
git commit -m "Add block-name block"
git push origin feature/block-name
```

**Never push directly to main.** Feature branches enable:
- Automatic preview environments
- Parallel development
- Clean rollback if needed

**Common rationalizations to ignore:**
- ❌ "Pushing to main saves time"
- ❌ "It's a small change"
- ❌ "I'm the only developer"

**Reality:** Direct-to-main pushes skip preview validation and break the workflow.

---

### 4. Preview Validation Required

AEM EDS automatically creates preview URLs when you push a feature branch:

```
https://branch--repo--org.aem.page/your-test-page
```

**You MUST validate in preview before sharing the link:**
1. Push feature branch
2. Wait for preview build (usually < 30 seconds)
3. Open preview URL and verify block works
4. **Then** share the link

**Common rationalizations to ignore:**
- ❌ "Works locally, will work in preview"
- ❌ "Client is waiting, send it now"
- ❌ "I'll validate after sharing"

**Reality:** Never send a link you haven't validated. Broken demos are worse than waiting 30 seconds.

---

### 5. PR with Demo Link Required

Create PR with:
1. Clear title describing what changed
2. **Working preview link** showing the block in action
3. Brief description of implementation

**Example PR description:**
```markdown
## Testimonials Block

Adds customer testimonial display block.

**Preview:** https://feature-testimonials--myproject--adobe.aem.page/test-testimonials

- Responsive card layout
- Supports multiple testimonials
- Mobile-optimized design
```

**Common rationalizations to ignore:**
- ❌ "Code is self-explanatory"
- ❌ "PR process is too slow"
- ❌ "No one reviews PRs anyway"

**Reality:** PRs document changes and provide demo links for stakeholders.

---

## The Complete Workflow

### Step-by-Step

**1. Define Content Structure (5-10 min)**
- Determine what content structure authors will use
- Consider: tables, lists, simple paragraphs
- Make it author-friendly (they use Word/Google Docs)
- Document expected structure

**2. Request Real Test Content from Human (1 min)**
Ask your human partner to create test content in the CMS in PARALLEL:

```
"Can you create test content at /drafts/[block-name]-test?
It should have [describe structure: e.g., 'a table with 2 columns:
testimonial text in first column, author name in second column.
Include 3-4 example testimonials.']

I'll create local HTML in /drafts/agent/ to match this structure for development."
```

This happens in parallel while you implement - don't wait for them to finish.

**3. Create Local HTML for Development (5 min)**
```bash
# Create test HTML matching AEM structure in drafts/agent folder
mkdir -p drafts/agent
# Create HTML file with structure matching step 1
# e.g., drafts/agent/testimonials-test.html
```

The local HTML:
- Must match AEM's HTML output structure (check existing blocks for examples)
- Lives in `drafts/agent/` folder
- Used for rapid development iteration
- NOT used for PR

**CRITICAL HTML Structure Requirements:**

Your HTML must include the proper block decoration structure for blocks to load.

**IMPORTANT:** Always check `head.html` in your project root and copy those exact script/style includes into your test HTML. This ensures you have the correct nonce attributes, CSP headers, and script references.

**Template structure:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Block Test</title>
  <!-- COPY THESE FROM head.html IN PROJECT ROOT -->
  <script nonce="aem" src="/scripts/aem.js" type="module"></script>
  <script nonce="aem" src="/scripts/scripts.js" type="module"></script>
  <link rel="stylesheet" href="/styles/styles.css"/>
</head>
<body>
  <header></header>
  <main>
    <!-- Your block goes in a <div> in main -->
    <div>
      <!-- Block content structure after AEM decoration -->
      <div class="block-name">
        <div>
          <div>Cell 1</div>
          <div>Cell 2</div>
        </div>
        <div>
          <div>Cell 3</div>
          <div>Cell 4</div>
        </div>
      </div>
    </div>
  </main>
  <footer></footer>
</body>
</html>
```

**Key points:**
- **ALWAYS read head.html first** and copy the exact script/style tags from it
- The `nonce="aem"` attribute is typically required for CSP (Content Security Policy)
- Include `aem.js` and `scripts.js` - these handle block decoration
- Use the **decorated HTML structure** (nested divs) that blocks receive, NOT tables
- Tables are authored in Word/Google Docs, but AEM converts them to nested divs before blocks run
- Block class comes from table name (e.g., "Block Name" → "block-name")
- Each table row becomes a div containing child divs for each cell
- Without these scripts, your block JavaScript never runs

**Workflow when creating test HTML:**
1. Read `/head.html` in project root
2. Copy the script and style tags from it (usually lines with aem.js, scripts.js, styles.css)
3. Paste them into your test HTML `<head>`
4. Add your block content structure in `<main>`

**Common mistake:** Hardcoding script tags without checking head.html. Different projects may have different CSP policies, nonce values, or additional scripts.

**4. Implement Block (30-60 min)**
```bash
# Start local server with drafts/agent folder for local HTML
aem up --html-folder=./drafts/agent

# Implement block in blocks/block-name/
# - block-name.js (decorate function that parses your content structure)
# - block-name.css (scoped styles)
```

**5. Lint (1 min)**
```bash
npm run lint

# If failures, fix them:
npm run lint:fix  # Auto-fixes simple issues
# Manually fix remaining issues
```

**6. Test Locally with HTML (5-10 min)**
- View local HTML at http://localhost:3000/drafts/agent/[block-name]-test
- Verify block renders correctly
- Test responsive behavior using browser dev tools or Puppeteer/Playwright
- Fix any issues

**7. Push Feature Branch (1 min)**
```bash
git checkout -b feature/block-name
git add blocks/block-name/
git commit -m "Add block-name block"
git push origin feature/block-name
```

**8. Test in Preview with Real Content (2-3 min)**
```bash
# Preview URL with real authored content (from step 2):
# https://feature-block-name--repo--org.aem.page/drafts/block-name-test

# Open URL and verify:
# - Block renders correctly with real CMS content
# - Styling works
# - Content displays properly
# - Test on actual mobile device if possible
```

**If human hasn't finished creating content yet:**
- Wait for them to complete it (they were working in parallel)
- Or offer to help if they're blocked
- DO NOT skip this validation - real content is required

**9. Open PR with Demo Link (2 min)**
- Include preview link showing working block WITH REAL CONTENT
- Note any implementation details
- Request review if needed

**Example PR description:**
```markdown
## Block Name Block

[Description]

**Preview with test content:** https://feature-block-name--repo--org.aem.page/drafts/block-name-test

Implementation notes: [any details]
```

**10. Validate PR Checks Pass (1-2 min)**
- Wait for CI/CD checks to complete
- Ensure all automated tests pass
- Fix any failures before requesting review

**Total time: ~50-90 minutes including implementation**
**Note:** Real content creation happens in parallel, no additional wait time

---

## Under Pressure

### "Client is waiting RIGHT NOW"

**Response:** Quality gates take < 5 minutes total. You have time.

If client needs it NOW:
1. Run lint (30 sec)
2. Push feature branch (30 sec)
3. Validate preview (30 sec)
4. Send validated link (10 sec)

**Total:** 100 seconds. You have time to do it right.

### "It works locally, just ship it"

**Response:** Local ≠ Preview. Validate before sharing.

Real issues that only show in preview:
- Build failures
- Content parsing differences
- Environment-specific bugs
- CDN caching issues

30 seconds of validation prevents broken demos.

### "I'll fix lint errors later"

**Response:** Fix now or don't commit.

"Later" means:
- Next person sees broken lint
- CI builds might fail
- Technical debt accumulates
- You probably won't fix it

Fix takes 1 minute. Do it now.

---

## Red Flags - STOP and Follow Process

If you're thinking:
- "Client needs > code quality"
- "Works locally = works in preview"
- "Done is better than perfect"
- "I'll fix it later"
- "Process is too slow"
- "Pushing to main saves time"
- "I tested with local HTML only" (violates content-first)
- "I'll implement first, then create test content"

**All of these mean: STOP. Follow the workflow.**

**Special case - No real CMS content for PR:**
If you're ready for PR but human hasn't created CMS content yet:
1. STOP before opening PR
2. Ask your human: "Is the test content ready at /drafts/[block-name]-test?"
3. If not ready, wait or help them complete it
4. DO NOT use local HTML from drafts/agent/ for PR demo link
5. THEN open PR with real CMS content link (in /drafts/)

You cannot create a valid PR without real authored content. Local HTML in drafts/agent/ is only for development.

---

## Quick Reference

| Step | Command/Action | Time | Can Skip? |
|------|----------------|------|-----------|
| Define content structure | Plan author-friendly structure | 5-10min | **NO** |
| Request real CMS content | Ask human to create in /drafts/ (parallel) | 1min | **NO** |
| Create local HTML | Create drafts/agent/ with AEM structure | 5min | **NO** |
| Implement | Code in blocks/ with `--html-folder=./drafts/agent` | 30-60min | No |
| Lint | `npm run lint` | 30sec | **NO** |
| Test locally | Browser/Puppeteer with drafts/agent/ HTML | 5-10min | **NO** |
| Feature branch | `git checkout -b feature/...` + push | 1min | **NO** |
| Test in preview | Verify with real /drafts/ CMS content | 2-3min | **NO** |
| Open PR with demo link | Link to /drafts/ content, not drafts/agent/ | 2min | **NO** |
| Validate PR checks | Wait for CI/CD | 1-2min | **NO** |

**Total quality gates time: < 10 minutes**
**Total workflow time: 50-90 minutes including implementation**
**Real CMS content creation: Happens in parallel (no added time)**

---

## The Bottom Line

**The workflow exists to ensure clients see WORKING code.**

Skipping gates doesn't save time - it creates problems:
- Broken demos
- Failed builds
- Technical debt
- Debugging sessions

**Follow the workflow. Every time. No exceptions.**

Client pressure, time pressure, and "simple" tasks don't change the requirements.

Quality gates take < 5 minutes. You have time to do it right.
