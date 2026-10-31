export { getDecks, getDeck, deleteDeck, addDeck };

const HEADERS = {
    "Content-Type": "application/json",
    Authorization: "01a114a1-7060-73fe-8075-1c12b4a553b3"
};

/**
 * Checks whether a fetch response came back ok, so every request in this
 * file doesn't need to repeat the same if/throw.
 *
 * @param {Response} response - The response to check.
 * @returns {Promise<*>} Resolves with the parsed JSON body if the response
 *   was ok, otherwise rejects with the response's status.
 */
function checkResponse(response) {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
}

/**
 * Fetches every deck belonging to the current user.
 *
 * @returns {Promise<object[]>} Resolves with an array of deck objects.
 */
async function getDecks() {
    const response = await fetch(`${baseUrl}/decks`, {
        headers: HEADERS
    });
    return checkResponse(response);
}

/**
 * Fetches a single deck by its id.
 *
 * @param {string} id - The deck's _id from the database.
 * @returns {Promise<object>} Resolves with the deck object.
 */
async function getDeck(id) {
    const response = await fetch(`${baseUrl}/decks/${id}`, {
        headers: HEADERS
    });
    return checkResponse(response);
}

/**
 * Deletes a deck by its id.
 *
 * @param {string} id - The deck's _id from the database.
 * @returns {Promise<object>} Resolves with the server's confirmation message.
 */
async function deleteDeck(id) {
    const response = await fetch(`${baseUrl}/decks/${id}`, {
        method: "DELETE",
        headers: HEADERS
    });
    return checkResponse(response);
}

/**
 * Creates a new deck.
 *
 * @param {object} deck - The deck to create.
 * @param {string} deck.name - The deck's name.
 * @param {string} deck.color - A hex color for the deck.
 * @param {object[]} deck.cards - The deck's cards.
 * @returns {Promise<object>} Resolves with the created deck, including its new _id.
 */
async function addDeck(deck) {
    const response = await fetch(`${baseUrl}/decks`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(deck)
    });
    return checkResponse(response);
}


const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";