/**
 * Makes a popup/modal element visible.
 *
 * @param {HTMLElement} popupEl - The popup element to show.
 * @returns {void}
 */
function openPopup(popupEl) {
  popupEl.classList.add("modal_visible");
}

/**
 * Hides a popup/modal element.
 *
 * @param {HTMLElement} popupEl - The popup element to hide.
 * @returns {void}
 */
function closePopup(popupEl) {
  popupEl.classList.remove("modal_visible");
}

export { openPopup, closePopup };
