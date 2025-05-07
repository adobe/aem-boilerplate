import { getConfig } from '../../scripts/nx.js';
import createPicture from '../../scripts/utils/picture.js';

const QUERY_PATH = '/en/blog.json';

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

function createArticleLink(item, className, child) {
  const link = document.createElement('a');
  link.className = className;
  link.href = item.path;
  link.title = item.title;
  link.append(child);
  return link;
}

function formatDateForDisplay(dateValue) {
  // If no date, return unknown
  if (!dateValue) return 'Unknown date';
  
  try {
    let dateObj;
    
    // Check if it's an Excel date number (small number like 45749)
    if (typeof dateValue === 'number' && dateValue < 50000) {
      console.log('Detected Excel date number:', dateValue);
      // Convert Excel date to JavaScript date using the existing calculateExcelDate function
      const excelDateStr = calculateExcelDate(dateValue);
      dateObj = new Date(excelDateStr);
      
      // Format the date as MM/DD/YYYY for daysSince function
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });
      
      // Calculate days ago using the daysSince function
      const daysAgo = daysSince(formattedDate);
      
      // Format based on how recent
      if (daysAgo === 0) {
        return 'Today';
      } else if (daysAgo > 0 && daysAgo <= 14) {
        return `${daysAgo} days ago`;
      } else {
        return formattedDate;
      }
      
    } else if (typeof dateValue === 'number') {
      // Regular timestamp in seconds, convert to milliseconds
      dateObj = new Date(dateValue * 1000);
      
      // Format the date as MM/DD/YYYY for daysSince function
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });
      
      // Calculate days ago using the daysSince function
      const daysAgo = daysSince(formattedDate);
      
      // Format based on how recent
      if (daysAgo === 0) {
        return 'Today';
      } else if (daysAgo > 0 && daysAgo <= 14) {
        return `${daysAgo} days ago`;
      } else {
        return formattedDate;
      }
      
    } else {
      // Try to parse as date string
      dateObj = new Date(dateValue);
      
      // Format the date as MM/DD/YYYY for daysSince function
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });
      
      // Calculate days ago using the daysSince function
      const daysAgo = daysSince(formattedDate);
      
      // Format based on how recent
      if (daysAgo === 0) {
        return 'Today';
      } else if (daysAgo > 0 && daysAgo <= 14) {
        return `${daysAgo} days ago`;
      } else {
        return formattedDate;
      }
    }
  } catch (e) {
    console.error('Error formatting date:', e, dateValue);
    return 'Invalid date';
  }
}

function howManyDaysAgo(timestamp) {
  const now = Date.now();
  console.log('Date timestamp:', timestamp, 'Type:', typeof timestamp);
    
    // Handle different date formats
    let dateInMs;
    if (typeof timestamp === 'string') {
      // Try to parse the string date
      dateInMs = new Date(timestamp).getTime();
    } else if (typeof timestamp === 'number') {
      // If it's already a timestamp in seconds, convert to ms
      dateInMs = timestamp * 1000;
    } else {
      // Default to current time if invalid
      console.warn('Invalid date format:', timestamp);
      return 0;
    }
    
    console.log('Date in ms:', dateInMs, 'Current time:', now);
    const diffInMs = now - dateInMs;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    console.log('Days difference:', diffInDays);
    return diffInDays;
}

function daysSince(date) {
    const now = Date.now();
    const [month, day, year] = date.split('/').map(Number);
    const jDate = new Date(year, month - 1, day);
    const diffInMs = now - jDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  }

