export { getDecks, getDeck, deleteDeck, addDeck };

const HEADERS = {
    "Content-Type": "application/json",
    Authorization: "01a114a1-7060-73fe-8075-1c12b4a553b3"
};
/**
 * Fetches every deck belonging to the current user.
 *
 * @returns {Promise<object[]>} Resolves with an array of deck objects.
 */
async function getDecks() {
    const response = await fetch(`${baseUrl}/decks`, {
        headers: HEADERS
    });
    if (!response.ok) {
        throw new Error("Failed to fetch decks");
    }
    return await response.json();
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
    if (!response.ok) {
        throw new Error("Failed to fetch deck");
    }
    return await response.json();
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
    if (!response.ok) {
        throw new Error("Failed to delete deck");
    }
    return await response.json();
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
    if (!response.ok) {
        throw new Error("Failed to add deck");
    }
    return await response.json();
}


const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";