/**Maximum number of files to upload */
const maxFiles = 2;
let inputElement = document.querySelector("#files") as HTMLInputElement;
const preview = document.querySelector("#preview") as HTMLElement;
const downloadButton = document.querySelector("#downloadButton");
const previewButton = document.querySelector("#previewButton");
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const context = canvas?.getContext("2d");

previewButton?.addEventListener("click", (e) => {
  e.preventDefault();
  preview.style.display = "block";
});
downloadButton?.addEventListener("click", function (e) {
  e.preventDefault();
  paintThenDownload(downloadImage);
});

inputElement?.addEventListener("change", saveImages);

/**
 * Saves the uploaded image in the dom
 */
function saveImages() {
  let uploadedFile = inputElement?.files!;
  for (let index = 0; index < maxFiles; index++) {
    if (uploadedFile[index]) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile[index]);
      reader.onloadend = function () {
        let src = this.result!;
        let img = document.createElement("img");
        img.setAttribute("src", src?.toString());
        img.setAttribute("id", `img-${index + 1}`);
        preview.append(img);
      };
    }
  }
}
/**
 * Draws template 1
 * @param img1 image
 * @param img2 image
 */
function template_1(img1: CanvasImageSource, img2: CanvasImageSource) {
  context?.drawImage(img1, 0, 0, 550, 550);
  context?.drawImage(img2, 200, 200, 275, 275);
}
/**
 * Draws template 2
 * @param img1 image
 * @param img2 image
 */
function template_2(img1: CanvasImageSource, img2: CanvasImageSource) {
  context?.drawImage(img1, 0, 0, 275, 550);
  context?.drawImage(img2, 275, 0, 275, 550);
}
/**
 * Draws template 3
 * @param img1 image
 * @param img2 image
 */
function template_3(img1: CanvasImageSource, img2: CanvasImageSource) {
  context?.drawImage(img1, 0, 0, 550, 275);
  context?.drawImage(img2, 0, 275, 550, 275);
}
/**
 * Paints the canvas then call the function to download image.
 * @param callback Function
 */
function paintThenDownload(callback: CallableFunction = downloadImage) {
  let img1 = document.querySelector("#img-1") as HTMLImageElement;
  let img2 = document.querySelector("#img-2") as HTMLImageElement;
  let query = window.location.search;
  let pickedTemplate = query.split("=")[1];

  if (img1 !== null && img2 !== null) {
    if (pickedTemplate === "1") {
      template_1(img1, img2);
    } else if (pickedTemplate === "2") {
      template_2(img1, img2);
    } else if (pickedTemplate === "3") {
      template_3(img1, img2);
    } else {
      template_1(img1, img2);
    }
  }
  callback();
}
/**
 * Generate image from the canvas then downloads it.
 */
function downloadImage() {
  const dataSrc = canvas.toDataURL("image/png");
  let hiddenLink = document.querySelector("#hidden-link") as HTMLAnchorElement;
  hiddenLink?.setAttribute("href", dataSrc);
  hiddenLink?.setAttribute(
    "download",
    `collage${new Date().getMilliseconds()}`
  );
  hiddenLink.click();
}