function decorateFeed(data, opts) {
  const container = document.createElement('div');
  container.className = 'article-feed-container';
  
  // Create the featured section (first row with special layout)
  const featuredSection = document.createElement('div');
  featuredSection.className = 'article-feed-featured-section';
  
  // First article (60% width)
  if (data.length > 0) {
    const featuredArticle = document.createElement('div');
    featuredArticle.className = 'article-feed-featured-article';
    
    const article = document.createElement('article');
    const item = data[0];
    
    // Debug the featured article data
    console.log('Featured article:', item);
    console.log('Featured article date:', item.date, 'Type:', typeof item.date);
    console.log('Featured article lastModified:', item.lastModified, 'Type:', typeof item.lastModified);
    
    const pic = createPicture({ src: item.image, breakpoints: [{ width: '1000' }] });
    const imageLink = createArticleLink(item, 'article-feed-article-image-link', pic);
    
    // Create header with date (right-aligned)
    const header = document.createElement('div');
    header.className = 'article-feed-article-header';
    
    const date = document.createElement('p');
    date.className = 'article-feed-article-date';
    
    // Use the date or lastModified, whichever is available
    const dateValue = item.date || item.lastModified;
    date.innerText = formatDateForDisplay(dateValue);
    
    header.appendChild(date);
    
    const title = document.createElement('h3');
    title.className = 'article-feed-article-title';
    title.innerText = item.title;
    
    const titleLink = createArticleLink(item, 'article-feed-article-title-link', title);
    
    // Add tags below the title
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'article-feed-article-tags';
    
    // Add featured tags if they exist
    if (item.featured) {
      const featuredValues = item.featured.split(',').map(val => val.trim());
      featuredValues.forEach(featuredValue => {
        const tagElement = document.createElement('span');
        tagElement.className = 'article-feed-article-tag article-feed-article-tag-featured';
        tagElement.innerText = featuredValue;
        tagsContainer.appendChild(tagElement);
      });
    }
    
    // Add regular tags
    if (item.tags && item.tags.length > 0) {
      item.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'article-feed-article-tag';
        tagElement.innerText = tag;
        tagsContainer.appendChild(tagElement);
      });
    }
    
    // Add description for the featured article
    const description = document.createElement('p');
    description.className = 'article-feed-article-description';
    description.innerText = item.description || '';
    
    article.append(imageLink, header, titleLink, tagsContainer, description);
    featuredArticle.append(article);
    featuredSection.append(featuredArticle);
  }
  
  // Secondary articles column (40% width)
  if (data.length > 1) {
    const secondaryColumn = document.createElement('div');
    secondaryColumn.className = 'article-feed-secondary-column';
    
    // Create the next 2 articles
    for (let i = 1; i <= 2 && i < data.length; i++) {
      const article = document.createElement('article');
      article.className = 'article-feed-secondary-article';
      const item = data[i];
      
      const pic = createPicture({ src: item.image, breakpoints: [{ width: '400' }] });
      const imageLink = createArticleLink(item, 'article-feed-article-image-link', pic);
      
      // Create header with date (right-aligned)
      const header = document.createElement('div');
      header.className = 'article-feed-article-header';
      
      const date = document.createElement('p');
      date.className = 'article-feed-article-date';
      
      // Use the date or lastModified, whichever is available
      const dateValue = item.date || item.lastModified;
      date.innerText = formatDateForDisplay(dateValue);
      
      header.appendChild(date);
      
      const title = document.createElement('h3');
      title.className = 'article-feed-article-title';
      title.innerText = item.title;
      
      const titleLink = createArticleLink(item, 'article-feed-article-title-link', title);
      
      // Add tags below the title
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'article-feed-article-tags';
      
      // Add featured tags if they exist
      if (item.featured) {
        const featuredValues = item.featured.split(',').map(val => val.trim());
        featuredValues.forEach(featuredValue => {
          const tagElement = document.createElement('span');
          tagElement.className = 'article-feed-article-tag article-feed-article-tag-featured';
          tagElement.innerText = featuredValue;
          tagsContainer.appendChild(tagElement);
        });
      }
      
      // Add regular tags
      if (item.tags && item.tags.length > 0) {
        item.tags.forEach(tag => {
          const tagElement = document.createElement('span');
          tagElement.className = 'article-feed-article-tag';
          tagElement.innerText = tag;
          tagsContainer.appendChild(tagElement);
        });
      }
      
      article.append(imageLink, header, titleLink, tagsContainer);
      secondaryColumn.append(article);
    }
    
    featuredSection.append(secondaryColumn);
  }
  
  container.append(featuredSection);
  
  // Create "MORE NEWS" section
  if (data.length > 3) {
    const moreNewsHeading = document.createElement('h2');
    moreNewsHeading.className = 'article-feed-more-news-heading';
    moreNewsHeading.innerText = 'MORE NEWS';
    container.append(moreNewsHeading);
    
    const moreNewsSection = document.createElement('div');
    moreNewsSection.className = 'article-feed-more-news-section';
    
    // Create two rows of 3 articles each
    for (let i = 3; i < 9 && i < data.length; i++) {
      const articleWrapper = document.createElement('div');
      articleWrapper.className = 'article-feed-more-news-article';
      
      const article = document.createElement('article');
      const item = data[i];
      
      const pic = createPicture({ src: item.image, breakpoints: [{ width: '400' }] });
      const imageLink = createArticleLink(item, 'article-feed-article-image-link', pic);
      
      // Create header with date (right-aligned)
      const header = document.createElement('div');
      header.className = 'article-feed-article-header';
      
      const date = document.createElement('p');
      date.className = 'article-feed-article-date';
      
      // Use the date or lastModified, whichever is available
      const dateValue = item.date || item.lastModified;
      date.innerText = formatDateForDisplay(dateValue);
      
      header.appendChild(date);
      
      const title = document.createElement('h3');
      title.className = 'article-feed-article-title';
      title.innerText = item.title;
      
      const titleLink = createArticleLink(item, 'article-feed-article-title-link', title);
      
      // Add tags below the title
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'article-feed-article-tags';
      
      // Add featured tags if they exist
      if (item.featured) {
        const featuredValues = item.featured.split(',').map(val => val.trim());
        featuredValues.forEach(featuredValue => {
          const tagElement = document.createElement('span');
          tagElement.className = 'article-feed-article-tag article-feed-article-tag-featured';
          tagElement.innerText = featuredValue;
          tagsContainer.appendChild(tagElement);
        });
      }
      
      // Add regular tags
      if (item.tags && item.tags.length > 0) {
        item.tags.forEach(tag => {
          const tagElement = document.createElement('span');
          tagElement.className = 'article-feed-article-tag';
          tagElement.innerText = tag;
          tagsContainer.appendChild(tagElement);
        });
      }
      
      article.append(imageLink, header, titleLink, tagsContainer);
      articleWrapper.append(article);
      moreNewsSection.append(articleWrapper);
    }
    
    container.append(moreNewsSection);
  }
  
  return container;
}

