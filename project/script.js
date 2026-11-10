"use strict";
const detailsPanel = document.querySelector("#details-panel");
const cards = document.querySelectorAll(".collection-card");
const filterButtons = document.querySelectorAll(".filter-button");
const detailsTitle = document.querySelector("#details-title");
const detailsDescription = document.querySelector("#details-description");
const initialTitle = detailsTitle.textContent;
const initialDescription = detailsDescription.textContent;
const randomButton = document.querySelector("#random-button");
const resetButton = document.querySelector("#reset-button");
const historyList = document.querySelector("#history-list");
let recent = [];
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
    const title = card.dataset.title;
    if (recent.indexOf(title) !== -1) {
        recent.splice(recent.indexOf(title), 1);
    }
    recent.unshift(title);
    if (recent.length > 3) {
        recent.pop();
    }
    renderHistory();
}
function resetAll() {
    cards.forEach(function (card) {
        card.classList.remove("collection-card--hidden");
        card.classList.remove("collection-card--selected");
        card.setAttribute("aria-pressed", "false");
    });
    filterButtons.forEach(function (button) {
        button.classList.remove("filter-button--active");
        button.setAttribute("aria-pressed", "false");
    });
    const allButton = document.querySelector('[data-filter="all"]');
    allButton.classList.add("filter-button--active");
    allButton.setAttribute("aria-pressed", "true");
    document.querySelector("#visible-count").textContent = cards.length;
    detailsTitle.textContent = initialTitle;
    detailsDescription.textContent = initialDescription;
        recent = [];
    renderHistory();}

resetButton.addEventListener("click", resetAll);
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        resetAll();
    }

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const visible = [];
        cards.forEach(function (card) {
            if (!card.classList.contains("collection-card--hidden")) {
                visible.push(card);
            }
        });

        const current = visible.findIndex(function (card) {
            return card.classList.contains("collection-card--selected");
        });

        let next;
        if (event.key === "ArrowRight") {
            next = (current + 1) % visible.length;
        } else {
            next = (current - 1 + visible.length) % visible.length;
        }
        selectCard(visible[next]);
    }
});
function renderHistory() {
    historyList.textContent = "";
    recent.forEach(function (title) {
        const li = document.createElement("li");
        li.textContent = title;
        historyList.append(li);
    });
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