# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## AI-Assisted Setup

This project includes assistant skills — prompt files that instruct AI coding assistants (Claude Code, Cursor, Copilot, Codex, etc.) how to perform common setup tasks.

### Experimentation Engine

Set up A/B testing, campaigns, and audience targeting powered by the [AEM Experimentation plugin](https://github.com/adobe/aem-experimentation):

- **Claude Code:** `/check-experimentation-engine [check|install|update]`
- **Other AI tools:** Ask your assistant to check/install/update the experimentation engine and reference `.claude/commands/check-experimentation-engine.md` for instructions.

The skill handles everything: adding the plugin, wiring it into your project, and validating the setup.

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
