function sliceContent(arr, indexes) {
  const result = [];
  for (let i = 0; i < indexes.length; i++) {
    const start = indexes[i];
    const end = indexes[i + 1] || arr.length;
    result.push(arr.slice(start, end));
  }
  return result;
}

function decorateBlockTable(block) {
  const blockSection = block.closest('.section');
  blockSection.classList.add('block-table-section');
  const blockTable = document.createElement('div');
  blockTable.className = 'adjustments';

  // create title
  const [blockTitle, blockCols] = [...block.children];
  const title = document.createElement('div');
  title.className = 'table-title';
  title.append(blockTitle.textContent.trim());
  blockTable.append(title);
  
  // create table header
  const header = document.createElement('div');
  header.className = 'block-table-header block-cols';
  [...blockCols.children].forEach(col => {
    const column = document.createElement('div');
    column.append(col.textContent.trim());
    header.append(column);
  });
  blockTable.append(header);
  blockTitle.parentElement.remove();
  blockCols.parentElement.remove();

  // create table body
  const tableBody = document.createElement('div');
  tableBody.className = 'block-table-body block-rows';
  const bodyRows = blockSection.querySelectorAll('.divider-wrapper');
  const dividerIndex = [0, ...[...bodyRows].map(r => ([...blockSection.children].indexOf(r)))];
  const sliced = sliceContent([...blockSection.children], dividerIndex);
  sliced.forEach(row => {
    const tableRow = document.createElement('div');
    tableRow.className = 'block-table-row block-cols';
    const colIds = row.filter(r => !!r.querySelector('.detail'));
    const colIndex = colIds.map(id => row.indexOf(id));
    const slices = sliceContent([...row], [0, ...colIndex]);
    slices.forEach(slice => {
      const sliceCol = document.createElement('div');
      sliceCol.className = 'block-table-col';
      sliceCol.append(...slice);
      tableRow.append(sliceCol);
    })
    tableBody.append(tableRow);
  });
  blockTable.append(tableBody);
  blockSection.replaceChildren(blockTable);
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
  if (block.classList.contains('adjustments')) decorateBlockTable(block);
}
