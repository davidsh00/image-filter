const uploadForm = document.getElementById("uploadImageForm");
const main = document.getElementsByTagName("main")[0];
const imageContainer = document.querySelector(".image-container");
const filtersList = document.querySelector(".filters-list");
let imgSrc = "";

//filter-controller-container
const controllerContainer = document.querySelector(
  ".filter_controller-container"
);
const controllerClose = document.querySelector(
  ".filter_controller-container .close-controller"
);
const controllerList = document.querySelector(
  ".filter_controller-container .list-controller"
);

import { filters } from "./fillters.js";
function catchStyles(elem, stylesArr) {
  stylesArr.forEach((styleobj) => {
    setstyle(elem, styleobj);
  });
}
function setstyle(elem, styleObj) {
  for (const property in styleObj["style"]) {
    elem.style[property] = styleObj["style"][property];
  }
}

function createImageNode(styles = [], customClass = "") {
  const img = document.createElement("img");
  img.alt = "img";
  img.className = `img ${customClass}`;
  img.src = imgSrc;
  catchStyles(img, styles);
  return img;
}

function appendFilterItems(filters) {
  filters.forEach((filterItem) => {
    filtersList.append(createFilterItems(filterItem.name, filterItem.styles));
  });
}
function appendFilterController(where, stylesArr) {
  let controllers = [];
  //fillter range styles
  const rangeStyles = stylesArr.filter((style) => style.type == "range");
  rangeStyles.forEach((rangestyle) => {
    controllers.push(
      createController(
        Object.keys(rangestyle.style)[0],
        rangestyle.value,
        rangestyle
      )
    );
  });

  where.innerHTML = "";
  where.append(...controllers);
}
function changeStyle(itemstyles) {
  const bigImage = document.querySelector(".big-image");
  controllerContainer.classList.remove("hide");
  controllerContainer.classList.add("show");
  appendFilterController(controllerList, itemstyles);
  catchStyles(bigImage, itemstyles);
}

function createFilterItems(id, styles) {
  const filterItem = document.createElement("div");
  filterItem.className = "filter-item";
  filterItem.id = id;
  filterItem.addEventListener("click", () => changeStyle(styles));
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
  const bigImage = createImageNode([], "big-image");
  imageContainer.append(bigImage);
  appendFilterItems(filters);
}

function handleupload(e) {
  after_upload(URL.createObjectURL(this.files[0]));
}

function captalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
console.log("hue-rotate".includes("rotate"));
function prefix(property, propertyVal, subProperty) {
  if (subProperty.includes("rotate")) {
    return `${propertyVal * 3.6}deg`;
  }
  switch (property) {
    case "filter":
      switch (subProperty) {
        case "blur":
          return `${propertyVal}px`;
        default:
          return `${propertyVal}%`;
      }
    case "transform":
      switch (subProperty) {
        case "rotate":
          return `${propertyVal * 3.6}deg`;
        case "scale":
          if (propertyVal < 30) {
            return `${(propertyVal * 10) / 3 / 100}`;
          } else {
            return `${propertyVal / 100 + 0.7}`;
          }
      }
    default:
      return propertyVal;
  }
}

function changeByRange(e, id, style) {
  const bigImage = document.querySelector(".big-image");
  if (id == "filter" || id == "transform") {
    const subProperty = style.style[id].split("(")[0];
    const styles = {};
    styles["style"] = {};
    styles["style"][id] = `${subProperty}(${prefix(
      id,
      e.target.value,
      subProperty
    )})`;
    setstyle(bigImage, styles);
  }
}

function createController(id, value, style) {
  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  const inputContoroller = document.createElement("input");
  inputContoroller.type = "range";
  inputContoroller.min = "0";
  inputContoroller.max = "100";
  inputContoroller.step = "1";
  inputContoroller.value = value;
  inputContoroller.id = "inputFilterController" + captalize(id);
  inputContoroller.className = "range-controller " + id;
  inputContoroller.addEventListener("input", (e) =>
    changeByRange(e, id, style)
  );

  const labelController = document.createElement("label");
  labelController.for = "inputFilterContoroller" + captalize(id);
  labelController.innerText = id;
  labelController.className = "label-controller " + id;

  inputContainer.append(labelController, inputContoroller);
  return inputContainer;
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

controllerClose.addEventListener("click", () => {
  controllerContainer.classList.remove("show");
  controllerContainer.classList.add("hide");
});
