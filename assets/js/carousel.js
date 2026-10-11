/**
 * Renders the practice (carousel) view for a deck and wires up its
 * navigation and flip buttons.
 *
 * @param {object} deck - The deck to practice.
 * @returns {void}
 */
function renderCarouselView(deck) {
  let currentIndex = 0;
  let isFlipped = false;

  const carouselEl = document.querySelector(".carousel");
  const titleEl = carouselEl.querySelector(".carousel__title");
  const cardEl = carouselEl.querySelector(".carousel__card");
  const textEl = carouselEl.querySelector(".carousel__text");
  const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
  const flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");

  /**
   * Visually disables a carousel arrow button.
   *
   * @param {HTMLButtonElement} buttonEl - The button to disable.
   * @returns {void}
   */
  function disableButton(buttonEl) {
    buttonEl.classList.add("carousel__btn_disabled");
    buttonEl.disabled = true;
  }

  /**
   * Visually enables a carousel arrow button.
   *
   * @param {HTMLButtonElement} buttonEl - The button to enable.
   * @returns {void}
   */
  function enableButton(buttonEl) {
    buttonEl.classList.remove("carousel__btn_disabled");
    buttonEl.removeAttribute("disabled");
  }

  /**
   * Enables or disables the left/right arrow buttons based on whether the
   * current card is the first or last in the deck.
   *
   * @returns {void}
   */
  function updateArrows() {
    if (currentIndex === 0) {
      disableButton(leftBtn);
    } else {
      enableButton(leftBtn);
    }

    if (currentIndex === deck.cards.length - 1) {
      disableButton(rightBtn);
    } else {
      enableButton(rightBtn);
    }
  }

  /**
   * Updates the title, card text/color, and arrow states to match the
   * current card and flip state.
   *
   * @returns {void}
   */
  function updateDisplay() {
    const card = deck.cards[currentIndex];

    titleEl.textContent =
      `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
    textEl.textContent = isFlipped ? card.answer : card.question;
    cardEl.classList.toggle("carousel__card_flipped", isFlipped);
    cardEl.style.setProperty("--card-color", deck.color);

    updateArrows();
  }

  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      isFlipped = false;
      updateDisplay();
    }
  });

  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      isFlipped = false;
      updateDisplay();
    }
  });

  flipBtn.addEventListener("click", () => {
    isFlipped = !isFlipped;
    updateDisplay();
  });

  updateDisplay();
}

export { renderCarouselView };
