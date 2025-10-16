---
name: AEM Block Reusability
description: Check Block Collection and Block Party BEFORE implementing blocks - avoid reinventing the wheel. Use when asked to implement any block or component for AEM Edge Delivery Services, before starting implementation.
---

# AEM Block Reusability

## Overview

**Before implementing ANY block, check existing solutions first.**

AEM has extensive block collections. Building from scratch wastes 60+ minutes when existing solutions take 5-20 minutes to adapt.

## The Rule

```
NEVER start implementing a block until you've checked:
1. AEM Block Collection (2 min)
2. Block Party (3 min)
3. Current project blocks (1 min)
```

**Total time: 5-7 minutes**
**Time saved: 40-90 minutes**

## Required Workflow

### Step 1: Check AEM Block Collection (2-3 min)

**URL:** https://github.com/adobe/aem-block-collection

Search for your block type:
- Browse /blocks directory
- Look for similar functionality
- Check related patterns

**Common blocks available:**
- Carousels, tabs, accordions
- Forms, tables, cards
- Navigation, breadcrumbs
- Media players, galleries
- And many more

### Step 2: Check Block Party (2-3 min)

**URL:** https://www.aem.live/developer/block-party

Search community contributions:
- Use search/filter
- Check curated list
- Look at implementation examples
- Review documentation

### Step 3: Check Current Project (1 min)

Look in your project's `/blocks` directory:
- Similar blocks already implemented?
- Related functionality to adapt?
- Patterns you can reuse?

### Step 4: Evaluate Findings

After checking all three sources:

**If exact match exists:**
→ Use it as-is (0-5 min to integrate)

**If close match exists (80%+ of requirements):**
→ Adapt it (10-20 min)

**If related pattern exists:**
→ Use as template (20-40 min)

**If nothing relevant exists:**
→ Build from scratch (60+ min) + document why

## Common Rationalizations to Ignore

### ❌ "I Know How to Build It"

**Rationalization:** "I can implement this quickly, no need to search"

**Reality:**
- Your implementation: 60+ minutes
- Checking: 5 minutes
- Adapting existing: 10-20 minutes
- Existing solutions are tested and proven

**Counter:** Check first anyway. It's mandatory, not optional.

---

### ❌ "Searching Takes Time"

**Rationalization:** "Faster to build than search"

**Reality:**
- Search time: 5 minutes
- Build time: 60+ minutes
- **You save 55+ minutes minimum**

**Counter:** 5 minutes of checking saves an hour of building.

---

### ❌ "Requirements Won't Match Exactly"

**Rationalization:** "Existing blocks might not fit our exact needs"

**Reality:**
- 80% match + adaptation = 20 minutes
- 100% from scratch = 60+ minutes
- Adaptation is almost always faster

**Counter:** You don't need perfect match. Close match + adapt = faster.

---

### ❌ "ASAP Means Start Coding"

**Rationalization:** "PM wants this ASAP, no time to search"

**Reality:**
- Checking: 5 minutes
- Using existing: 10-20 minutes
- Building from scratch: 60+ minutes
- **ASAP means find fastest solution**

**Counter:** When it's urgent, checking existing solutions is FASTER.

---

### ❌ "Custom Gives More Control"

**Rationalization:** "Building custom gives exactly what we want"

**Reality:**
- Custom = more bugs, more testing, more maintenance
- Existing solutions are battle-tested
- Community contributions have multiple reviewers

**Counter:** Control costs 60+ minutes + ongoing maintenance. Not worth it.

---

### ❌ "Collection Might Not Have It"

**Rationalization:** "Block Collection probably doesn't have this"

**Reality:**
- You don't know until you check (2 minutes)
- Common patterns almost always exist
- Related blocks provide adaptation templates

**Counter:** "Might not" is guessing. Check and know for sure.

---

## Red Flags - STOP and Check First

