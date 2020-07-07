const fileInput = document.querySelector('.dropzone__input');
const dropZone = fileInput.closest('.dropzone');

dropZone.addEventListener('click', () => {
  if(fileInput) {
    fileInput.click();
  }
})

dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('dropzone--over');
})

['dragleave', 'dragend'].forEach(type => {
  dropZone.addEventListener(type, () => {
    dropZone.classList.remove('dropzone--over');
  })
})