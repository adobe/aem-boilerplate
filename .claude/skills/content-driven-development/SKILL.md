---
name: content-driven-development
description: Apply a Content Driven Development process to AEM Edge Delivery Services development. Use for ALL code changes - new blocks, block modifications, CSS styling, bug fixes, core functionality (scripts.js, styles, etc.), or any JavaScript/CSS work that needs validation.
---

# Content Driven Development (CDD)

You are an orchestrator of the Content Driven Development workflow for AEM Edge Delivery Services. This workflow ensures code is built against real content with author-friendly content models.

**CRITICAL: Never start writing or modifying code without first identifying or creating the content you will use to test your changes.**

## When to Use This Skill

Use CDD for ALL AEM development tasks:
- ✅ Creating new blocks
- ✅ Modifying existing blocks (structural or functional changes)
- ✅ Changes to core decoration functionality
- ✅ Bug fixes that require validation
- ✅ Any code that affects how authors create or structure content

Do NOT use for:
- Documentation-only changes
- Configuration changes that don't affect authoring
- Research tasks that don't require making any code changes yet

## Philosophy

Content Driven Development prioritizes creating or identifying test content before writing code. This ensures:
- Code is built against real content
- Author-friendly content models
- Validation throughout development

**Optional: Understanding CDD Principles**

Read `resources/cdd-philosophy.md` if:
- User asks "why" questions about content-first approach
- You need to understand reasoning behind CDD decisions
- You're unsure whether to prioritize author vs developer experience

Otherwise: Follow the workflow steps below

## Step 0: Create TodoList

**FIRST STEP:** Use the TodoWrite tool to create a todo list with the following 8 tasks:

1. **Start dev server** (if not running)
   - Success: Dev server running, can access http://localhost:3000

2. **Analyze & plan**
   - Success: Clear understanding documented + acceptance criteria defined

3. **Design content model**
   - Success: Content structure documented and validated

4. **Identify/create test content**
   - Success: Test content accessible covering all scenarios

5. **Implement**
   - Success: Functionality works across all viewports

6. **Lint & test**
   - Success: All checks pass

7. **Final validation**
   - Success: All acceptance criteria met, everything works

8. **Ship it**
   - Success: PR created with preview link for validation

**Mark todo complete when:** Todo list created with all 8 tasks

---

## Step 1: Start Dev Server

**Check if dev server is running:**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Expected: `200` (server running) or connection error (server not running)

**If not running, start it:**

```bash
aem up --no-open --forward-browser-logs
```

**Notes:**
- Run in background if possible (dev server needs to stay running)
- Requires AEM CLI installed globally: `npm install -g @adobe/aem-cli`
- Alternative: `npx -y @adobe/aem-cli up --no-open --forward-browser-logs`

**IMPORTANT:** Check the command output for errors. Common issues:
- Port 3000 already in use
- AEM CLI not installed
- Configuration errors

**After starting, verify it's running:**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
```

Expected: `200`

**Success criteria:**
- ✅ Dev server running
- ✅ http://localhost:3000 returns 200
- ✅ No errors in server startup output

**Mark todo complete when:** Dev server confirmed running and accessible

---

## Step 2: Analyze & Plan

**Invoke:** analyze-and-plan skill

**Provide:**
- Task description from user
- Screenshots, design files, or existing URLs to match design from (if available)

**The analyze-and-plan skill will:**
- Guide you through task-specific analysis
- Help define acceptance criteria
- Optionally analyze visual designs/mockups if provided
- Create documented analysis for reference

**Success criteria:**
- ✅ Requirements analyzed
- ✅ Acceptance criteria defined
- ✅ Analysis documented to file for later steps

**Mark todo complete when:** Analysis documented and acceptance criteria defined

---

## Step 3: Design Content Model

**Skip if:** CSS-only changes that don't affect content structure

**Invoke:** content-modeling skill

**Provide:**
- Analysis from Step 2 (content requirements, author inputs)
- Block name and purpose

**The content-modeling skill will:**
- Design table structure (rows, columns, semantic formatting)
- Validate against best practices (4 cells/row, semantic formatting)
- Document content model for authors

**Success criteria:**
- ✅ Content model designed (table structure defined)
- ✅ Validated against best practices
- ✅ Content model documented

**Mark todo complete when:** Content model designed and documented

---

## Step 4: Identify/Create Test Content

**Goal:** End this step with accessible test content URL(s) covering all test scenarios

**Choose the best ath based on your situation:**

---

### Option A: User Provided Test URL(s)

**When to use:** User already has content and provided URL(s)

**What to do:**
1. Validate URL loads: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/path`
2. Expected: `200` status
3. Document URL(s)
4. Mark complete