function filterFeed(filter, data) {
  const split = filter.split(' = ');
  const key = split[0];
  const search = split[1] === 'no' ? '' : split[1];

  return data.reduce((acc, article) => {
    // featured must be an exact match in the comma-separated list
    if (key === 'featured' && article[key]) {
      const featuredValues = article[key].split(',').map(val => val.trim());
      if (featuredValues.includes(search)) {
        acc.push(article);
      }
    } else if (key === 'tags' && article.tags && article.tags.some((tag) => tag === search)) {
      // do not add self to tag based list
      const { pathname } = window.location;
      if (article.path !== pathname) acc.push(article);
    }
    return acc;
  }, []);
}

function filterBlogArticles(data) {
  return data.filter(article => article.path && (
    article.path.includes('/blog/') || 
    article.path.includes('/guides/') || 
    article.path.includes('/patchnotes/')
  ));
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

  const { data } = await resp.json();
  console.log('Article data:', data);
  
  // Check the date format in the first article
  if (data && data.length > 0) {
    console.log('First article date:', data[0].date, 'Type:', typeof data[0].date);
    console.log('First article lastModified:', data[0].lastModified, 'Type:', typeof data[0].lastModified);
  }
  
  const sorted = sortFeed(data);
  
  // First filter to only include blog articles
  const blogArticles = filterBlogArticles(sorted);
  
  // Then apply any additional filters from the block metadata
  const filtered = filter ? filterFeed(filter.text, blogArticles) : blogArticles;

  const layout = el.classList.contains('grid') ? 'grid' : 'list';
  const opts = { layout };

  const container = decorateFeed(filtered, opts);

  el.querySelector(':scope > div:nth-child(2)')?.remove();
  el.append(container);
}