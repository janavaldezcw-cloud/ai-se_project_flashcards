import { fetchedDecks } from "./decks.js";
import { addDeck } from "./api.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

/**
 * Returns a consistent lowercase hex color string with a leading "#".
 * Accepts values with or without a leading "#". Returns "#64d583" as a
 * fallback if the value is missing or not a valid 6-digit hex.
 *
 * @param {string|undefined} color
 * @returns {string}
 */
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}

/**
 * Checks that a deck name is a string between 2 and 80 characters.
 *
 * @param {*} name - The value to validate.
 * @returns {string|null} The name if valid, otherwise null.
 */
function validateName(name) {
  if (typeof name != "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

/**
 * Safely parses a JSON string, without throwing on invalid input.
 *
 * @param {string} jsonString - The raw text to parse.
 * @returns {*} The parsed value, or null if the string isn't valid JSON.
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

const formEl = document.querySelector("#new-deck-form");
const submitBtn = formEl.querySelector(".new-deck-view__submit-btn");
const textareaEl = formEl.querySelector(".new-deck-view__textarea");

const errorModalEl = document.querySelector("#error-modal");
const errorCloseBtn = errorModalEl.querySelector(".modal__btn_type_cancel");
const errorMessageEl = errorModalEl.querySelector(".modal__error");

errorCloseBtn.addEventListener("click", () => {
  errorModalEl.classList.remove("modal_visible");
});

/**
 * Displays the error modal with a given message.
 *
 * @param {string} message - The message to show the user.
 * @returns {void}
 */
function showError(message) {
  errorMessageEl.textContent = message;
  errorModalEl.classList.add("modal_visible");
}

/**
 * Enables the new deck form's submit button. Called once the new deck view
 * is actually showing, since the button starts disabled in the HTML.
 *
 * @returns {void}
 */
function disableSubmitBtn() {
  submitBtn.disabled = false;
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const values = Object.fromEntries(formData);
  const colorValue = normalizeColor(values["deck-color"]);

  const jsonData = parseJSON(textareaEl.value);
  if (!jsonData) {
    showError(
      "That doesn't look like valid JSON. Please check the formatting and try again.",
    );
    return;
  }

  const name = validateName(jsonData.name);
  if (!name) {
    showError("Please provide a deck name between 2 and 80 characters.");
    return;
  }

  if (!Array.isArray(jsonData.cards)) {
    showError('The deck must include a "cards" field that is an array.');
    return;
  }

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== colorValue
  ) {
    showError(
      `The color in your JSON ("${jsonData.color}") doesn't match the color you selected. Pick the same color or remove the "color" field from the JSON.`,
    );
    return;
  }

  const deck = {
    color: colorValue,
    name,
    cards: jsonData.cards,
  };

  addDeck(deck)
    .then((newDeck) => {
      fetchedDecks.push(newDeck);
      window.location.hash = "deck/" + newDeck._id;
    })
    .catch((error) => {
      console.error(error);
      showError("Something went wrong creating the deck. Please try again.");
    });
});

export { disableSubmitBtn };
