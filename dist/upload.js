"use strict";
/**Maximum number of files to upload */
var maxFiles = 2;
var inputElement = document.querySelector("#files");
var preview = document.querySelector("#preview");
var downloadButton = document.querySelector("#downloadButton");
var previewButton = document.querySelector("#previewButton");
var canvas = document.querySelector("canvas");
var context = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
previewButton === null || previewButton === void 0 ? void 0 : previewButton.addEventListener("click", function (e) {
    e.preventDefault();
    preview.style.display = 'block';
});
downloadButton === null || downloadButton === void 0 ? void 0 : downloadButton.addEventListener("click", function (e) {
    e.preventDefault();
    paintThenDownload(downloadImage);
});
inputElement === null || inputElement === void 0 ? void 0 : inputElement.addEventListener("change", saveImages);
/**
 * Saves the uploaded image in the dom
 */
function saveImages() {
    var uploadedFile = inputElement === null || inputElement === void 0 ? void 0 : inputElement.files;
    var _loop_1 = function (index) {
        if (uploadedFile[index]) {
            var reader = new FileReader();
            reader.readAsDataURL(uploadedFile[index]);
            reader.onloadend = function () {
                var src = this.result;
                var img = document.createElement("img");
                img.setAttribute("src", src === null || src === void 0 ? void 0 : src.toString());
                img.setAttribute("id", "img-" + (index + 1));
                preview.append(img);
            };
        }
    };
    for (var index = 0; index < maxFiles; index++) {
        _loop_1(index);
    }
}
/**
 * Draws template 1
 * @param img1 image
 * @param img2 image
 */
function template_1(img1, img2) {
    context === null || context === void 0 ? void 0 : context.drawImage(img1, 0, 0, 550, 550);
    context === null || context === void 0 ? void 0 : context.drawImage(img2, 200, 200, 275, 275);
}
/**
 * Draws template 2
 * @param img1 image
 * @param img2 image
 */
function template_2(img1, img2) {
    context === null || context === void 0 ? void 0 : context.drawImage(img1, 0, 0, 275, 550);
    context === null || context === void 0 ? void 0 : context.drawImage(img2, 275, 0, 275, 550);
}
/**
 * Draws template 3
 * @param img1 image
 * @param img2 image
 */
function template_3(img1, img2) {
    context === null || context === void 0 ? void 0 : context.drawImage(img1, 0, 0, 550, 275);
    context === null || context === void 0 ? void 0 : context.drawImage(img2, 0, 275, 550, 275);
}
/**
 * Paints the canvas then call the function to download image.
 * @param callback Function
 */
function paintThenDownload(callback) {
    if (callback === void 0) { callback = downloadImage; }
    var img1 = document.querySelector("#img-1");
    var img2 = document.querySelector("#img-2");
    var query = window.location.search;
    var pickedTemplate = query.split("=")[1];
    if (img1 !== null && img2 !== null) {
        if (pickedTemplate === "1") {
            template_1(img1, img2);
        }
        else if (pickedTemplate === "2") {
            template_2(img1, img2);
        }
        else if (pickedTemplate === "3") {
            template_3(img1, img2);
        }
    }
    callback();
}
/**
 * Generate image from the canvas then downloads it.
 */
function downloadImage() {
    var dataSrc = canvas.toDataURL("image/png");
    var hiddenLink = document.querySelector("#hidden-link");
    hiddenLink === null || hiddenLink === void 0 ? void 0 : hiddenLink.setAttribute("href", dataSrc);
    hiddenLink === null || hiddenLink === void 0 ? void 0 : hiddenLink.setAttribute("download", "collage" + new Date().getMilliseconds());
    hiddenLink.click();
}
