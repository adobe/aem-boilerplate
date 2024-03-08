import { updateOrCreateInvalidMsg, stripTags } from '../util.js';
import { fileAttachmentText, dragDropText, defaultErrorMessages } from '../constant.js';

const fileSizeRegex = /^(\d*\.?\d+)(\\?(?=[KMGT])([KMGT])(?:i?B)?|B?)$/i;

/**
 * converts a string of the form "10MB" to bytes. If the string is malformed 0 is returned
 * @param {*} str
 * @returns
 */
function getSizeInBytes(str) {
  const sizes = {
    KB: 1, MB: 2, GB: 3, TB: 4,
  };
  let sizeLimit = 0;
  const matches = fileSizeRegex.exec(str.trim());
  if (matches != null) {
    const symbol = matches[2] || 'kb';
    const size = parseFloat(matches[1]);
    const i = 1024 ** sizes[symbol.toUpperCase()];
    sizeLimit = Math.round(size * i);
  }
  return sizeLimit;
}

/**
 * matches the given mediaType with the accepted mediaTypes
 * @param {*} mediaType mediaType of the file to match
 * @param {[]} accepts accepted mediaTypes
 * @returns false if the mediaType is not accepted
 */
function matchMediaType(mediaType, accepts) {
  return !mediaType || accepts.some((accept) => {
    const trimmedAccept = accept.trim();
    const prefixAccept = trimmedAccept.split('/')[0];
    const suffixAccept = trimmedAccept.split('.')[1];
    return ((trimmedAccept.includes('*') && mediaType.startsWith(prefixAccept))
      || (trimmedAccept.includes('.') && mediaType.endsWith(suffixAccept))
      || (trimmedAccept === mediaType));
  });
}

/**
 * checks whether the size of the files in the array is withing the maxFileSize or not
 * @param {string|number} maxFileSize maxFileSize in bytes or string with the unit
 * @param {File[]} files array of File objects
 * @returns false if any file is larger than the maxFileSize
 */
function checkMaxFileSize(maxFileSize, files) {
  const sizeLimit = typeof maxFileSize === 'string' ? getSizeInBytes(maxFileSize) : maxFileSize;
  return Array.from(files).find((file) => file.size > sizeLimit) === undefined;
}

/**
 * checks whether the mediaType of the files in the array are accepted or not
 * @param {[]} acceptedMediaTypes
 * @param {File[]} files
 * @returns false if the mediaType of any file is not accepted
 */
function checkAccept(acceptedMediaTypes, files) {
  if (!acceptedMediaTypes || acceptedMediaTypes.length === 0 || !files.length) {
    return true;
  }
  const invalidFile = Array.from(files)
    .some((file) => !matchMediaType(file.type, acceptedMediaTypes));
  return !invalidFile;
}

/**
 * triggers file Validation for the given input element and updates the error message
 * @param {HTMLInputElement} input
 * @param {FileList} files
 */
function fileValidation(input, files) {
  const multiple = input.hasAttribute('multiple');
  const acceptedFile = (input.getAttribute('accept') || '').split(',');
  const minItems = (parseInt(input.dataset.minItems, 10) || 1);
  const maxItems = (parseInt(input.dataset.maxItems, 10) || -1);
  const fileSize = `${input.dataset.maxFileSize || '2MB'}`;
  let constraint = '';
  let errorMessage = '';
  const wrapper = input.closest('.field-wrapper');
  if (!checkAccept(acceptedFile, files)) {
    constraint = 'accept';
  } else if (!checkMaxFileSize(fileSize, files)) {
    constraint = 'maxFileSize';
  } else if (multiple && maxItems !== -1 && files.length > maxItems) {
    constraint = 'maxItems';
    errorMessage = defaultErrorMessages.maxItems.replace(/\$0/, maxItems);
  } else if (multiple && minItems !== 1 && files.length < minItems) {
    constraint = 'minItems';
    errorMessage = defaultErrorMessages.minItems.replace(/\$0/, minItems);
  }
  if (constraint.length) {
    const finalMessage = wrapper.dataset[constraint]
    || errorMessage
    || defaultErrorMessages[constraint];
    input.setCustomValidity(finalMessage);
    updateOrCreateInvalidMsg(
      input,
      finalMessage,
    );
  } else {
    input.setCustomValidity('');
    updateOrCreateInvalidMsg(input, '');
  }
}

