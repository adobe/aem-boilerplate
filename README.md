# Listgroup Block and Query Builder Plugin
This block adds the ability to automatically create a list of pages using a helix site's index. In traditional AEM, it was possible to get a list of pages from the JCR with it's tree structure. Rather than using the Cards block to list out every page that you want, you can specify a filter to identify a set of pages to write out, along with what metadata properties to include in the HTML output.


In order to make building a filter easy, the Query Builder plugin has been added to the toolbar. This tool is built using [jQuery QueryBuilder](https://querybuilder.js.org/). One or more conditions may be specified. The dropdown list is populated from a helix index. In this case, I used [a sample index](https://main--latimk-sandbox--latimk.aem.live/tools/querybuilder/sample-index.json) included in this repo so the values never change. You can customize this plugin to point to your own index. 

<div class="flex-container"><!-- .element: style="display: flex; flex-direction: row;" -->
  <img src="/documentation/images/SimpleQuery.png" height="500" width="300" alt="Simple Query Example"><!-- .element: style="margin: 10px; padding: 20px;"-->
  <img src="/documentation/images/ComplexQuery.png" height="500" alt="Complex Query Example"><!-- .element: style="margin: 10px; padding: 20px;"-->
</div>

<p display="flex">
  <img src="/documentation/images/SimpleQuery.png" height="500" width="300" alt="Simple Query Example">
  <img src="/documentation/images/ComplexQuery.png" height="500" alt="Complex Query Example">
</p>

<figure>
  <img src="https://github.com/latimk/latimk-sandbox/blob/main/documentation/images/QueryBuilderInToolbar.png" width="400" alt="QueryBuilder Plugin in Tool Library">
  <figcaption>QueryBuilder Tool in the Sidekick</figcaption>
</figure>

<figure>
  <img src="https://github.com/latimk/latimk-sandbox/blob/main/documentation/images/QueryBuilderPropertiesDropdown.png" width="350" alt="QueryBuilder Properties Dropdown">
  <figcaption>Properties Dropdown populated from Index</figcaption>
</figure>


<figure>
  <img src="https://github.com/latimk/latimk-sandbox/blob/main/documentation/images/ListgroupBlock.png" width="400" alt="Query in Listgroup Block">
  <figcaption>Query Object in a Listgroup Block</figcaption>
</figure>


## Environments
- Preview: https://main--latimk-sandbox--latimk.aem.page/
- Live: https://main--latimk-sandbox--latimk.aem.live/

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)