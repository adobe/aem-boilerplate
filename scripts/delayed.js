// add delayed functionality here

/**
 * Decorates links to file types to open in new tabs.
 * @param {Element} doc The container element
 */
function decorateFileLinks(doc) {
  const fileExtensions = [
    '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
    '.pdf', '.zip', '.mp4', '.mov', '.avi',
  ];
  
  doc.querySelectorAll('a[href]').forEach((link) => {
    try {
      const url = new URL(link.href);
      const hasFileExtension = fileExtensions.some((ext) => url.pathname.toLowerCase().endsWith(ext));
      
      if (hasFileExtension && !link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
      }
    } catch (e) {
      // Invalid URL, skip
    }
  });
}

decorateFileLinks(doc);
