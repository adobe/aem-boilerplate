# AGENTS.md

Edge Delivery Services. Read an existing block first. Omissions are visible in the repo or known.

## Get wrong
- `scripts/aem.js` is vendored. Never edit.
- Markup comes from the backend. `curl localhost:3000/path.plain.html` before assuming DOM.
- `buildAutoBlocks` rewrites content before your block runs.
- Authors omit and add cells. Decorate defensively.
- No build step; devDependencies only.
- Scope CSS to `.blockname`. `-wrapper`/`-container` belong to sections.
- Blocks never import each other.

## Outdated
- `fstab.yaml`, `helix-query.yaml`, `paths.json` are retired. Config lives at tools.aem.live.

## Forget
- `npx -y @adobe/aem-cli up` runs local code on previewed content.
- Merging `main` ships code. Content publishes separately.
- A PR without a `{branch}--{repo}--{owner}.aem.page/{path}` link is rejected.
- Everything committed is served publicly. Use `.hlxignore`.
- Docs: `curl -s https://www.aem.live/docpages-index.json | jq -r '.data[]|select(.content|test("KW";"i")).path'`
