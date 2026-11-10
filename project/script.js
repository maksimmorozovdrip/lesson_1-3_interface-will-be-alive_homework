"use strict";
const detailsPanel = document.querySelector("#details-panel");
const cards = document.querySelectorAll(".collection-card");
cards.forEach(function (card) {
  card.addEventListener("click", function () {
    selectCard(card);
  });
});

function selectCard(card) {
     cards.forEach(function (c) {
      c.classList.remove("collection-card--selected");
    c.setAttribute("aria-pressed", "false");
    });
         card.classList.add("collection-card--selected");
  card.setAttribute("aria-pressed", "true");
 document.querySelector("#details-title").textContent = card.dataset.title;
document.querySelector("#details-description").textContent = card.dataset.description;
  detailsPanel.classList.add("details-panel--pulse"); 
}
detailsPanel.addEventListener("animationend", function () {
  detailsPanel.classList.remove("details-panel--pulse");
});