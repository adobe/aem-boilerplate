# check-experimentation-engine

Check, instrument, or update the AEM Experimentation engine for an AEM Edge Delivery project.

## Usage

```
/check-experimentation-engine [check|install|update]
```

- `check` - Verify existing setup and report any issues (default if no argument provided)
- `install` - Fresh installation of the experimentation engine
- `update` - Update an existing installation to the latest version

## Default Behavior

When invoked without arguments, run `check` mode first, then based on results:
- If plugin is missing → Prompt: "Would you like to install the experimentation engine?"
- If plugin exists but integration incomplete → Prompt: "Would you like to complete the setup?"
- If plugin exists and can be updated → Prompt: "Would you like to update to the latest version?"
- If everything is complete → Report success, no prompt needed

## Key Principles

1. **Branch**: Use `v2` branch for all git subtree commands (includes contextual experimentation rail UI)
2. **Preferred approach**: Use a separate `experiment-loader.js` file (as documented in the plugin README)
3. **Respect existing patterns**: If experimentation logic already exists inline in scripts.js, don't change it
4. **Names vary**: Function names, import names, and file paths may differ between projects
5. **Audiences are optional**: Segmentation is not currently supported - do not require it
6. **Prompt for optional steps**: Ask the user before making assumptions on optional/indeterminate steps
7. **Both phases required**: The plugin has both `loadEager` (run early) and `loadLazy` (run after blocks load) phases

---

## Check Mode (`check`)

### Check 1: Plugin Directory (REQUIRED)

```bash
ls -la plugins/experimentation/src/index.js
```

**Report:**
- ✅ Plugin directory exists
- ❌ Plugin directory missing - run `/setup-experimentation install`

If exists, attempt to pull updates:
```bash
git subtree pull --squash --prefix plugins/experimentation https://github.com/adobe/aem-experimentation.git v2
```

---

### Check 2: Experimentation Integration (REQUIRED)

Check for experimentation integration in this order:

**Step 2a: Check for separate loader file**
Look for files like `scripts/experiment-loader.js`, `scripts/experimentation.js`, or similar.

**Step 2b: Check scripts.js for integration**
Look for EITHER:
- Import from a loader file (Pattern A - separate loader)
- Direct import from `../plugins/experimentation/src/index.js` (Pattern B - inline)

**Required elements (names may vary):**
- Config object with `prodHost` (default value `'www.mysite.com'` is acceptable - do not flag as issue)
- Experimentation function called in eager phase with `await`

