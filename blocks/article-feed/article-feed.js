import { getConfig } from '../../scripts/nx.js';
import createPicture from '../../scripts/utils/picture.js';

const QUERY_PATH = '/en/blog/query-index.json';
const AUTHOR_PATH = '/en/author/query-index.json';

let fetchingAuthors;

function calculateExcelDate(excelDate) {
  // Excel's date system starts on January 1, 1900
  // JavaScript's Date counts from January 1, 1970
  // Excel has a leap year bug where it incorrectly includes February 29, 1900
  // So we need to adjust for dates after February 28, 1900

  // Convert Excel date to JavaScript date
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const excelEpoch = new Date(1899, 11, 30);

  // Create a new date by adding the Excel serial number of days
  const jsDate = new Date(excelEpoch.getTime() + excelDate * millisecondsPerDay);

  // Format the date as "Apr 4, 2025"
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return jsDate.toLocaleDateString('en-US', options);
}

function fetchAuthors() {
  fetchingAuthors = new Promise((resolve) => {
    fetch(AUTHOR_PATH).then(async (resp) => {
      if (resp.ok) {
        const json = await resp.json();
        resolve(json.data);
      }
    });
  });
}

async function getAuthorLink(el) {
  const authors = await fetchingAuthors;
  const found = authors.find(
    (author) => author.title.replace('Author: ', '') === el.innerText,
  );
  if (!found) return;
  el.href = found.path;
}

function createArticleLink(item, className, child) {
  const link = document.createElement('a');
  link.className = className;
  link.href = item.path;
  link.title = item.title;
  link.append(child);
  return link;
}

function createAuthorEl(item) {
  const wrapper = document.createElement('div');
  wrapper.className = 'article-feed-article-author-wrapper';
  const authors = item.author.split(' | ');
  authors.forEach((author) => {
    const authorEl = document.createElement('a');
    authorEl.className = 'article-feed-article-author';
    authorEl.innerText = author;
    authorEl.href = '#';
    getAuthorLink(authorEl);
    wrapper.append(authorEl);
  });
  return wrapper;
}

function decorateFeed(data, opts) {
  const ul = document.createElement('ul');
  ul.className = 'article-feed-list';
  data.forEach((item) => {
    const li = document.createElement('li');
    const article = document.createElement('article');

    li.className = 'article-feed-article';

    if (opts.layout === 'list') {
      const pic = createPicture({ src: item.image, breakpoints: [{ width: '1000' }] });
      const link = createArticleLink(item, 'article-feed-article-image-link', pic);
      article.append(link);
    }

    const date = document.createElement('p');
    date.className = 'article-feed-article-date';
    date.innerText = calculateExcelDate(item.date);

    const author = createAuthorEl(item);

    const meta = document.createElement('div');
    meta.className = 'article-feed-article-meta';
    meta.append(date, author);

    const title = document.createElement('h3');
    title.className = 'article-feed-article-title';
    title.innerText = item.title;

    const link = createArticleLink(item, 'article-feed-article-title-link', title);

    article.append(meta, link);
    li.append(article);
    ul.append(li);
  });
  return ul;
}

function filterFeed(filter, data) {
  const split = filter.split(' = ');
  const key = split[0];
  const search = split[1] === 'no' ? '' : split[1];

  return data.reduce((acc, article) => {
    // featured must be an exact match
    if (key === 'featured' && article[key] === search) {
      acc.push(article);
    } else if (key === 'author' && article[key].includes(search)) {
      acc.push(article);
    } else if (key === 'tags' && article.tags.some((tag) => tag === search)) {
      // do not add self to tag based list
      const { pathname } = window.location;
      if (article.path !== pathname) acc.push(article);
    }
    return acc;
  }, []);
}

function sortFeed(data) {
  return data.sort((a, b) => {
    // First compare by date (descending)
    if (a.date !== b.date) return b.date - a.date;

    // If dates are equal, compare by lastModified (descending)
    return b.lastModified - a.lastModified;
  });
}

const getBlockMeta = (el) => [...el.childNodes].reduce((rdx, row) => {
  if (row.children) {
    const key = row.children[0].textContent.trim();
    const content = row.children[1];
    if (content) {
      const text = content.textContent.trim();
      if (key && content) rdx[key] = { text };
    }
  }
  return rdx;
}, {});

export default async function init(el) {
  const { locale } = getConfig();
  const { filter } = getBlockMeta(el);
  const resp = await fetch(`${locale.base}${QUERY_PATH}`);
  if (!resp.ok) throw new Error('Could not fetch query index');

  // Kick off the author request
  fetchAuthors();

  const { data } = await resp.json();

  const sorted = sortFeed(data);

  const filtered = filter ? filterFeed(filter.text, sorted) : sorted;

  const layout = el.classList.contains('grid') ? 'grid' : 'list';
  const opts = { layout };

  const list = decorateFeed(filtered, opts);

  el.querySelector(':scope > div:nth-child(2)')?.remove();
  el.append(list);
}