If you're thinking:
- "I can build this quickly"
- "No time to search"
- "Requirements are too specific"
- "Custom is better"
- "They probably don't have it"
- "I'll just start implementing"

**All of these mean: STOP. Check Block Collection and Block Party first.**

---

## The 5-Minute Check Process

**1. Open Block Collection (1 min)**
```
https://github.com/adobe/aem-block-collection
→ Browse /blocks directory
→ Search for keywords related to your block
```

**2. Document findings (30 sec)**
- Found exact match? (block name, URL)
- Found close match? (what's similar, what's different)
- Found related pattern? (how it could be adapted)
- Found nothing relevant? (document this)

**3. Open Block Party (1 min)**
```
https://www.aem.live/developer/block-party
→ Search curated list
→ Filter by category if available
```

**4. Document findings (30 sec)**
- Community implementations available?
- Better than Block Collection option?
- Good documentation/examples?

**5. Check project blocks (1 min)**
```
ls blocks/
→ Scan for similar functionality
→ Check if patterns can be reused
```

**6. Make decision (1 min)**
- Use existing as-is
- Adapt existing (document what needs changing)
- Build from scratch (document why no existing solution works)

**Total: 5-6 minutes**

---

## Decision Tree

```
Need new block functionality?
    ↓
Check Block Collection (2 min)
    ↓
Found exact match? → Use it (done in 5 min total)
    ↓ No
Check Block Party (3 min)
    ↓
Found close match (80%+)? → Adapt it (done in 15-25 min total)
    ↓ No
Found related pattern? → Use as template (done in 30-50 min total)
    ↓ No
Build from scratch + document why (60+ min)
```

**Always start at the top. Never skip to the bottom.**

---

## When Building From Scratch

If you genuinely need to build from scratch (no suitable existing solution):

**Document why:**
```markdown
## Why New Implementation

Checked existing solutions:
- ✅ AEM Block Collection: No carousel with [specific feature]
- ✅ Block Party: Found 3 carousels but none support [requirement]
- ✅ Current project: No similar blocks

Building new because: [specific reason existing solutions don't work]
```

This documentation:
- Proves you checked first
- Explains decision to reviewers
- Helps future developers understand choices

---

## Examples

### Example 1: Carousel Request

**❌ Wrong approach:**
```
PM: "We need a carousel block"
Agent: "I'll implement a carousel"
→ Spends 60 minutes building from scratch
→ Block Collection has carousel
→ Wasted 55 minutes
```

**✅ Correct approach:**
```
PM: "We need a carousel block"
Agent: "Let me check Block Collection first"
→ Finds carousel in Block Collection (2 min)
→ Reviews features (2 min)
→ Adapts to add one custom feature (15 min)
→ Total: 19 minutes (saved 41 minutes)
```

---

### Example 2: Custom Requirements

**Request:** "We need a product grid with filters and sorting"

**Step 1: Check Block Collection**
- Found: Basic card grid
- Missing: Filters and sorting

**Step 2: Check Block Party**
- Found: Product grid with filters (80% match)
- Missing: Specific sorting options

**Step 3: Decision**
- Use Block Party implementation
- Add custom sorting (20 min adaptation)
- Total: 25 minutes vs 90 minutes from scratch

---

## Quick Reference

| Action | Time | Skip? |
|--------|------|-------|
| Check Block Collection | 2-3 min | **NO** |
| Check Block Party | 2-3 min | **NO** |
| Check project blocks | 1 min | **NO** |
| Evaluate findings | 1 min | **NO** |
| Document if building new | 2 min | **NO** |

**Total mandatory check time: 5-7 minutes**

---

## The Bottom Line

**Check existing solutions BEFORE implementing. Always.**

This is not optional. This is not "if you have time." This is mandatory.

5 minutes of checking saves 55+ minutes of building.

Existing solutions are tested, proven, and maintained. Your from-scratch implementation isn't.

When PM says "ASAP" - checking existing solutions IS the fast path.

**Check first. Build second. In that order. Every time.**
