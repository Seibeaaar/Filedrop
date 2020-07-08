// Dropzone section
const fileInput = document.querySelector('.dropzone__input');
const dropZone = fileInput.closest('.dropzone');
// storage array for uploaded files
let uploadedFiles = [];

dropZone.addEventListener('click', () => {
  if(fileInput) {
    fileInput.click();
  }
})

// dragover listener to add class when user is dragging file over dropzone
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('dropzone--over');
})

// dragleave listener to remove class when user has left dropzone
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dropzone--over');
})

dropZone.addEventListener('drop', e => {
  e.preventDefault();
  // when files array is not empty, we call updateThumbnail function and remove dropzone--over class
  if(e.dataTransfer.files.length) {
    uploadedFiles = [...uploadedFiles, ...e.dataTransfer.files];
    // function that updates thumbnail in dropzone. Arguments: dropzone and first file of files list
    updateThumbnail(dropZone, e.dataTransfer.files[0]);
  }
  dropZone.classList.remove('dropzone--over');
})

const updateThumbnail = (dropzone, file) => {
  // getting thumbnail element
  let thumbNail = document.querySelector('.dropzone__thumb');
  const nameSpan = document.querySelector('.info__item--name');
  const sizeSpan = document.querySelector('.info__item--size');
  // If we have default text in dropzone, we have to remove it
  if(dropzone.querySelector('.dropzone__default')) {
    dropzone.querySelector('.dropzone__default').remove();  
  }
  // If there's no thumbnail, we create one and append it into dropzone element
  if(!thumbNail) {
    thumbNail = document.createElement('div');
    thumbNail.classList.add('dropzone__thumb');
    dropzone.append(thumbNail);
  }
  // If file is an image, we use file reader to read that file and upload extracted data as our background image of the thumbnail
  if(file.type.startsWith('image')) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbNail.style.backgroundImage = `url('${reader.result}')`;
    }
  } else {
    thumbNail.style.backgroundImage = null;
  }
  thumbNail.dataset.label = file.name;
  nameSpan.textContent = file.name;
  sizeSpan.textContent = `${Math.round(file.size / 1024)} KB`;
}
