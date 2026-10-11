# Flash Cards

This is a flashcard app I built for my software engineering course. You can make
decks of cards, flip them to see the answer, and practice a deck one card at a
time like a slideshow.

**Live demo:** _add your GitHub Pages link here_
**Project pitch video:** https://drive.google.com/file/d/1P7OA6ibXlB2OV7ieT947ua1pSevKI9kY/view?usp=drive_link

## What it does

- **Home page** – shows all your decks, pulled live from a real database
  through an API (not hardcoded data anymore). Each one has a name, how many
  cards are in it, and a color. You can delete a deck (it asks you to
  confirm first so you don't do it by accident) - deleting actually removes
  it from the database too, not just the page.
- **Deck page** – click a deck to see all the cards in it. Click a card to
  flip it and see the answer, or delete it.
- **Practice mode** – goes through the deck one card at a time, kind of like
  a slideshow. Shows you which card you're on (like "Spanish Basics 2/4").
  Flipping a card shows the answer, and moving to the next card flips it back
  to the question.
- **New Deck page** – lets you create your own deck. Pick a color, paste in
  a JSON array of cards (matching the schema shown on the About page), and
  submit. If something's wrong with what you typed (bad JSON, missing
  fields, mismatched color) an error modal tells you what to fix instead of
  just silently failing.
- **About page** – explains the app and shows the JSON schema the New Deck
  form expects.
- Works on mobile too - the buttons stick to the bottom of the screen on
  smaller screens.
- If you go to a page/URL that doesn't exist it shows a little 404 page.


## Project structure

Everything HTML-wise is in one `index.html` file (all the views live there,
and JS shows/hides them). Styles are split up by component in `assets/css/`,
and each one gets imported into `assets/css/style.css`. JS is split up too:

- `index.js` - handles the routing (which page shows based on the URL) and
  the home page
- `api.js` - all the actual requests to the backend (get decks, get one
  deck, delete a deck, create a deck) live here
- `decks.js` - holds `fetchedDecks` (the array of decks we got from the
  API) and `getDeckByID`, which looks a deck up in that array
- `deck-view.js` - the page that shows one deck's cards
- `carousel.js` - the practice mode
- `new-deck-view.js` - the New Deck form: validating what you typed,
  showing errors, and creating the deck through the API
- `confirmation-modal.js` - the "are you sure you want to delete this"
  popup, used in a couple places so I didn't want to write it twice. Also
  where the actual delete request happens now
- `colorMap.js` - small helper that turns a color name into an actual hex code

Every named function in the project has a JSDoc comment above it explaining
what it does, its parameters, and what it returns.

## Routing

I used the URL hash to switch between pages instead of a real router:

- `#home` (or nothing) → home page
- `#about` → about page
- `#new-deck` → the new deck form
- `#deck/<id>` → that deck's page
- `#deck/<id>/practice` → practice mode for that deck
- anything else → 404 page

## Notes / what I'd still like to improve

This started from a starter template for a photo gallery project, so some of
the structure (like the BEM class names) comes from that. I ended up
reworking most of it to fit the flashcard idea instead.

Cards you add through the New Deck form don't actually save to the deck yet -
the API only seems to accept the deck's name/color on creation, not the
cards array, so new decks come back empty. Adding/editing/deleting individual
cards through the API is something I'd still like to add.
