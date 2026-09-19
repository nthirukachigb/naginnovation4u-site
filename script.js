(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function collapse(img) {
    img.classList.add("is-broken");
    var figure = img.closest("figure");
    if (figure) {
      figure.classList.add("is-empty");
      var section = figure.closest("section");
      if (section) {
        section.classList.add("media-missing");
      }
    }
  }

  var images = document.querySelectorAll("img");
  Array.prototype.forEach.call(images, function (img) {
    if (img.complete && img.naturalWidth === 0) {
      collapse(img);
      return;
    }
    img.addEventListener("error", function () {
      collapse(img);
    });
  });
})();
