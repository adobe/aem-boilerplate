/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const header = !block.classList.contains('no-header');
  if (header) table.append(thead);
  table.append(tbody);

  // First, determine the maximum number of columns in any row
  let maxColumns = 0;
  [...block.children].forEach((child) => {
    maxColumns = Math.max(maxColumns, child.children.length);
  });

  [...block.children].forEach((child, i) => {
    const row = document.createElement('tr');
    if (header && i === 0) thead.append(row);
    else tbody.append(row);
    
    // Check if this row has only one column
    const childrenCount = child.children.length;
    const isSingleColumn = childrenCount === 1;
    
    // Add a special class to rows in tbody that have only one column
    if (isSingleColumn && !(header && i === 0)) {
      row.classList.add('single-column-row');
    }
    
    [...child.children].forEach((col) => {
      const cell = buildCell(header ? i : i + 1);
      const align = col.getAttribute('data-align');
      const valign = col.getAttribute('data-valign');
      
      if (align) cell.style.textAlign = align;
      if (valign) cell.style.verticalAlign = valign;
      
      // If this is a single column row, set the colspan to the maximum number of columns
      if (isSingleColumn) {
        cell.setAttribute('colspan', maxColumns.toString());
      }
      
      cell.innerHTML = col.innerHTML;
      row.append(cell);
    });
  });
  block.innerHTML = '';
  block.append(table);
}
