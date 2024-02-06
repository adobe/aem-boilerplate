# AEM References Check Sidekick Plugin

This block is used by the references sidekick plugin to check for page references (forms, fragments, links, etc.). Injecting it into the page is based on the sidekick event model, see [`initSidekick`](../../scripts/scripts.js#L192) in `script.js`.

## How it Works

Forms and fragments are discovered based on data attributes, which are rendered by those respective blocks. You may need to update the form/fragment blocks in your project to comply with this requirement.

Links are simply discovered by the fact they are relative (starts with `/`). If your project doesn't rewrite all local links to be relative, you may want to modify this logic to fit your needs.

Once a reference is discovered, and an admin api call is triggerred to get it's edit link and publish status. In addition, for fragment and link references, the document is fetch to get it's title.

### Incoming References

Finding incoming references relies on the presence of a query index. Each path in the index is fetched and then parsed for any links to the current page. This process is slow for sites with a non-trivial number of pages, hence why it requires the user to initiate it sepearately from the plugin.