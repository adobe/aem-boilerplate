# AEM Asset Selector for Franklin Authoring
Integration between AEM Asset Selector and AEM Franklin to make AEM assets available in Franklin site authoring.

# High level flow

[Link to Diagram Source](https://lucid.app/lucidchart/d6db1b7d-144f-4ac9-94a2-fce760ed2ca4/edit?viewport_loc=-368%2C-403%2C1899%2C1069%2C0_0&invitationId=inv_cd6848d0-dfc0-4be9-b0cb-3cae5a1ba757)

![High Level Flow](/resources/using-asset-selector-with-franklin.jpeg)

## Environments
- Preview: https://main--{repo}--{owner}.hlx.page/
- Live: https://main--{repo}--{owner}.hlx.live/

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [helix-bot](https://github.com/apps/helix-bot) to the repository
1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Franklin Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
