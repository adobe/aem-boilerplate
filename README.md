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
npm test
```

## Run sass auto-compile and Helix Pages

```sh
npm run up
```

The above command will run `node sass-compile.js` in parallel with `hlx up` which will start your local Helix Pages development environment.

### Note on SASS usage and Helix Local Development

 The `npm run up` will parse the `styles` and `blocks` directory for any `.scss` files. Files that are found will be compiled to css and saved in the same location and name with a `.css` extension. It will then continue to watch for changes to `.scss` files and will compile to their associated CSS files on changes.

Examples: 
  - `{repo}/blocks/header/header.scss` will compile to `{repo}/blocks/header/header.css`
  - `{repo}/styles/style.scss` will compile to `{repo}/styles/styles.css`

As both `sass-compile.js` and `hlx up` are watching for changes, changes made to your sass files while using the `rpm run up` command will be reflected automatically in your localhost. 

Note that using only the `hlx up` command will not trigger updates on-change for sass files.

## Local development

1. Create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [helix-bot](https://github.com/apps/helix-bot) to the repository
1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Franklin Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