---

### Option B: New Block (No Existing Content)

**When to use:** Building a brand new block that doesn't exist yet

**What to do:**
1. Skip search (nothing exists yet to find)
2. Create test content using one of these approaches:

**Approach 1: CMS Content (Recommended)**
1. Ask user to create content in their CMS (Google Drive/SharePoint/DA/Universal Editor)
2. Provide content model from Step 3 as reference
3. Wait for user to provide URL(s)
4. Validate: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/path`
5. Expected: `200` status

**Approach 2: Local HTML (Temporary)**
1. Create HTML file in `drafts/tmp/{block-name}.plain.html`
2. Follow structure from Step 3 content model
3. Read `resources/html-structure.md` for local HTML file format guidance
4. Restart dev server: `aem up --html-folder drafts --no-open --forward-browser-logs`
5. Validate: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/drafts/tmp/{block-name}`
6. Expected: `200` status
7. **Note:** User must create CMS content before PR (required for preview link)

---

### Option C: Existing Block

**When to use:** Modifying, fixing, or styling an existing block

**What to do:**

**First: Search for existing content**
1. Invoke find-test-content skill
2. Provide: block name, dev server URL (optional, defaults to localhost:3000)

**What find-test-content will do:**
- Search for existing content pages containing the block
- Automatically detect and report all variants found
- Report: URLs with instance counts and variant info

**Then: Assess search results**

