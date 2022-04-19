const uploadForm = document.getElementById("uploadImageForm");
const uploadBtn = [...document.getElementsByTagName("label")].filter(
  (e) => e.getAttribute("for") == "inputUpload"
);

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  uploadForm.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
  uploadForm.addEventListener(eventName, () => {
    uploadForm.classList.add("highlight");
  });
});
[("dragleave", "drop")].forEach((eventName) => {
  uploadForm.addEventListener(eventName, () => {
    uploadForm.classList.remove("highlight");
  });
});

uploadForm.addEventListener("drop", dropHandler);

function dropHandler(ev) {
  console.log("File(s) dropped");

  if (ev.dataTransfer.items) {
    after_upload(URL.createObjectURL(ev.dataTransfer.files[0]));
  }
}


document.getElementById("inputUpload").addEventListener("change", handleupload);
function handleupload(e) {
  after_upload(URL.createObjectURL(this.files[0]));
}
const img=document.createElement('img')
const main=document.getElementsByTagName('main')[0]

img.alt='img'
img.className='img'

function after_upload(src) {
  img.src=src
  main.classList='filter'
}