**Report:**
- ✅ Integration found: separate loader file (`experiment-loader.js`)
- ✅ Integration found: inline in scripts.js
- ⚠️ Partial integration: [what's missing]
- ❌ No integration found

---

### Check 3: head.html modulepreload (CONDITIONAL)

**This check only applies if a separate loader file is used (Pattern A).**

If the project uses inline experimentation in scripts.js, skip this check.

Check for:
```html
<link rel="modulepreload" href="/scripts/[loader-filename].js" />
```

**Report:**
- ✅ modulepreload present
- ❌ modulepreload missing (offer to add)
- ⏭️ Skipped (experimentation is inline in scripts.js)

---

### Check 4: Loader File Drift (CONDITIONAL)

**This check only applies if a separate loader file is used (Pattern A).**

Scan the project's loader file for known anti-patterns. Do NOT do an exact character-by-character diff against a reference — variations in formatting, indentation, eslint comments, JSDoc wording, trailing commas, and import line-splitting are all acceptable. Focus only on detecting the specific issues below.

**Known anti-patterns to check for:**

**4a. Orphaned statements outside functions**
Look for executable expressions at the module's top level that are not part of a `const`/`let`/`var` declaration or function. A common bug is a duplicate line from `isExperimentationEnabled` leaking outside the arrow function:
```js
// BUG: this line executes on module load with no effect
[...document.querySelectorAll('.section-metadata div')].some((d) => d.textContent.match(/Experiment|Campaign|Audience/i));
```
**Action:** Flag as bug, offer to remove.

**4b. `isProd` guard in `showExperimentationRail`**
Look for a custom `isProd` function and a guard like `if (isProd(config)) return null;` inside `showExperimentationRail`. This is an **intentional performance optimization** commonly added by developers familiar with the plugin internals — it skips loading the lazy module on prod since the rail UI isn't needed there. **Do NOT flag this as an issue.** If it exists, keep it. If it doesn't exist, note its absence in the recommendations section (see below) but do not treat it as a problem.
**Action:** Report presence. If missing, suggest adding it as an optional optimization (see Recommendations).

**4c. Sidekick handler and imports referencing missing files**

The `showExperimentationRail` function may include a **sidekick handler** block that loads `tools/sidekick/aem-experimentation.js`. This handler integrates the experimentation plugin with the AEM Sidekick and is **only relevant for document-based authoring** repos. Repos that don't use document-based authoring don't need the handler or the file.

```js
// Sidekick handler block (document-based authoring only)
const loadSidekickHandler = () => import('../tools/sidekick/aem-experimentation.js');
if (document.querySelector('helix-sidekick, aem-sidekick')) {
  await loadSidekickHandler();
} else {
  await new Promise((resolve) => {
    document.addEventListener('sidekick-ready', () => {
      loadSidekickHandler().then(resolve);
    }, { once: true });
  });
}
```

**Check logic:**
1. Look for `import(...)` calls to files outside the plugin directory.
2. For each, verify the target file exists in the repo.
3. If the sidekick handler block is present but the file is missing, **prompt the user:**

> "The loader imports `tools/sidekick/aem-experimentation.js` but the file is missing.
> This handler is for document-based authoring repos. Does this repo use document-based authoring?
> 1. Yes — flag the missing file (needs to be created)
> 2. No — remove the sidekick handler block from the loader"

**Action:**
- If the imported file exists → no issue
- If the sidekick handler is present + file missing → prompt user about document-based authoring (see above). If yes, create the file from the boilerplate: https://github.com/adobe/aem-experimentation-boilerplate/blob/main/tools/sidekick/aem-experimentation.js
- If the sidekick handler is absent → prompt the user to ask if the repo uses document-based authoring before suggesting (see Recommendations)
- If an import path doesn't match any known pattern and the file doesn't exist → flag as dead code, ask the user before removing.

**4d. Missing required functions**
The loader must export both an eager function (`runExperimentation` or similar) and a lazy function (`showExperimentationRail` or similar). If either is absent, the integration is incomplete. Note: some repos intentionally only include the eager function if they don't use the experimentation rail — check if `scripts.js` calls both before flagging.
**Action:** Flag as incomplete only if `scripts.js` imports/calls the missing function.

**What NOT to flag:**
- Formatting, indentation, whitespace differences
- `eslint-disable` comments (present or absent)
- JSDoc wording variations
- Trailing comma differences
- Import path line-splitting (`import(\n  '...')` vs `import('...')`)
- Extra helper functions that don't change the core eager/lazy flow

**Report as a table:**
```
| # | Pattern | Found? | Recommendation |
|---|---------|--------|----------------|
| 4a | Orphaned statements | Yes/No | ... |
| 4b | isProd guard | Present/Absent | (informational — not an issue either way) |
| 4c | Missing imported files | Yes/No | ... |
| 4d | Missing functions | Yes/No | ... |
```

**Report summary:**
- ✅ No known anti-patterns found
- ⚠️ Found [N] issue(s) — offer to fix

---

### Check 5: RUM Sampling Rate (OPTIONAL)

**PROMPT USER:**
> "Check for RUM sampling rate configuration?
> (Increases sampling for experiment pages from 1-in-100 to 1-in-10)
> 1. Yes - check for it
> 2. No - skip this check"

If yes, look in head.html for:
```html
<script>
  window.RUM_SAMPLING_RATE = ...
</script>
```

**Report:**
- ✅ Configured
- ℹ️ Not configured (optional)
- ⏭️ Skipped by user

---

### Summary Report

```
## Experimentation Setup Status

| Step | Status | Details |
|------|--------|---------|
| Plugin directory | ✅/❌ | ... |
| Integration | ✅/⚠️/❌ | [loader file / inline] |
| head.html preload | ✅/❌/⏭️ | ... |
| Loader file drift | ✅/⚠️/⏭️ | ... |
| RUM sampling | ✅/ℹ️/⏭️ | ... |

Overall: [COMPLETE / NEEDS FIXES]
```

---

## Install Mode (`install`)

### Step 1: Check Current State

Before installing, check what already exists.

### Step 2: Git Subtree Add (REQUIRED if plugin missing)

Only if `plugins/experimentation` does NOT exist:

```bash
git subtree add --squash --prefix plugins/experimentation https://github.com/adobe/aem-experimentation.git v2
```

If exists, suggest `update` instead.

---

### Step 3: Check for Existing Integration

**Check if experimentation logic already exists in scripts.js:**
- Look for imports from experimentation plugin
- Look for `loadEager` calls with experimentation config
- Look for `isExperimentationEnabled` or similar functions

**If inline integration already exists:**
- Report: "Experimentation logic found inline in scripts.js"
- Do NOT create experiment-loader.js
- Do NOT modify the existing pattern
- Skip to Step 6 (verification)

**If NO existing integration:**
- Proceed to Step 4 to create experiment-loader.js (preferred approach)

---

### Step 4: Create experiment-loader.js (PREFERRED)

**Only if no existing experimentation integration was found.**

Create `scripts/experiment-loader.js` with:
```js
/**
 * Checks if experimentation is enabled.
 * @returns {boolean} True if experimentation is enabled, false otherwise.
 */
const isExperimentationEnabled = () => document.head.querySelector('[name^="experiment"],[name^="campaign-"],[name^="audience-"],[property^="campaign:"],[property^="audience:"]')
  || [...document.querySelectorAll('.section-metadata div')].some((d) => d.textContent.match(/Experiment|Campaign|Audience/i));

/**
 * Loads the experimentation module (eager phase).
 * @param {Document} document The document object.
 * @param {Object} config The experimentation configuration.
 * @returns {Promise<void>} A promise that resolves when the experimentation module is loaded.
 */
export async function runExperimentation(document, config) {
  if (!isExperimentationEnabled()) {
    window.addEventListener('message', async (event) => {
      if (event.data?.type === 'hlx:experimentation-get-config') {
        event.source.postMessage({
          type: 'hlx:experimentation-config',
          config: { experiments: [], audiences: [], campaigns: [] },
          source: 'no-experiments',
        }, '*');
      }
    });
    return null;
  }

  try {
    const { loadEager } = await import('../plugins/experimentation/src/index.js');
    return loadEager(document, config);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load experimentation module (eager):', error);
    return null;
  }
}

/**
 * Loads the experimentation module (lazy phase).
 * @param {Document} document The document object.
 * @param {Object} config The experimentation configuration.
 * @returns {Promise<void>} A promise that resolves when the experimentation module is loaded.
 */
export async function showExperimentationRail(document, config) {
  if (!isExperimentationEnabled()) {
    return null;
  }

  try {
    const { loadLazy } = await import('../plugins/experimentation/src/index.js');
    await loadLazy(document, config);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load experimentation module (lazy):', error);
    return null;
  }
}
```

---

### Step 5: Update scripts.js and head.html

**Only if experiment-loader.js was created in Step 4.**

**5a. Update scripts.js:**

Add imports at the top:
```js
import {
  runExperimentation,
  showExperimentationRail,
} from './experiment-loader.js';
```

Add config (see Custom Options section below for all available options):
```js
const experimentationConfig = {
  prodHost: 'www.mysite.com',
  audiences: {
    mobile: () => window.innerWidth < 600,
    desktop: () => window.innerWidth >= 600,
    // define your custom audiences here as needed
  },
};
```

Add to `loadEager` function (early, before decoration):
```js
await runExperimentation(document, experimentationConfig);
```

Add to `loadLazy` function (at the end, after blocks are loaded):
```js
await showExperimentationRail(document, experimentationConfig);
```

**5c. Clean up unused code (if migrating from inline to loader):**

If the project previously had inline experimentation code, remove:
- The `pluginContext` object declaration (no longer needed with loader approach)
- Unused imports from `aem.js` (e.g., `toCamelCase`, `toClassName` if only used for experimentation)
- The old inline experimentation code blocks in `loadEager` and `loadLazy`
- Any duplicate `AUDIENCES` constant (use `experimentationConfig.audiences` instead)

**5b. Update head.html:**

Add modulepreload link:
```html
<link rel="modulepreload" href="/scripts/experiment-loader.js" />
```

Add after other preload/preconnect links, or before the first `<script>` tag.

---

### Step 6: RUM Sampling (OPTIONAL)

**PROMPT USER:**
> "Add RUM sampling rate configuration for experimentation pages?
> (Increases data collection from 1-in-100 to 1-in-10 on pages with experiments)
> 1. Yes
> 2. No - skip"

If yes, add to head.html before aem.js/scripts.js:
```html
<script>
  window.RUM_SAMPLING_RATE = document.head.querySelector('[name^="experiment"],[name^="campaign-"],[name^="audience-"]')
    || [...document.querySelectorAll('.section-metadata div')].some((d) => d.textContent.match(/Experiment|Campaign|Audience/i))
    ? 10
    : 100;
</script>
```

**Note:** Also verify that `aem.js` uses the `RUM_SAMPLING_RATE`. Look for:
```js
const weight = new URLSearchParams(window.location.search).get('rum') === 'on' ? 1 : defaultSamplingRate;
```

---

### Step 7: Final Verification

Run check mode to verify setup.

---

## Update Mode (`update`)

### Step 1: Verify Plugin Exists

If missing, suggest `install` instead.

### Step 2: Git Subtree Pull

```bash
git subtree pull --squash --prefix plugins/experimentation https://github.com/adobe/aem-experimentation.git v2
```

### Step 3: Check Integration (OPTIONAL)

**PROMPT USER:**
> "Check if integration files need updates based on new plugin version?
> 1. Yes - run checks
> 2. No - just update the plugin"

---

## Custom Options

The `experimentationConfig` object supports many options:

```js
const experimentationConfig = {
  // Prod environment detection (prod environments don't show pill overlay)
  prodHost: 'www.mysite.com',
  // Alternative: custom function for complex logic
  isProd: () => !window.location.hostname.endsWith('.hlx.page')
    && window.location.hostname !== 'localhost',

  // Storage type for persisting variant assignments between page views
  storage: window.sessionStorage,

  // Audiences
  audiences: {
    mobile: () => window.innerWidth < 600,
    desktop: () => window.innerWidth >= 600,
  },
  audiencesMetaTagPrefix: 'audience',
  audiencesQueryParameter: 'audience',

  // Campaigns
  campaignsMetaTagPrefix: 'campaign',
  campaignsQueryParameter: 'campaign',

  // Experiments
  experimentsMetaTagPrefix: 'experiment',
  experimentsQueryParameter: 'experiment',

  // Fragment redecoration (for custom block handling)
  decorationFunction: (el) => {
    buildBlock(el);
    decorateBlock(el);
  },
};
```

---

## Plugin Context (Inline Approach Only)

**Note:** When using the recommended `experiment-loader.js` approach, you do NOT need to manage `pluginContext` - it's handled internally by the loader.

The `pluginContext` is only needed if you're using the **inline approach** (calling `loadEager`/`loadLazy` directly from scripts.js):

```js
// Only needed for INLINE approach - NOT for loader approach
const pluginContext = {
  getAllMetadata,  // Get all metadata with a prefix
  getMetadata,     // Get a single metadata value
  loadCSS,         // Load a CSS file
  loadScript,      // Load a JS file
  sampleRUM,       // RUM sampling function
  toCamelCase,     // String utility
  toClassName,     // String utility
};

// Inline approach (requires pluginContext):
const { loadEager } = await import('../plugins/experimentation/src/index.js');
await loadEager(document, config, pluginContext);

// Loader approach (NO pluginContext needed):
await runExperimentation(document, config);
```

---

## Analytics Integration (OPTIONAL)

The plugin exposes data for analytics integration via:

**Events:**
```js
document.addEventListener('aem:experimentation', (event) => {
  const { type, experiment, variant, campaign, audience } = event.detail;
  // type is 'experiment', 'campaign', or 'audience'
});
```

**Global objects:**
```js
window.hlx.experiments  // Array of all experiments
window.hlx.audiences    // Array of all audiences
window.hlx.campaigns    // Array of all campaigns
window.hlx.experiment   // Legacy: single experiment (backward compatibility)
```

---

## Consent Management (OPTIONAL)

For GDPR/CCPA compliance, the plugin supports consent-based experimentation.

**Requiring consent for an experiment:** Add metadata:
| Metadata | Value |
|----------|-------|
| Experiment Requires Consent | true |

**Integrating with consent platforms:** Import consent functions:
```js
import { updateUserConsent, isUserConsentGiven } from '../plugins/experimentation/src/index.js';

// Call when user gives/revokes consent
updateUserConsent(true);  // or false
```

See the plugin README for OneTrust, Cookiebot, and custom consent platform examples.

---

## Plugin Internals

Understanding what the plugin does internally:

**Experience type priority:** The plugin processes in this order:
1. Campaigns (via `campaign` query param or `utm_campaign`)
2. Experiments (via `experiment` metadata)
3. Audiences (via `audience-*` metadata)

**Global state:** The plugin sets these globals:
- `window.hlx.experiment` - Current experiment config
- `window.hlx.campaign` - Current campaign config
- `window.hlx.audience` - Current audience config

**Body classes:** Added automatically:
- `experiment-{id}` and `variant-{name}` for experiments
- `campaign-{name}` for campaigns
- `audience-{name}` for audiences

**RUM checkpoints:** Tracks via `sampleRUM()`:
- `experiment` - source: experiment ID, target: variant name
- `campaign` - source: URL, target: campaign name
- `audiences` - source: URL, target: audience name(s)

**Bot detection:** Plugin skips all processing for bots (detected via user agent).

**Query parameter forcing:** For testing, use:
- `?experiment={id}/{variant}` - Force specific experiment variant
- `?campaign={name}` - Force specific campaign
- `?audience={name}` - Force specific audience

---

## Recommendations

After running checks, include a recommendations section if any optimizations could be suggested. These are NOT issues — they are optional improvements the user can choose to adopt.

### `isProd` Guard

The `isProd` guard is a performance optimization that skips loading the lazy experimentation module on production. It prevents unnecessary network requests and JS execution for the rail UI that won't be shown to end users anyway. This is typically added by developers with good knowledge of the plugin internals.

**If `isProd` already exists:** Keep it. Do not remove or flag it. It may be defined in:
- `experiment-loader.js` — as a standalone function guarding `showExperimentationRail`
- `scripts.js` — as part of inline experimentation logic
- `plugins/experimentation/src/index.js` — the plugin itself has internal prod detection via `prodHost`

**If `isProd` is absent and the project uses a separate loader file:** Suggest adding it as an optional optimization. The recommended placement is in `experiment-loader.js`, guarding `showExperimentationRail`:

```js
const isProd = (config) => {
  if (config?.prodHost) {
    return window.location.hostname === config.prodHost;
  }
  return !window.location.hostname.endsWith('hlx.page') && window.location.hostname !== 'localhost';
};

export async function showExperimentationRail(document, config) {
  if (!isExperimentationEnabled()) {
    return null;
  }

  if (isProd(config)) {
    return null;
  }

  // ... rest of lazy loading
}
```

**Prompt user:**
> "The loader file doesn't include an `isProd` guard. This is an optional performance optimization that skips loading the experimentation rail on production. Would you like to add it?"

### Sidekick Handler

The sidekick handler (`tools/sidekick/aem-experimentation.js`) integrates the experimentation plugin with the AEM Sidekick panel. **This is only relevant for document-based authoring repos.** Repos that use other authoring surfaces don't need this.

**Reference:** The canonical version of this file lives in the boilerplate repo:
https://github.com/adobe/aem-experimentation-boilerplate/blob/main/tools/sidekick/aem-experimentation.js

The file handles:
- Loading the AEM Experimentation MFE (`client.js`) from `experience.adobe.com`
- Toggling the experimentation panel via sidekick button click
- Auto-opening the panel when `?experiment=` query params are present
- Persisting panel state across page reloads
- Prod environment detection (disables itself on prod)

**If the sidekick handler block and file both exist:** Keep them. No action needed.

**If the sidekick handler block exists but the file is missing:** The repo likely supports document-based authoring but the file hasn't been created yet. Prompt the user to confirm (see check 4c). If confirmed, fetch the file from the boilerplate repo above.

**If the sidekick handler block is absent:** Do not assume the authoring surface based on repo contents. Always prompt the user.

**Prompt user (if absent):**
> "Does this repo use document-based authoring (Google Drive, SharePoint, or Dark Alley)?
> The sidekick experimentation handler is only needed for document-based authoring repos.
> 1. Yes — suggest adding sidekick integration
> 2. No — skip"

If yes, suggest adding both the handler block in the loader and the `aem-experimentation.js` file from the boilerplate.

---

## Notes

- Use `v2` branch for git subtree commands
- `prodHost` default value (`'www.mysite.com'`) is acceptable - do not flag as issue
- `audiences` config is optional - segmentation is not currently supported
- Function/import names vary between projects - detect actual usage, don't assume exact names
- Prefer creating `experiment-loader.js` for new installs, but respect existing inline patterns
- When uncertain about optional steps, prompt the user to decide
- If any step fails, report the error and continue with remaining steps
- The plugin has TWO phases: `loadEager` (run early) and `loadLazy` (run after blocks load)
- **Loader approach does NOT require pluginContext** - only inline approach needs it
- When migrating from inline to loader, clean up unused imports and pluginContext declaration
- **`isProd` guard is intentional** — if it exists, keep it. It's a known optimization added by experienced developers.
- **Boilerplate repo**: https://github.com/adobe/aem-experimentation-boilerplate — reference for `tools/sidekick/aem-experimentation.js` and other integration files
