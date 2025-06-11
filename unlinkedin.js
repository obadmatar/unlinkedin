// Tracks the current card index to avoid reprocessing already-handled connections
var cardIndex = 0;

// Short-hand for document.querySelectorAll
const query = document.querySelectorAll.bind(document);

// CSS selectors for various UI elements
const messageBtnSelector = '.entry-point';
const sortBtnSelector = '.mn-connections__actions-container button';
const sortOptionSelector = '.artdeco-dropdown__content-inner li';
const cardDropdownSelector = 'button.mn-connection-card__dropdown-trigger';
const cardDropdownItemSelector = '.mn-connection-card__dropdown-item button';
const documentModalBtnSelector = '.artdeco-modal__actionbar--confirm-dialog button.artdeco-button--primary';
const removeButtonSelector = '.remove-connection-btn';
const removeButtonStyle = 'remove-connection-btn artdeco-button artdeco-button--2 artdeco-button--primary ember-view';

// Attach listeners to the sort menu so the UI refresh triggers re-binding
function addSortListener() {
  query(sortBtnSelector)[0].addEventListener('click', function() {
    setTimeout(function() {
      query(sortOptionSelector).forEach(sortBtn => {
        sortBtn.addEventListener('click', function() {
          console.log('Sort clicked', sortBtn);
          cardIndex = 0; // Reset card index to reprocess all cards
          start();       // Re-run the main handler
        }, 1000);
      });
    }, 500);
  });
}

// Handles removing a LinkedIn connection card
function remove(card) {
  console.log("Card", card);
  console.log("Triggering connection card dropdown");

  // Trigger the card's dropdown menu
  card.querySelectorAll(cardDropdownSelector)[0].click();

  // Wait for the dropdown items to render, then click the 'Remove' option
  const cardDropdownItemInterval = setInterval(function() {
    if (query(cardDropdownItemSelector).length > 0) {
      query(cardDropdownItemSelector)[0].click();
      console.log("Card dropdown item clicked");
      clearInterval(cardDropdownItemInterval);
    }
  }, 10);

  // Wait for confirmation modal, then confirm removal
  const documentModalBtnInterval = setInterval(function() {
    if (query(documentModalBtnSelector).length > 0) {
      query(documentModalBtnSelector)[0].click();
      console.log("Doc modal button clicked");
      clearInterval(documentModalBtnInterval);
      cardIndex--; // Reprocess current index in case DOM updates slowly
    }
  }, 10);
}

// Adds a custom "Remove" button to each connection card
function addRemoveButton(card) {
  if (card.querySelector(removeButtonSelector) != null) {
    return; // Skip if already added
  }
  const btn = document.createElement("button");
  btn.className = removeButtonStyle;
  btn.innerHTML = "Remove";
  card.querySelector(".mn-connection-card__action-container").appendChild(btn);
  console.log("Remove button added successfully");
}

// Core runner that loops through visible connection cards and decorates them
function run() {
  const cards = query(".mn-connection-card");
  console.log("Total cards: ", cards.length);
  if (cards.length - 1 <= cardIndex) {
    return;
  }

  while (cardIndex < cards.length) {
    const c = cards[cardIndex];
    addRemoveButton(c);
    c.querySelectorAll(messageBtnSelector).forEach(e => e.style.display = 'none'); // Hide message button
    c.querySelectorAll(cardDropdownSelector).forEach(e => e.style.display = 'none'); // Hide original dropdown
    c.querySelectorAll(removeButtonSelector).forEach(e =>
      e.addEventListener('click', () => remove(c))
    );
    cardIndex++;
  }
}

// Waits until the LinkedIn connections page is fully loaded, then starts processing
function start() {
  const interval = setInterval(function() {
    const connectionCards = query(".mn-connection-card");
    const actionContainer = query(".mn-connections__actions-container");
    if (connectionCards.length > 0 && actionContainer.length > 0) {
      console.log("Document loaded");
      clearInterval(interval);
      addSortListener();
      run();
    }
  }, 100);
}

// Periodically check if new cards were added (e.g., after scrolling) and run again
const cardsInterval = setInterval(function() {
  const connectionCards = query(".mn-connection-card");
  if (connectionCards.length - 1 > cardIndex) {
    run();
  }
}, 10000);

// Initial start
start();

