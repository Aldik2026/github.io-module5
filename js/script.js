(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";
var allCategoriesUrl =
  "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

// Utility function
function insertHtml(selector, html) {
  document.querySelector(selector).innerHTML = html;
}

// Load HTML
function loadHomePage() {
  fetch(homeHtml)
    .then(response => response.text())
    .then(html => {
      fetch(allCategoriesUrl)
        .then(response => response.json())
        .then(categories => {
          var homeHtmlToInsert = buildAndShowHomeHTML(html, categories);
          insertHtml("#main-content", homeHtmlToInsert);
        });
    });
}

// ⭐ RANDOM CATEGORY FUNCTION
function chooseRandomCategory(categories) {
  var randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

// Build home HTML
function buildAndShowHomeHTML(html, categories) {

  // STEP 1: random category
  var randomCategory = chooseRandomCategory(categories);

  // STEP 2: short_name with quotes
  var randomCategoryShortName = "'" + randomCategory.short_name + "'";

  // STEP 3: replace placeholder
  html = html.replace("{{randomCategoryShortName}}", randomCategoryShortName);

  return html;
}

// Load menu items
dc.loadMenuItems = function (shortName) {
  document.querySelector("#main-content").innerHTML =
    "<h2>Loading category: " + shortName + "</h2>";
};

dc.loadHomePage = loadHomePage;

global.$dc = dc;

})(window);
