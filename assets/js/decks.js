const fetchedDecks = [];

function getDeckByID(id) {
  return fetchedDecks.find((deck) => deck._id === id);
}

export { fetchedDecks, getDeckByID };
