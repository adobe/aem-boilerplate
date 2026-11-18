# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--{repo}--{owner}.aem.page/
- Live: https://main--{repo}--{owner}.aem.live/

## Documentation

Before using the aem-boilerplate, we recommend you to go through the documentation on https://www.aem.live/docs/ and more specifically:
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

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)

## Optional MarTech integration

This starter preserves the existing EDS loaders, blocks and styles, and adds the
[AEM MarTech plugin](https://github.com/adobe-rnd/aem-martech) for tracking and personalization.
If this integration is not needed, [Adobe's official boilerplate](https://github.com/adobe/aem-boilerplate)
is the recommended starting point. For an implementation overview, see the
[Adobe tutorial](https://experienceleague.adobe.com/en/docs/platform-learn/tutorial-one-adobe/assetmgmt/assetm1/ex5).
Confirm the R&D/co-innovation plugin's production suitability with your Adobe team.

### Capabilities and setup

Included: self-hosted Web SDK (`alloy`), Adobe Client Data Layer (`adobeDataLayer`),
page views/custom events, Target/AJO DOM and HTML offers, and OneTrust consent mapping.
Activities, schemas, identity/CRM mappings and JSON-offer rendering remain project-specific.
No build step, runtime npm dependencies or custom test suite are added.

1. Create a project from this starter's `main` branch and connect its content and AEM Code Sync.
2. Replace placeholders in [scripts/env-config.js](scripts/env-config.js) for **both** environments:

   | Setting | Source |
   | --- | --- |
   | `datastreamId` | [Experience Platform](https://platform.adobe.com/) > Datastreams > correct sandbox. Enable the required Analytics, Target/AJO and/or AEP services. |
   | `orgId` | The datastream's Adobe IMS organization ID, ending in `@AdobeOrg`. |
   | `launchUrl` | [Data Collection](https://experience.adobe.com/#/data-collection/) > Tags > Environments > Install. Copy only the HTTPS `assets.adobedtm.com` URL ending in `.min.js`. |
   | `oneTrustDomainId` | OneTrust's `data-domain-script` value; use its test ID for non-production and register preview/custom hosts. |

3. Map `oneTrustCategories` (`collect`, `marketing`, `personalize`, `share`) to the property's
   approved category IDs. Do not assume category numbers or equate banner readiness with consent.
   An existing OneTrust instance is reused; avoid duplicate embeds.
4. In Tags, configure Web SDK extension **v2.34.0+** to **use a self-hosted alloy.js instance**
   named `alloy`; install ACDL using `adobeDataLayer`. Publish the matching library.
   Avoid duplicate SDK/page-view rules and ensure all tags honor consent and withdrawal.

**Routing:** `main--{repo}--{owner}.aem.live` and exact custom hosts in `productionHosts`
use `prod`. All `.aem.page` previews, other branches and unlisted hosts use `nonProd`.
Enter custom hostnames without schemes, paths or wildcards. Configuration is browser-readable;
there is no `.env` loading. Missing/invalid values leave MarTech inactive with a console error.
Normal EDS rendering continues; the SDK, OneTrust and Launch are not loaded.

### Consent and personalization

- SDK consent defaults to `pending`. Collection consent starts the SDK/data layer and automatic
  page view; no additional page-view code or `target` metadata is required.
- Launch waits for the 3-second delayed phase **and** collection + marketing consent.
  [OneTrust events](https://developer.onetrust.com/onetrust/docs/javascript-events-guide)
  update SDK consent. Already loaded tags must enforce subsequent choices themselves.
  Additional [consented scripts](scripts/consented.js) must check their required categories;
  the old `?consent=accept` bypass is not supported.
- For personalization, author page Metadata `target` = `true` and configure the activity/offer.
  Collection + personalization consent must resolve during the bounded 1-second CMP startup
  window; otherwise default content remains and eligibility is checked on the next navigation/reload.
  Offers time out after 2500 ms and are not applied late.
- HTML offers can use Section Metadata `mbox` (comma-separated scopes) and `mbox-action`
  (`setHtml`, `replaceHtml`, `appendHtml`). Requests include `__view__` and
  `{hostname}:landing:{pathname}`. Raw injected blocks are decorated; already-decorated
  interactive offers need a `registerBlockRebind` handler via a shared helper under `scripts/`.

### Validate and maintain

Run `npm run lint`. Before launch, check normal rendering with placeholders, denied/accepted/
withdrawn consent, one page view per load, custom events, environment routing, offers and
[Core Web Vitals](https://www.aem.live/developer/keeping-it-100). Validate delivery in the
configured Adobe services; IDs alone do not provision them or override consent.
Keep temporary tests/fixtures outside this repository: GitHub templates copy committed files;
`.hlxignore` only controls what EDS serves.

For occasional Adobe boilerplate updates, start with a clean worktree:

```sh
# Add this remote once, if absent.
git remote add upstream https://github.com/adobe/aem-boilerplate.git
git fetch upstream
git switch -c maintenance/boilerplate-update
git merge upstream/main
```

Review conflicts, preserve configuration/consent hooks, validate, and open a PR with a
`{branch}--{repo}--{owner}.aem.page/{path}` preview link. Merging `main` ships code;
content publishes separately. Downstream projects can similarly track this starter
through a separate remote. Merge only with shared ancestry; template-generated repositories
have unrelated history, so port reviewed changes or cherry-pick compatible commits instead.

Plugin updates are separate: this customized [Apache-2.0](plugins/martech/LICENSE) runtime
snapshot (`2193934d11ed071b6fc0e4d539d788aef16b2454`, originally based on upstream
`1aa3dee3c4791636efa9ad2994342f861c8e149b`) includes HTML-offer/scope/rebind enhancements.
Compare against [upstream](https://github.com/adobe-rnd/aem-martech) before replacing files
and revalidate consent, tracking, offers and CSP. This repository has no plugin subtree
history; do not use `git subtree pull`.

### Public and private projects

Keep this public starter's identifiers masked. Never commit secrets, tokens, cookies,
visitor data or confidential assets; use an approved backend/secret manager for secrets.
Client-side IDs/URLs remain visible to visitors, even with a private Git repository.
`.env` ignore rules do not protect tracked files/history; review changes and rotate exposed
credentials. See [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning).

Before adding confidential material, create a **private** project using
[Use this template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template),
or [clone and push](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository)
the approved starter history to an empty private repository rather than making a public fork.
Public forks cannot simply be made private. Cloning preserves ancestry; templates do not.
Authorize AEM Code Sync for the new repository. Repository privacy does not restrict the
deployed website: configure website access separately using the [EDS documentation](https://www.aem.live/docs/).
