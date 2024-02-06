# AEM References Check Sidekick Plugin

![alt text](image.png)

This block is used by the references sidekick plugin to check for page references (forms, fragments, links, etc.). Injecting it into the page is based on the sidekick event model, see [`initSidekick`](../../scripts/scripts.js#L197) in `script.js`.

## How it Works

Forms and fragments are discovered based on data attributes, which are rendered by those respective blocks. You may need to update the form/fragment blocks in your project this to work. Links are discovered using a domain check, so any link in the DOM to hlx.page, hlx.live, or a production domain, will be included. This logic is included in [`utils.js`](../../scripts/utils.js#L37)

Once a reference is discovered, an admin api call is triggerred to get it's edit link and publish status. In addition, for fragment and incoming references, the document is fetched to get it's title.

### Incoming References

Finding incoming references relies on the presence of a query index. Each path in the index is fetched and then parsed for any links to the current page. This process is slow for sites with a non-trivial number of pages, hence why it requires the user to initiate it sepearately from the plugin.