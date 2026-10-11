import { fetchedDecks, getDeckByID } from "./decks.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";
import { confirmDelete } from "./confirmation-modal.js";
import { disableSubmitBtn } from "./new-deck-view.js";
import { getDecks, getDeck } from "./api.js";

const pageEl = document.querySelector(".page");
const homeSection = document.querySelector("#home");
const carouselSection = document.querySelector("#carousel");
const deckViewSection = document.querySelector("#deck-view");
const aboutSection = document.querySelector("#about");
const newDeckViewSection = document.querySelector("#new-deck-view");
const notFoundSection = document.querySelector("#not-found");

const homeListEl = homeSection.querySelector(".gallery__list");
const deckTemplateEl = document.querySelector("#deck-template");

let currentDeck = null;

const practiceBtn = deckViewSection.querySelector(".gallery__practice-btn");
practiceBtn.addEventListener("click", () => {
  if (currentDeck) {
    window.location.hash = `deck/${currentDeck._id}/practice`;
  }
});

const newDeckBtn = document.querySelector("#home .gallery__new-card-btn");
newDeckBtn.addEventListener("click", () => {
  window.location.hash = "new-deck";
});

/**
 * Builds a deck list item for the home view, wiring up its link and delete
 * button.
 *
 * @param {object} deck - The deck to render.
 * @returns {HTMLElement} The populated deck <li> element.
 */
function createDeckEl(deck) {
  const cloneEl = deckTemplateEl.content.querySelector("li").cloneNode(true);
  cloneEl.style.setProperty("--card-color", deck.color);

  const linkEl = cloneEl.querySelector(".card__link");
  linkEl.href = `#deck/${deck._id}`;
  linkEl.setAttribute("aria-label", `Open ${deck.name} deck`);

  cloneEl.querySelector(".card__title").textContent = deck.name;
  cloneEl.querySelector(".card__count").textContent =
    `${deck.cards.length} cards`;

  const deleteBtn = cloneEl.querySelector(".card__action-btn_type_delete");
  deleteBtn.addEventListener("click", () => {
    confirmDelete(cloneEl, deck._id);
  });

  return cloneEl;
}

/**
 * Renders the home view's deck list from fetchedDecks.
 *
 * @returns {void}
 */
function renderHomeView() {
  homeListEl.innerHTML = "";
  fetchedDecks.forEach((deck) => {
    homeListEl.append(createDeckEl(deck));
  });
}

/**
 * Hides every page section and resets the shared page-level modifier
 * classes, so router() can show just the one section a route needs.
 *
 * @returns {void}
 */
function hideAllSections() {
  homeSection.style.display = "none";
  carouselSection.style.display = "none";
  deckViewSection.style.display = "none";
  aboutSection.style.display = "none";
  newDeckViewSection.style.display = "none";
  notFoundSection.style.display = "none";
  pageEl.classList.add("page_no-mobile-bar");
  pageEl.classList.remove("page_location_carousel");
}

/**
 * Reads the current URL hash and shows whichever section/view matches it:
 * home, about, the new deck form, a deck's practice view, a deck's open
 * view, or the 404 view as a fallback.
 *
 * @returns {void}
 */
function router() {
  const hash = window.location.hash.slice(1) || "home";
  const practiceMatch = hash.match(/^deck\/(.+)\/practice$/);
  const deckMatch = hash.match(/^deck\/(.+)$/);

  hideAllSections();

  if (hash === "home" || hash === "") {
    pageEl.classList.remove("page_no-mobile-bar");
    homeSection.style.display = "block";
    renderHomeView();
  } else if (hash === "about") {
    aboutSection.style.display = "block";
  } else if (hash === "new-deck") {
    newDeckViewSection.style.display = "block";
    disableSubmitBtn();
  } else if (practiceMatch) {
    const deck = getDeckByID(practiceMatch[1]);
    if (deck) {
      currentDeck = deck;
      pageEl.classList.add("page_location_carousel");
      carouselSection.style.display = "block";
      renderCarouselView(deck);
    } else {
      notFoundSection.style.display = "flex";
    }
  } else if (deckMatch) {
    const deck = getDeckByID(deckMatch[1]);
    if (deck) {
      currentDeck = deck;
      pageEl.classList.remove("page_no-mobile-bar");
      deckViewSection.style.display = "block";
      renderDeckView(deck);
    } else {
      notFoundSection.style.display = "flex";
    }
  } else {
    notFoundSection.style.display = "flex";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getDecks()
    .then((data) => {
      fetchedDecks.push(...data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      router();
    });
});
window.addEventListener("hashchange", router);
