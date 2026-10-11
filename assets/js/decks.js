const fetchedDecks = [];

/**
 * Finds a deck in fetchedDecks by its id.
 *
 * @param {string} id - The deck's _id from the database.
 * @returns {object|undefined} The matching deck, or undefined if not found.
 */
function getDeckByID(id) {
  return fetchedDecks.find((deck) => deck._id === id);
}

export { fetchedDecks, getDeckByID };
