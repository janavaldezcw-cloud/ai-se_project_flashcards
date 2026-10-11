import { confirmDelete } from "./confirmation-modal.js";

const deckViewSection = document.querySelector("#deck-view");
const titleEl = deckViewSection.querySelector(".gallery__title");
const listEl = deckViewSection.querySelector(".gallery__list");
const flashcardTemplateEl = document.querySelector("#flashcard-template");

/**
 * Builds a flashcard list item for the open deck view, wiring up its flip
 * and delete buttons.
 *
 * @param {object} deck - The deck the card belongs to (used for its color).
 * @param {object} card - The card to render, with question/answer text.
 * @returns {HTMLElement} The populated flashcard <li> element.
 */
function createCardEl(deck, card) {
  const cloneEl = flashcardTemplateEl.content
    .querySelector("li")
    .cloneNode(true);
  cloneEl.style.setProperty("--card-color", deck.color);

  const cardTitleEl = cloneEl.querySelector(".card__title");
  cardTitleEl.textContent = card.question;
  let isFlipped = false;

  const flipBtn = cloneEl.querySelector(".card__action-btn_type_flip");
  flipBtn.addEventListener("click", () => {
    isFlipped = !isFlipped;
    cardTitleEl.textContent = isFlipped ? card.answer : card.question;
    cloneEl.classList.toggle("card_flipped", isFlipped);
  });

  const deleteBtn = cloneEl.querySelector(".card__action-btn_type_delete");
  deleteBtn.addEventListener("click", () => {
    confirmDelete(cloneEl);
  });

  return cloneEl;
}

/**
 * Renders the open deck view: the deck's name and all of its flashcards.
 *
 * @param {object} deck - The deck to display.
 * @returns {void}
 */
function renderDeckView(deck) {
  titleEl.textContent = deck.name;
  listEl.innerHTML = "";
  deck.cards.forEach((card) => {
    listEl.append(createCardEl(deck, card));
  });
}

export { renderDeckView };
