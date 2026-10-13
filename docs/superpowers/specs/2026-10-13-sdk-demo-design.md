# sdk-demo — DA library plugin design

## Purpose

A reference library plugin for developers learning the DA App SDK. It demonstrates
`actions.sendText`, `actions.sendHTML`, and `actions.getSelection`, individually and
as a read → transform → write round trip, with every call and result visible in a log.

**Audience:** developers. Clarity of the example code outranks visual polish.
**Context:** library plugin only (opened from the DA document editor's library panel).

## SDK facts this design relies on

Verified against `https://da.live/nx/utils/sdk.js` and
`adobe/da-live` `blocks/edit/da-library/da-library.js`:

- `sendText(text)` — fire-and-forget; editor inserts a text node via
  `replaceSelectionWith` (replaces current selection, or inserts at cursor).
- `sendHTML(html)` — fire-and-forget; editor parses with ProseMirror's `DOMParser`
  against its schema and `replaceRange`s the selection. Unsupported markup is dropped.
- `getSelection()` — returns a Promise resolving to the selection serialized as an
  HTML string.
  - On an empty selection, the editor posts `{ action: 'error' }` on the MessagePort,
    but the SDK listens on `window`, so the promise never settles.
  - The SDK's `window` listener removes itself on the first message of any kind, so a
    stray message can also leave it pending.
  - Consequence: the demo must apply its own timeout.

## Files

```
tools/
├── sdk-demo.html          # entry: imports sdk.js + sdk-demo.js; static markup; setup notes in an HTML comment
└── sdk-demo/
    ├── sdk-demo.js        # awaits DA_SDK; one commented function per SDK demo; log
    └── sdk-demo.css       # compact styles for the narrow library panel
```

Codebase URL: `https://main--da-base--demoamer275.aem.live/tools/sdk-demo.html`.
No `package.json` or dependency changes. Vanilla JS, no framework.

## UI (single column, top to bottom)

1. **Status line.** Starts as "Waiting for DA…" with all buttons disabled. When the SDK
   resolves it shows "Connected" with the org/repo/path from `context`. If the SDK has not
   resolved after 3s, it shows "Open this plugin from the DA editor library."
2. **sendText panel.**
   - Textarea, default `Hello from the SDK demo!`.
   - **Send text** button calls `actions.sendText(value)`.
   - Note: inserted as plain text (markup appears literally); replaces the selection.
3. **sendHTML panel.**
   - Textarea, default `<h2>Demo heading</h2><p>Some <strong>bold</strong> text.</p>`.
   - **Send HTML** button calls `actions.sendHTML(value)`.
   - Note: parsed into the editor schema; unsupported tags/attributes dropped; replaces the
     selection.
4. **getSelection panel.**
   - **Get selection** button awaits `actions.getSelection()`.
   - Shows the raw HTML string in a `<pre>`.
   - Also shows the plain text, derived via `new DOMParser().parseFromString(html,
     'text/html').body.textContent`. DOMParser documents are inert, so no scripts run and no
     images load. A detached element with `innerHTML` would still load images.
5. **Round-trip panel.** Disabled until a getSelection succeeds.
   - **UPPERCASE → sendText** calls `sendText(plainText.toUpperCase())`.
   - **Wrap in &lt;strong&gt; → sendHTML** calls `sendHTML(`<strong>${html}</strong>`)`.
   - Both replace the selection still held by the editor.
6. **Log.**
   - Timestamped entries:
     - `→ sendText(...)` and `→ sendHTML(...)` for outgoing calls
     - `← getSelection: ...` for results
     - `⚠ ...` for warnings
     - `✕ ...` for errors
   - A **Clear** button empties the log.

## Data flow

Button → demo function → `actions.*` → DA editor over the SDK MessagePort.
For getSelection: editor → `window` message → SDK resolves the promise → result panel + log.

## Error handling

- **Timeout.** `getSelection` is wrapped in `Promise.race` with a 3000 ms timeout.
  - On timeout, log: "No response — selection is probably empty (DA reports this on a
    channel the SDK doesn't listen to), or another message consumed the listener."
  - A code comment documents the quirk.
- **Rejection.** Caught and logged as `✕`.
- **Single call in flight.** The Get selection button stays disabled while a call is pending,
  because the SDK supports only one listener at a time.
- **Empty input.** Empty textareas don't call the SDK; they log a `⚠` instead.
- **Safe rendering.** All rendering uses `textContent`. Selection HTML is never injected
  into the plugin document; it is parsed only with the inert `DOMParser`.

## Out of scope

- `closeLibrary`, `setHref`, `setHash`, `setPrompt`, `showPanel`, `daFetch`, and
  fullscreen-app mode.
- Automated tests.

## Registration (content step, done by the user)

In `https://da.live/config#/demoamer275/da-base/`, add a row to the `library` sheet:

- `title`: `SDK Demo`
- `path`: `/tools/sdk-demo.html`

The path must be relative and keep `.html`.

- DA's `calculateSources` rewrites only paths that start with `/`. It resolves them to
  `https://{ref}--da-base--demoamer275.aem.live{path}`, where `{ref}` is the editor's
  `?ref=` value (default `main`). With `?ref=local` it resolves to
  `http://localhost:3000{path}`.
- Absolute URLs are used as-is and ignore `?ref`.
- aem.live returns 404 for code `.html` files requested without the extension.

## Verification

1. `npm run lint:js` passes. `npx stylelint "tools/**/*.css"` passes.
2. `npx -y @adobe/aem-cli up`: `http://localhost:3000/tools/sdk-demo.html` loads and shows the
   "open from DA" status after 3s.
3. Manual check in the DA editor (`?ref=local`), done by the user:
   - sendText inserts at the cursor and replaces a selection.
   - sendHTML inserts a heading and bold text.
   - getSelection returns HTML for a selection.
   - An empty selection gives a timeout warning after about 3s.
   - Both round-trip buttons replace the selection.
   - The log records every call.
