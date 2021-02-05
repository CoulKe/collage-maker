"use strict";
var chooseLinks = document.querySelectorAll(".choose");
chooseLinks.forEach(function (link, index) {
    link.setAttribute("href", "upload.html?t=" + (index + 1));
});
