# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--{repo}--{owner}.hlx.page/
- Live: https://main--{repo}--{owner}.hlx.live/

## Installation

```sh
npm i
```

## Tests

```sh
npm tst
```

## Cloud development

1. Click "Use this template" and create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
2. Click "Code" and create a new codespace from your new repository
3. Start Franklin Proxy: `hlx up` (opens your browser at `http://localhost:3000` or a proxied version)
4. Start coding, your browser is your IDE now.

## Local development

1. Create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [helix-bot](https://github.com/apps/helix-bot) to the repository
1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Franklin Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
