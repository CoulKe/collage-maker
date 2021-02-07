/**Maximum number of files to upload */
const maxFiles = 2;
let inputElement = document.querySelector("#files") as HTMLInputElement;
const downloadButton = document.querySelector("#downloadButton");
const previewButton = document.querySelector("#previewButton");
const hiddenImages = document.querySelector("#hidden-images") as HTMLElement;

/**main canvas */
const cvns = document.querySelector("#cvns") as HTMLCanvasElement;
/**preview canvas */
const preview = document.querySelector("#preview") as HTMLCanvasElement;
/**main canvas context */
const ctx = cvns.getContext("2d");
/**preview canvas context */
const previewCtx = preview.getContext("2d");

previewButton?.addEventListener("click", (e) => {
  e.preventDefault();
  preview.style.display = "block";
  previewCollage();
});
downloadButton?.addEventListener("click", function (e) {
  e.preventDefault();
  paintThenDownload(downloadImage);
});

inputElement?.addEventListener("change", saveImages);

/**
 * Saves the uploaded image in the dom.
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
        hiddenImages.append(img);
      };
    }
  }
}
/**
 * Draws template 1.
 * @param img1 image source
 * @param img2 `blob` image source
 * @param show `string` preview | main
 */
function template_1(
  img1: CanvasImageSource,
  img2: CanvasImageSource,
  show: "preview" | "main"
) {
  if (show.toLowerCase() === "preview") {
    /**preview canvas */
    previewCtx?.drawImage(img1, 0, 0, 275, 275);
    previewCtx?.drawImage(img2, 100, 100, 137.5, 137.5);
  } else if (show.toLowerCase() === "main") {
    /**main canvas */
    ctx?.drawImage(img1, 0, 0, 550, 550);
    ctx?.drawImage(img2, 200, 200, 275, 275);
  }
}
/**
 * Draws template 2.
 * @param img1 image source
 * @param img2 `blob` image source
 * @param show `string` preview | main
 */
function template_2(
  img1: CanvasImageSource,
  img2: CanvasImageSource,
  show: "preview" | "main"
) {
  if (show.toLowerCase() === "preview") {
    /**preview canvas */
    previewCtx?.drawImage(img1, 0, 0, 137.5, 275);
    previewCtx?.drawImage(img2, 137.5, 0, 137.5, 275);
  } else if (show.toLowerCase() === "main") {
    /**main canvas */
    ctx?.drawImage(img1, 0, 0, 275, 550);
    ctx?.drawImage(img2, 275, 0, 275, 550);
  }
}
/**
 * Draws template 3.
 * @param img1 image source
 * @param img2 `blob` image source
 * @param show `string` preview | main
 */
function template_3(
  img1: CanvasImageSource,
  img2: CanvasImageSource,
  show: "preview" | "main"
) {
  if (show.toLowerCase() === "preview") {
    /**preview canvas */
    previewCtx?.drawImage(img1, 0, 0, 275, 137.5);
    previewCtx?.drawImage(img2, 0, 137.5, 275, 137.5);
  } else if (show.toLowerCase() === "main") {
    /**main canvas */
    ctx?.drawImage(img1, 0, 0, 550, 275);
    ctx?.drawImage(img2, 0, 275, 550, 275);
  }
}
/**paints the preview canvas. */
function previewCollage() {
  let img1 = document.querySelector("#img-1") as HTMLImageElement;
  let img2 = document.querySelector("#img-2") as HTMLImageElement;
  let query = window.location.search;
  let pickedTemplate = query.split("=")[1];

  if (img1 !== null && img2 !== null) {
    if (pickedTemplate === "1") {
      template_1(img1, img2, "preview");
    } else if (pickedTemplate === "2") {
      template_2(img1, img2, "preview");
    } else if (pickedTemplate === "3") {
      template_3(img1, img2, "preview");
    } else {
      template_1(img1, img2, "preview");
    }
  }
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
      template_1(img1, img2, "main");
    } else if (pickedTemplate === "2") {
      template_2(img1, img2, "main");
    } else if (pickedTemplate === "3") {
      template_3(img1, img2, "main");
    } else {
      template_1(img1, img2, "main");
    }
  }
  callback();
}
/**
 * Generate image from the canvas then downloads it.
 */
function downloadImage() {
  const dataSrc = cvns.toDataURL("image/png");
  let hiddenLink = document.querySelector("#hidden-link") as HTMLAnchorElement;
  hiddenLink?.setAttribute("href", dataSrc);
  hiddenLink?.setAttribute(
    "download",
    `collage${new Date().getMilliseconds()}`
  );
  hiddenLink.click();
}
