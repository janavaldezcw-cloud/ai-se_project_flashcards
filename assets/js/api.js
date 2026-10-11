export { getDecks, getDeck, deleteDeck, addDeck };

const HEADERS = {
    "Content-Type": "application/json",
    Authorization: "01a114a1-7060-73fe-8075-1c12b4a553b3"
};
async function getDecks() {
    const response = await fetch(`${baseUrl}/decks`, {
        headers: HEADERS
    });
    if (!response.ok) {
        throw new Error("Failed to fetch decks");
    }
    return await response.json();
}

async function getDeck(id) {
    const response = await fetch(`${baseUrl}/decks/${id}`, {
        headers: HEADERS
    });
    if (!response.ok) {
        throw new Error("Failed to fetch deck");
    }
    return await response.json();
}

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