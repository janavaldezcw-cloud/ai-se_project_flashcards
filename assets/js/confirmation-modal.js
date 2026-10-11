import { deleteDeck } from "./api.js";
import { fetchedDecks } from "./decks.js";

const confirmationModalEl = document.querySelector("#confirmation-modal");
const cancelBtn = confirmationModalEl.querySelector(".modal__btn_type_cancel");
const confirmBtn = confirmationModalEl.querySelector(
  ".modal__btn_type_confirm",
);

let currentCardEl = null;
let currentDeckId = null;

cancelBtn.addEventListener("click", () => {
  confirmationModalEl.classList.remove("modal_visible");
  currentCardEl = null;
  currentDeckId = null;
});

confirmBtn.addEventListener("click", () => {
  if (!currentDeckId) {
    currentCardEl.remove();
    confirmationModalEl.classList.remove("modal_visible");
    currentCardEl = null;
    return;
  }

  deleteDeck(currentDeckId)
    .then(() => {
      currentCardEl.remove();
      const index = fetchedDecks.findIndex(
        (deck) => deck._id === currentDeckId,
      );
      if (index !== -1) {
        fetchedDecks.splice(index, 1);
      }
      confirmationModalEl.classList.remove("modal_visible");
      currentCardEl = null;
      currentDeckId = null;
    })
    .catch((error) => {
      console.error(error);
    });
});

function confirmDelete(cardEl, deckId) {
  currentCardEl = cardEl;
  currentDeckId = deckId || null;
  confirmationModalEl.classList.add("modal_visible");
}

export { confirmDelete };
