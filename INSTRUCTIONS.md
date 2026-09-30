# Instructions

## Block mapping

Rules of precedence:

1. If an equivalent block already exists in `da-base/blocks`, **reuse it** (adjust with a block variant/CSS class rather than forking).
2. If no equivalent exists, **do not create the block automatically — ask for approval first.** Propose the new block (name, purpose, source pattern it covers) and wait for sign‑off. Once approved, create it in the repo `/blocks` directory following EDS conventions, and record it in the "New blocks to build" list below.
3. Prefer **auto‑blocking** for repeated structural patterns (e.g., turning a metadata‑driven hero into a block) over hand‑authoring where the source pattern is consistent.

### New blocks to build

## Page migration

### Language paths

If the source pages do not have a language designation in their paths (for example, `/en/` or `/en-us/`), migrate the site's root into a folder called `en` and place its pages beneath it. For example, `/` becomes `/en/` and `/about` becomes `/en/about`. This structure makes it easier to translate the site in the future.

If the source pages already have a language designation in their paths, preserve and use that existing designation instead of adding an `en` folder.

### Capturing section styling with `section-metadata`

Split each source page into sections wherever its visual treatment changes: a new background, a change in width or column count, or a change in spacing. Each section becomes a block of content between section breaks (`---`) in the migrated document. Capture that section's styling in a `section-metadata` block placed **inside that same section**. The block removes itself at runtime and applies its settings to the section around it.

`section-metadata` is a two-column table: the key on the left, the value on the right.

| Section Metadata | |
|---|---|
| Style | highlight, center |
| Background | #00A36C |
| Grid | 3 |
| Gap | l |
| Spacing | xxl |

For each section you identify, record:

1. **Background colour.** Take the source's computed `background-color` and put it in `Background`. Any CSS colour works: hex, `rgb()`, or `light-dark(...)`. A light or dark text scheme (`light-scheme` / `dark-scheme`) is picked automatically from the colour's brightness.
   - `color-token-<name>` maps to `var(--color-<name>)`. This project does not define any `--color-*` variables yet, so use a literal colour until the token exists.
2. **Background image.** Import the image with the page's media, then put it (or its URL) in `Background`. The value must start with `https://`, `/` or `./`. It is rendered as a lazy-loaded, full-bleed `picture.section-background` behind the content.
   - A brightness scheme is **not** detected for images. If the image is dark, add `dark-scheme` to `Style` so the text stays readable.
   - Video URLs (`.mp4`) are ignored.
   - Add `peek-background` to `Style` to keep the image visible below the content on desktop.
3. **Layout.**

   | Key | Values | Effect |
   |---|---|---|
   | `Grid` | `2`–`6` | Places the section's blocks in that many columns |
   | `Container` | `2`, `4`, `6` | Constrains the content width |
   | `Layout` | `bento` | Bento grid for up to five blocks |
   | `Gap` | `xs`, `s`, `m`, `l`, `xl`, `xxl` | Space between blocks in a grid, container or layout |
   | `Spacing` | `xs`, `s`, `m`, `l`, `xl`, `xxl` | Top and bottom padding of the section |

   `0` or an empty value skips the key.
4. **Style.** A comma-separated list of class names added to the section, for example `highlight`, `center` or `dark-scheme`. Reuse existing classes before adding new ones (see [Block mapping](#block-mapping)); a new style needs matching CSS in `blocks/section-metadata/section-metadata.css`.
5. **Anything else.** Any other key becomes a `data-` attribute on the section (`Max Width` becomes `data-max-width`) for CSS or block code to use. It has no effect on its own.

Sections can also arrive with these settings already on them as `data-` attributes (for example `data-background`, `data-grid`). `scripts/section.js` applies those the same way, including in fragments, so do not duplicate them in a `section-metadata` block.