**If sufficient content found:**
1. Document URL(s)
2. Validate URLs load: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/path`
3. Expected: `200` status
4. Mark complete

**If no content found OR insufficient coverage:**
1. Create additional test content using approaches from Option B
2. Validate URLs load
3. Mark complete

---

**Success criteria:**
- ✅ Test content accessible at known URL(s)
- ✅ Content covers all test scenarios (variants, edge cases)
- ✅ URLs validated (return 200)

**Mark todo complete when:** Test content identified/created and validated

---

## Step 5: Implement

**Invoke:** building-blocks skill

**Provide:**
- Content model from Step 3 (if applicable)
- Test content URL(s) from Step 4
- Analysis/requirements from Step 2
- Type of changes: new block, existing block modification, CSS-only, etc.

**The building-blocks skill will:**
- Guide implementation approach based on change type
- Handle JavaScript decoration (if needed)
- Handle CSS styling (mobile-first, responsive)
- Ensure iterative testing in browser throughout development

**Success criteria:**
- ✅ Code implementation complete
- ✅ Functionality works across all viewports (mobile, tablet, desktop)
- ✅ No console errors

**Mark todo complete when:** building-blocks skill reports implementation complete and working across viewports

---

## Step 6: Lint & Test

**What to do:**

```bash
npm run lint
```

**If lint errors:**
1. Fix issues (use `npm run lint:fix` for auto-fixable problems)
2. Re-run lint until clean

**Run existing tests:**
```bash
npm test
```

**Note:** Unit tests are optional and only needed for logic-heavy utilities. The testing-blocks skill (invoked by building-blocks in Step 5) handles browser testing. This step catches any remaining lint issues and runs the project's test suite.

**Success criteria:**
- ✅ `npm run lint` passes with no errors
- ✅ `npm test` passes (if tests exist)

**Mark todo complete when:** All lint and test checks pass

---

## Step 7: Final Validation

**What to do:**

1. **Review acceptance criteria from Step 2**
   - Read the analysis document created in Step 2
   - Check each acceptance criterion is met

2. **Final browser sanity check**
   - Load test content URL(s) in browser
   - Check mobile, tablet, and desktop viewports
   - Verify no console errors
   - Confirm no visual regressions

3. **Verify no regressions**
   - If modifying existing block: test existing variants still work
   - If modifying core functionality: spot-check a few pages

**Success criteria:**
- ✅ All acceptance criteria from Step 2 met
- ✅ Works across all viewports
- ✅ No console errors
- ✅ No regressions on existing functionality

**Mark todo complete when:** All acceptance criteria verified and no regressions found

---

## Step 8: Ship It

**What to do:**

1. **Create feature branch (if not already on one):**
   ```bash
   git checkout -b block-name
   ```

2. **Stage specific files only:**
   ```bash
   git add blocks/{block-name}/{block-name}.js blocks/{block-name}/{block-name}.css
   # Add only files you worked on - NEVER use `git add .`
   ```

3. **Commit with conventional commit format:**
   ```bash
   git commit -m "feat(block-name): add new block"
   ```
   Include revelevant details in commit message and agent attribution in footer (agent adds `Co-authored-by: cursor <noreply@cursor.com>`)

4. **Push to feature branch:**
   ```bash
   git push origin HEAD
   ```

5. **Create PR with preview link:**
   - Branch preview URL format: `https://{branch}--{repo}--{owner}.aem.page/{path}`
   - Example: `https://carousel--aem-skills-demo--shsteimer.aem.page/`
   - **REQUIRED:** Include preview link in PR description (used for automated PSI checks)
   - Add multiple preview links if needed (e.g., different variants, edge cases)

   **Determining if you need a draft PR:**

   Create a **draft PR** when:
   - ✅ Only local test content exists for NEW functionality/variants
   - ✅ Test content demonstrates new features not yet in CMS
   - ✅ You need user to create CMS content before final validation

   Create a **regular PR** when:
   - ✅ All test content exists in CMS and is previewable
   - ✅ Changes only affect existing content (regressions can be tested with existing CMS content)

   **Workflow for draft PRs:**
   1. Create the PR as a draft using `gh pr create --draft`
   2. Include existing content preview links (for regression testing if applicable)
   3. Include next steps in PR description (see template below):
      - Describe the test content used locally and what scenarios it covered
      - Suggest that same/similar content be created and previewed, and links added to PR
      - Keep steps brief but actionable for any reviewer
   4. Instruct the user to create CMS content following the steps:
      - Open local test content in browser: `http://localhost:3000/drafts/tmp/[test-file]`
      - Right-click AEM Sidekick extension
      - Click "View document source" option
      - Use the copy button to copy the document content
      - Paste into Word/Google Docs/Document Authoring (for UE: use as guide, copy/paste won't work directly)
      - Preview the CMS content
   5. User adds preview URL(s) to PR description and marks PR ready for review (or agent does with user's input)

**PR Description Template:**

Use this template for all PRs, including all relevant preview links and adapting as needed:

```markdown
## Description
Brief description of changes

[If an issue exists]
Fix #<gh-issue-id>

Test URLs:

[Repeat for all relevant test urls]
- Before: https://main--{repo}--{owner}.aem.page/{path}
- After: https://{branch}--{repo}--{owner}.aem.page/{path} 

[If only local test content (draft PR):]

This PR is currently a **draft** pending creation of CMS test content.

### Next Steps to Complete PR:

[add relevant steps here]
```

**Success criteria:**
- ✅ Changes committed with proper message format and attribution
- ✅ Pushed to feature branch (not main)
- ✅ PR created with preview link in description

**Mark todo complete when:** PR created and ready for review

---

## Related Skills

- **analyze-and-plan**: Invoked in Step 2 for requirements analysis and acceptance criteria
- **content-modeling**: Invoked in Step 3 for designing content models
- **find-test-content**: Invoked in Step 4, Option C for finding existing content
- **building-blocks**: Invoked in Step 5 for implementation
- **testing-blocks**: Invoked by building-blocks for browser testing
- **block-collection-and-party**: Used to find similar blocks and reference implementations

## Anti-Patterns to Avoid

Common mistakes that violate CDD principles:
- ❌ Starting with code before understanding the content model
- ❌ Making assumptions about content structure without seeing real examples
- ❌ Creating developer-friendly but author-hostile content models
- ❌ Skipping content creation "to save time" (costs more time later)

## Resources

- **Philosophy:** `resources/cdd-philosophy.md` - Why content-first matters
- **HTML Structure:** `resources/html-structure.md` - Guide for creating local HTML test files
