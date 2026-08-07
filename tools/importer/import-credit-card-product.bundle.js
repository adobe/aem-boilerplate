/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-credit-card-product.js
  var import_credit_card_product_exports = {};
  __export(import_credit_card_product_exports, {
    default: () => import_credit_card_product_default
  });

  // tools/importer/parsers/hero-eterna.js
  function parse(element, { document }) {
    const link = element.querySelector("a[href]");
    const img = element.querySelector("img");
    if (!img) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const backgroundContent = link && link.contains(img) ? link : img;
    const cells = [];
    cells.push([backgroundContent]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-eterna", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-benefit.js
  function parse2(element, { document }) {
    const sectionHeading = element.querySelector("h2");
    let items = Array.from(element.querySelectorAll("li")).filter((li) => !li.closest(".slick-cloned"));
    const seen = /* @__PURE__ */ new Set();
    items = items.filter((li) => {
      var _a;
      const title = (((_a = li.querySelector("h3")) == null ? void 0 : _a.textContent) || "").trim().toLowerCase();
      const key = title || li.textContent.trim().slice(0, 60).toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const cells = [];
    items.forEach((li) => {
      const img = li.querySelector(".img-wrap img, img");
      const content = [];
      const title = li.querySelector("h3");
      if (title) content.push(title);
      li.querySelectorAll("p").forEach((p) => {
        if (p.textContent.trim()) content.push(p);
      });
      li.querySelectorAll(":scope a[href]").forEach((a) => {
        if (!content.includes(a) && !content.some((el) => el.contains && el.contains(a))) {
          content.push(a);
        }
      });
      if (img || content.length) {
        cells.push([img || "", content.length ? content : ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-benefit", cells });
    const replacements = [];
    if (sectionHeading) replacements.push(sectionHeading);
    replacements.push(block);
    element.replaceWith(...replacements);
  }

  // tools/importer/parsers/columns-product.js
  function parse3(element, { document }) {
    const row = element.querySelector(".row");
    let columns = row ? Array.from(row.children) : Array.from(element.querySelectorAll(".wrapper > *"));
    const cells = [];
    const rowCells = [];
    columns.forEach((col) => {
      const cellContent = [];
      const img = col.querySelector("img");
      if (img && col.children.length === 1 && col.firstElementChild === img) {
        cellContent.push(img);
      } else {
        Array.from(col.children).forEach((child) => {
          if (child.textContent.trim() || child.querySelector("img, a")) {
            cellContent.push(child);
          }
        });
        if (!cellContent.length && img) cellContent.push(img);
      }
      if (cellContent.length) rowCells.push(cellContent.length === 1 ? cellContent[0] : cellContent);
    });
    if (!rowCells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    cells.push(rowCells);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-additional.js
  function parse4(element, { document }) {
    const sectionHeading = element.querySelector("h2");
    const disclaimer = element.querySelector(".disclaimer_descrip");
    let items = Array.from(element.querySelectorAll("li")).filter((li) => !li.closest(".slick-cloned"));
    const seen = /* @__PURE__ */ new Set();
    items = items.filter((li) => {
      var _a;
      const title = (((_a = li.querySelector("h3")) == null ? void 0 : _a.textContent) || "").trim().toLowerCase();
      const key = title || li.textContent.trim().slice(0, 60).toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const cells = [];
    items.forEach((li) => {
      const img = li.querySelector(".img-wrap img, img");
      const content = [];
      const title = li.querySelector("h3");
      if (title) content.push(title);
      li.querySelectorAll("p").forEach((p) => {
        if (p.textContent.trim()) content.push(p);
      });
      li.querySelectorAll(":scope a[href]").forEach((a) => {
        if (!content.some((el) => el === a || el.contains && el.contains(a))) {
          content.push(a);
        }
      });
      if (img || content.length) {
        cells.push([img || "", content.length ? content : ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-additional", cells });
    const replacements = [];
    if (sectionHeading) replacements.push(sectionHeading);
    replacements.push(block);
    if (disclaimer) replacements.push(disclaimer);
    element.replaceWith(...replacements);
  }

  // tools/importer/parsers/cards-steps.js
  function parse5(element, { document }) {
    const sectionHeading = element.querySelector("h2");
    const intro = element.querySelector(":scope > .container > .wrapper > p, .wrapper > p");
    const steps = Array.from(element.querySelectorAll(".pointers > div"));
    const cells = [];
    steps.forEach((step) => {
      const contentCell = [];
      const number = step.querySelector("h3");
      if (number && number.textContent.trim()) contentCell.push(number);
      const title = step.querySelector("h4");
      if (title) contentCell.push(title);
      step.querySelectorAll(".step-wrap p, p").forEach((p) => {
        if (p.textContent.trim() && !contentCell.includes(p)) contentCell.push(p);
      });
      step.querySelectorAll("a[href]").forEach((a) => {
        if (!contentCell.some((el) => el === a || el.contains && el.contains(a))) {
          contentCell.push(a);
        }
      });
      if (contentCell.length) {
        cells.push([contentCell]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-steps", cells });
    const replacements = [];
    if (sectionHeading) replacements.push(sectionHeading);
    if (intro) replacements.push(intro);
    replacements.push(block);
    element.replaceWith(...replacements);
  }

  // tools/importer/parsers/hero-cta.js
  function parse6(element, { document }) {
    const wrapper = element.querySelector(".wrapper") || element;
    let bgImage = element.querySelector("img");
    if (!bgImage) {
      let bgUrl = "";
      for (const node of [wrapper, element]) {
        const style = node.getAttribute && node.getAttribute("style");
        const match = style && style.match(/url\((['"]?)([^'")]+)\1\)/i);
        if (match) {
          bgUrl = match[2];
          break;
        }
      }
      if (bgUrl) {
        bgImage = document.createElement("img");
        bgImage.src = bgUrl;
        const heading2 = element.querySelector("h1, h2, h3");
        bgImage.alt = heading2 ? heading2.textContent.trim() : "";
      }
    }
    const contentCell = [];
    const heading = element.querySelector("h1, h2, h3");
    if (heading) contentCell.push(heading);
    const paragraphs = Array.from(element.querySelectorAll("p")).filter((p) => p.textContent.trim() && !p.querySelector("p"));
    paragraphs.forEach((p) => contentCell.push(p));
    const note = element.querySelector(".blinking-text");
    if (note && note.textContent.trim()) contentCell.push(note);
    const cta = element.querySelector("a[href]");
    if (cta && !contentCell.some((el) => el === cta || el.contains && el.contains(cta))) {
      contentCell.push(cta);
    }
    if (!bgImage && !contentCell.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    if (contentCell.length) cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse7(element, { document }) {
    const sectionHeading = element.querySelector("h3");
    const viewMore = element.querySelector(".moreBtnBox");
    const items = Array.from(element.querySelectorAll(".accordion-item"));
    const cells = [];
    items.forEach((item) => {
      const question = item.querySelector(".accordion-header, h2, h3, h4");
      const answer = item.querySelector(".accordionContentBox") || item.querySelector(".accordion-content") || item.querySelector(":scope > div:last-child");
      if (question || answer) {
        cells.push([question || "", answer || ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    const replacements = [];
    if (sectionHeading) replacements.push(sectionHeading);
    replacements.push(block);
    if (viewMore) replacements.push(viewMore);
    element.replaceWith(...replacements);
  }

  // tools/importer/transformers/bobcard-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".Headerwrapp",
        // global header wrapper (contains <header>, <nav>, mobile menu, search)
        "footer",
        // global site footer
        "next-route-announcer",
        // Next.js route-change a11y live region
        ".progress-wrap"
        // scroll progress / back-to-top widget
      ]);
    }
  }

  // tools/importer/transformers/bobcard-sections.js
  var TransformHook2 = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform2(hookName, element, payload) {
    if (hookName !== TransformHook2.afterTransform) return;
    const template = payload && payload.template;
    const sections = template && Array.isArray(template.sections) ? template.sections : [];
    if (sections.length < 2) return;
    const doc = payload && payload.document || element.ownerDocument;
    const resolved = sections.map((section) => {
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector].filter(Boolean);
      let el = null;
      for (const sel of selectors) {
        if (!sel) continue;
        el = element.querySelector(sel);
        if (el) break;
      }
      return { section, el };
    });
    for (let i = resolved.length - 1; i >= 0; i -= 1) {
      const { section, el } = resolved[i];
      if (!el) continue;
      if (section.style) {
        const smBlock = WebImporter.Blocks.createBlock(doc, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        el.insertAdjacentElement("afterend", smBlock);
      }
      if (i > 0) {
        const hr = doc.createElement("hr");
        el.insertAdjacentElement("beforebegin", hr);
      }
    }
  }

  // tools/importer/import-credit-card-product.js
  var PAGE_TEMPLATE = {
    name: "credit-card-product",
    description: "Credit card product detail page with hero banner, card benefits, additional benefits carousel, application guidelines, and FAQ sections",
    urls: [
      "https://www.bobcard.co.in/credit-card-types/eterna"
    ],
    blocks: [
      {
        name: "hero-eterna",
        instances: [".CardBannersWrapp article.card_banner", "article.card_banner"]
      },
      {
        name: "cards-benefit",
        instances: [".CardBenefitesWrapp article.benefit-eterna"]
      },
      {
        name: "columns-product",
        instances: ["article.feature-benefit"]
      },
      {
        name: "cards-additional",
        instances: ["article.benefit-eterna.additional-benefit"]
      },
      {
        name: "cards-steps",
        instances: ["article.document-req"]
      },
      {
        name: "hero-cta",
        instances: ["article.transaction-banner"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-pg article.faq-wrapper", "article.faq-wrapper"]
      }
    ],
    sections: [
      {
        id: "rc1",
        name: "Hero Banner",
        selector: [".CardBannersWrapp"],
        style: null,
        blocks: ["hero-eterna"],
        defaultContent: []
      },
      {
        id: "rc2",
        name: "Page Heading",
        selector: ["h1.headingtext_headingH1Text__XffKe"],
        style: null,
        blocks: [],
        defaultContent: ["h1.headingtext_headingH1Text__XffKe"]
      },
      {
        id: "rc3",
        name: "Card Benefits",
        selector: [".CardBenefitesWrapp"],
        style: "light-grey",
        blocks: ["cards-benefit"],
        defaultContent: [".CardBenefitesWrapp article.benefit-eterna h2"]
      },
      {
        id: "rc4",
        name: "Additional Benefits",
        selector: [".AdditionalBenefitsWrapp"],
        style: null,
        blocks: ["columns-product", "cards-additional"],
        defaultContent: ["article.benefit-eterna.additional-benefit h2", ".disclaimer_descrip"]
      },
      {
        id: "rc5",
        name: "Application Guidelines",
        selector: [".ApplicationGuidelinesWrapp"],
        style: null,
        blocks: ["cards-steps", "hero-cta"],
        defaultContent: ["article.document-req h2", "article.document-req > .container > .wrapper > p"]
      },
      {
        id: "rc6",
        name: "FAQ",
        selector: [".faq-pg.rupayFaq"],
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: ["article.faq-wrapper h3", ".moreBtnBox"]
      }
    ]
  };
  var parsers = {
    "hero-eterna": parse,
    "cards-benefit": parse2,
    "columns-product": parse3,
    "cards-additional": parse4,
    "cards-steps": parse5,
    "hero-cta": parse6,
    "accordion-faq": parse7
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    const seen = /* @__PURE__ */ new Set();
    template.blocks.forEach((blockDef) => {
      let matched = false;
      blockDef.instances.forEach((selector) => {
        if (matched) return;
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;
        elements.forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
        matched = true;
      });
      if (!matched) {
        console.warn(`Block "${blockDef.name}" not found with any selector: ${blockDef.instances.join(", ")}`);
      }
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_credit_card_product_default = {
    transform: (payload) => {
      const {
        document,
        url,
        html,
        params
      } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_credit_card_product_exports);
})();
