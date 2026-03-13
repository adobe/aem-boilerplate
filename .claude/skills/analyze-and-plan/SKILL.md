---
name: analyze-and-plan
description: Analyze development requirements and define acceptance criteria for AEM Edge Delivery Services tasks. Handles new blocks, variants, modifications, bug fixes, and styling changes with task-specific guidance.
---

# Analyze & Plan

Analyze what you're building and define clear acceptance criteria before writing code. This skill provides task-specific analysis guidance for different types of AEM development work.

## When to Use This Skill

**Invoked by:** content-driven-development skill (Step 2)

Use this skill to:
- Analyze visual designs/mockups (if provided)
- Understand requirements for the task
- Define what success looks like
- Document analysis for reference throughout development

## Workflow

Follow these steps in order:

### Step 1: Visual Analysis (if provided)

**Skip if:** No screenshots, design files, or reference URLs provided

**If visual materials provided:**

See `resources/visual-analysis.md` for complete visual analysis guidance covering:

- **Visual elements** - Layout, typography, colors, spacing, borders, shadows, effects, icons, imagery
- **Interactive elements** - Components, states (hover/focus/active), animations, transitions
- **Dynamic UI patterns** - Modals, tooltips, dropdowns, accordions, carousels
- **Content structure** - Hierarchy, repeating patterns, content types
- **Responsive behavior** - Mobile, tablet, desktop variations
- **Systematic mapping** - Page vs component, existing patterns, block model classification

**What to do:**
1. Gather all visual materials (screenshots, designs, URLs)
2. Use visual-analysis.md guide to systematically analyze
3. Document findings using the provided template
4. Extract key requirements for next steps

**Output:** Visual requirements documented for use in next steps

---

### Step 2: Understand Requirements

**What to do:**
- Think about what you are building/fixing/modifying?
- Consider why this is needed?
- What's the context surrounding these changes?
- Consider all viewports (mobile, tablet, desktop)
- Think about the author experience and how that impacts what we do

**Ask the user questions if needed:**
- Clarify unclear requirements
- Understand edge cases
- Confirm assumptions
- Get missing information

**Use task-specific guidance:**
- See "Task-Specific Analysis Guidance" section below
- Apply appropriate guidance based on task type

**Output:** A clear understanding of all requirements

---

### Step 3: Define Acceptance Criteria

**What to define:**
- What does "done" look like?
- How will you validate success?
- What should NOT break (regressions)?

**Include:**
- Visual match (if designs provided)
- Functional requirements
- Responsive behavior
- Author experience
- Performance considerations

**Use task-specific guidance:**
- See acceptance criteria guidelines in "Task-Specific Analysis Guidance" below

**Output:** Specific, testable acceptance criteria

---

### Step 4: Document Analysis

**Create markdown file at:** `drafts/tmp/{block-name}-analysis.md`
- Use the block name being worked on (e.g., `drafts/tmp/hero-analysis.md`)
- For non-block work, use descriptive name (e.g., `drafts/tmp/navigation-fix-analysis.md`)

**File should include:**
- Task description and context
- Visual analysis (if applicable)
- Requirements identified
- Acceptance criteria defined
- Any open questions or assumptions

**Notes:**
- This is a working artifact, not committed to git
- Used for reference throughout development (especially in Step 7: Final Validation)
- Allows multiple analyses to coexist in drafts/tmp/

**Output:** Analysis file at `drafts/tmp/{block-name}-analysis.md`

---

## Task-Specific Analysis Guidance

### Building a new block

**Must analyze:**
- Author inputs (list what content authors will provide: e.g., "image, title, description, link")
  - What's required vs optional?
  - What can be inferred or auto-generated?
- What variations do we need to support?
- Styling and layout expectations
- Interactive behavior requirements
- Responsive behavior across viewports

**DON'T design at this stage:**
- ❌ Table structure (how many columns/rows)
- ❌ Cell layout (which content goes in which cell)
- ❌ Block variant classes or naming
- ❌ Exact authoring format or field names
- ❌ Authoring experience or ease-of-use (always the goal, addressed in Step 3)

**Note:** At this stage, focus on WHAT content is needed, not HOW it's structured. Detailed content model design (table structure, cells, variants, authoring UX) happens in the content-modeling skill (CDD Step 3).

**Acceptance criteria should cover:**
- Styling and layout match requirements across viewports
- All variations work
- Interactive behavior functions as expected

---

### Adding a Variant to an Existing Block

**Must analyze:**
- What does the variant do?
- How does author enable it? (class name? content marker?)
- Style-only (CSS) or behavior change (JS)?
- Styling/layout changes for variant
- Responsive considerations

**Acceptance criteria should cover:**
- Variant styling/layout matches requirements across viewports
- Variant applies correctly when specified
- Existing variants/default behavior continue to function as is

---

### Modify Existing Block Behavior

**Must analyze:**
- What behavior is changing and why?
- Any impact to existing content using this block?
- Content/authoring implications of the change (what content needs to be updated and how)?
- JS and/or CSS changes needed?
- Responsive implications?

**Acceptance criteria should cover:**
- New behavior works as expected
- Existing functionality is not broken (regression check)
- Works across viewports
- Existing content still works

---

### CSS-Only Styling Change

**Must analyze:**
- What's changing visually
- Which viewports are affected
- Layout implications

**Acceptance criteria should cover:**
- Styling/layout changes match requirements across viewports
- No layout breaks
- No regressions

---

### Bug Fix

**Must analyze:**
- What is the bug?
- What should happen instead?
- Root cause (if not obvious)

**Acceptance criteria should cover:**
- Bug no longer occurs
- No regressions (existing behavior unchanged)
- Works across viewports, if relevant

---

## Success Criteria

- ✅ Task type identified (new block, variant, modification, etc.)
- ✅ Requirements analyzed using appropriate guidance
- ✅ Acceptance criteria defined
- ✅ Analysis documented to markdown file
- ✅ Visual analysis completed (if applicable)

## Output

This skill provides:
- ✅ Clear understanding of what to build
- ✅ Documented requirements
- ✅ Specific acceptance criteria for validation
- ✅ Analysis notes file for reference

**Next step:** Return to CDD Step 2 with documented analysis and acceptance criteria

---

## Resources

- **Visual Analysis:** `resources/visual-analysis.md` - Comprehensive guide for analyzing screenshots, design files, and existing URLs. Includes systematic analysis techniques, documentation templates, and implementation mapping.