function formatBytes(bytes) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(0))} ${sizes[i]}`;
}

function updateButtonIndex(elements = []) {
  elements.forEach((element, index) => {
    element.dataset.index = index;
  });
}

function dispatchChangeEvent(input, files) {
  if (!files.length) {
    input.value = null;
  }
  const options = { bubbles: true, detail: { files, deletion: true } };
  const changeEvent = new CustomEvent('change', options);
  input.dispatchEvent(changeEvent);
}

/**
 * creates an HTML element for the attached file
 * @param {File} file
 * @param {number} index
 */
function fileElement(file, index) {
  const el = document.createElement('div');
  el.dataset.index = index;
  el.classList.add('file-description');
  el.innerHTML = `<span class="file-description-name">${file.name}</span>
  <span class="file-description-size">${formatBytes(file.size)}</span>
  <button class="file-description-remove" type="button"></button>`;
  return el;
}

/**
 * creates an HTML elements for drag & drop
 * @param {HTMLElement} wrapper
 */
function createDragAndDropArea(wrapper) {
  const input = wrapper.querySelector('input');
  const dragArea = `
    <div class="file-dragIcon"></div>
    <div class="file-dragText">${dragDropText}</div>
    <button class="file-attachButton" type="button">${fileAttachmentText}</button>
  `;
  const dragContainer = document.createElement('div');
  if (input.title) {
    dragContainer.title = stripTags(input.title, '');
  }
  dragContainer.className = 'file-drag-area';
  dragContainer.innerHTML = dragArea;
  dragContainer.appendChild(input.cloneNode(true));
  input.parentNode.replaceChild(dragContainer, input);
  return dragContainer;
}

function createFileHandler(allFiles, input) {
  return {
    removeFile: (index) => {
      allFiles.splice(index, 1);
      const fileListElement = input.closest('.field-wrapper').querySelector('.files-list');
      fileListElement.querySelector(`[data-index="${index}"]`).remove();
      fileValidation(input, allFiles);
      updateButtonIndex(Array.from(fileListElement.children));
      dispatchChangeEvent(input, allFiles);
    },

    attachFiles: (inputEl, files) => {
      const multiple = inputEl.hasAttribute('multiple');
      if (!multiple) {
        allFiles.splice(0, allFiles.length);
      }
      const newFiles = Array.from(files);
      const currentLength = allFiles.length;
      allFiles.push(...newFiles);
      const newFileElements = newFiles
        .map((file, index) => fileElement(file, index + currentLength));
      const fileListElement = inputEl.closest('.field-wrapper').querySelector('.files-list');
      if (multiple) {
        fileListElement.append(...newFileElements);
      } else {
        fileListElement.replaceChildren(...newFileElements);
      }
      fileValidation(inputEl, allFiles);
      dispatchChangeEvent(input, allFiles);
    },

    previewFile: (index) => {
      const file = allFiles[index];
      let url = file.data || window.URL.createObjectURL(file);
      if (file.data) {
        const lastIndex = url.lastIndexOf('/');
        /* added check for query param since sas url contains query params &
          does not have file name, encoding is not required in this case
        */
        if (lastIndex >= 0 && url.indexOf('?') === -1) {
          // encode the filename after last slash to ensure the handling of special characters
          url = `${url.substr(0, lastIndex)}/${encodeURIComponent(url.substr(lastIndex + 1))}`;
        }
      }
      window.open(url, '', 'scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,status=no');
    },
  };
}

// eslint-disable-next-line no-unused-vars
export default async function decorate(fieldDiv, field, htmlForm) {
  const allFiles = [];
  const dragArea = createDragAndDropArea(fieldDiv);
  const input = fieldDiv.querySelector('input');
  fieldDiv.classList.add('decorated');
  const fileListElement = document.createElement('div');
  fileListElement.classList.add('files-list');
  const attachButton = dragArea.querySelector('.file-attachButton');
  attachButton.addEventListener('click', () => input.click());
  const fileHandler = createFileHandler(allFiles, input);
  input.addEventListener('change', (event) => {
    if (!event?.detail?.deletion) {
      event.stopPropagation();
      fileHandler.attachFiles(input, event.target.files);
    }
  });
  dragArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dragArea.classList.remove('file-dragArea-active');
    fileHandler.attachFiles(input, (event?.dataTransfer?.files || []));
  });
  dragArea.addEventListener('paste', (event) => {
    event.preventDefault();
    fileHandler.attachFiles(input, (event?.clipboardData?.files || []));
  });
  dragArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dragArea.classList.add('file-dragArea-active');
  });
  dragArea.addEventListener('dragleave', () => {
    dragArea.classList.remove('file-dragArea-active');
  });
  fileListElement.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      fileHandler.removeFile(e.target?.parentElement?.dataset?.index || 0);
    } else if (e.target.tagName === 'SPAN') {
      fileHandler.previewFile(e.target?.parentElement?.dataset?.index || 0);
    }
  });
  htmlForm.addEventListener('reset', () => {
    fileListElement.innerHTML = '';
    input.value = '';
  });
  fieldDiv.insertBefore(fileListElement, input.nextElementSibling);
  // pre-fill file attachment
  if (field.value) {
    const preFillFiles = Array.isArray(field.value) ? field.value : [field.value];
    const dataTransfer = new DataTransfer();
    const file = new File([preFillFiles[0].data], preFillFiles[0].name, { ...preFillFiles[0] });
    dataTransfer.items.add(file);
    // Pre-fill input field to mark it as a valid field.
    input.files = dataTransfer.files;
    fileHandler.attachFiles(input, preFillFiles);
  }
  return fieldDiv;
}
