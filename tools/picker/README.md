# Sidekick Product Picker

## Overview
To facilitate adding commerce references in content authoring, we have created the product picker Sidekick plugin. You can use it to browse your product catalog and copy references and blocks into your documents.

## Setup
* In `index.js`:
    * Ensure you updated the references to your project's configuration files.
    * Update the block list to match the commerce blocks you're using in your project.
* Run `npm i` and `npm run build` to build the picker.
* Additionally you can run `npm run start` to test changes locally.
* Add the picker to the Sidekick by adjusting the `plugins` array in the `tools/sidekick/config.json` file or via the config API.
    ```json
    // Example
    {
        //...
        "plugins": [
            {
                "id": "cif",
                "title": "Commerce",
                "environments": [
                    "edit"
                ],
                "url": "https://main--aem-boilerplate-commerce--hlxsites.hlx.live/tools/picker/dist/index.html",
                "isPalette": true,
                "paletteRect": "top: 54px; left: 5px; bottom: 5px; width: 300px; height: calc(100% - 59px); border-radius: var(--hlx-sk-button-border-radius); overflow: hidden; resize: horizontal;"
            }
        ]
    }
    ```

## Usage
* Open any document of your project in SharePoint or Google Docs.
* Open the Sidekick.
* Click the Commerce button to open the picker.
* You can select a config by pressing the settings button and select one. Using your production config is recommended in most cases.
* Select a block in the dropdown field which you want to insert into your document.
* Use the picker to navigate to the category/categories or product(s) which should be used by the block.
* If the block requires multiple references, tick checkboxes of all items you want to select. Then click the copy icon next to the dropdown field.
* If the block requires only a single reference, you can directly click the copy icon next to the item.
* Use Ctrl/Cmd + V to paste the copied block into your document.
* You can close the picker by clicking on the Commerce button again.