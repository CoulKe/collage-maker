let chooseLinks = document.querySelectorAll(".choose");

chooseLinks.forEach((link, index) => {
  link.setAttribute("href", `upload.html?t=${index + 1}`);
});
