const uploadForm = document.getElementById("uploadImageForm");
const main = document.getElementsByTagName("main")[0];
const imageContainer = document.querySelector(".image-container");
const filtersList = document.querySelector(".filters-list");
let imgSrc = "";
import { filters } from "./fillters.js";



function setstyle(elem, styleObj) {
  for (const property in styleObj) {
    elem.style[property] = styleObj[property];
  }
}

function createImageNode(styles = {}, customClass = "") {
  const img = document.createElement("img");
  img.alt = "img";
  img.className = `img ${customClass}`;
  img.src = imgSrc;
  setstyle(img, styles);

  return img;
}

function appendFilterItems(filters) {
  filters.forEach((filterItem) => {
    filtersList.append(createFilterItems(filterItem.name, filterItem.styles));
  });
}

function changeStyle(itemstyle){
  const elem=document.querySelector('.big-image')
setstyle(elem,itemstyle)
}

function createFilterItems(id, styles) {
  const filterItem = document.createElement("div");
  filterItem.className = "filter-item";
  filterItem.id = id;
  filterItem.addEventListener('click',()=>changeStyle(styles))
  filterItem.append(createImageNode(styles));

  const text = document.createElement("p");
  text.innerText = id;
  filterItem.append(text);
  return filterItem;
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function dropHandler(ev) {
  if (ev.dataTransfer.items) {
    after_upload(URL.createObjectURL(ev.dataTransfer.files[0]));
  }
}

function after_upload(src) {
  imgSrc = src;
  main.classList = "filter";
  const bigImage = createImageNode({}, "big-image");
  imageContainer.append(bigImage);
  appendFilterItems(filters);
}

function handleupload(e) {
  after_upload(URL.createObjectURL(this.files[0]));
}

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  uploadForm.addEventListener(eventName, preventDefaults, false);
});

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

document.getElementById("inputUpload").addEventListener("change", handleupload);
