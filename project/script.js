"use strict";
const detailsPanel = document.querySelector("#details-panel");
const cards = document.querySelectorAll(".collection-card");
const filterButtons = document.querySelectorAll(".filter-button");
const detailsTitle = document.querySelector("#details-title");
const detailsDescription = document.querySelector("#details-description");
const initialTitle = detailsTitle.textContent;
const initialDescription = detailsDescription.textContent;
const randomButton = document.querySelector("#random-button");
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
    detailsTitle.textContent = card.dataset.title;
    detailsDescription.textContent = card.dataset.description;
    detailsPanel.classList.add("details-panel--pulse");
}
detailsPanel.addEventListener("animationend", function () {
    detailsPanel.classList.remove("details-panel--pulse");
});

function applyFilter(filter) {
    let count = 0;
    cards.forEach(function (card) {
        if (card.dataset.category === filter) {
            card.classList.remove("collection-card--hidden");
            count++;
        } else if (filter === "all") {
            card.classList.remove("collection-card--hidden");
            count++;
        } else {
            if (card.classList.contains("collection-card--selected")) {
                card.classList.remove("collection-card--selected");
                card.setAttribute("aria-pressed", "false");
                detailsTitle.textContent = initialTitle;
                detailsDescription.textContent = initialDescription;
            }
            card.classList.add("collection-card--hidden");
        }
    });
    document.querySelector("#visible-count").textContent = count;

}


filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.dataset.filter;
        filterButtons.forEach(function (b) {
            b.classList.remove("filter-button--active");
            b.setAttribute("aria-pressed", "false");
        });
        button.classList.add("filter-button--active");
        button.setAttribute("aria-pressed", "true");
        applyFilter(filter);
    });
});


randomButton.addEventListener("click", function () {
    let options = [];

    cards.forEach(function (card) {
        if (!card.classList.contains("collection-card--hidden") && !card.classList.contains("collection-card--selected")) {
            options.push(card);
        }
    });
    if (options.length > 0) {
        const randomCard = options[Math.floor(Math.random() * options.length)];
        selectCard(randomCard);
    }
});