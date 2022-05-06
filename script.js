const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// fetching data from api using async await
let apiQuotes = [];

//show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loader
function loadingComplete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// SHOW NEW QUOTE
function newQuote() {
  loading();
  // Pick a random quote from api quote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if author field is blank and replace with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // set quote and hide the loader
  quoteText.textContent = quote.text;
  loadingComplete();
}
// fetch quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    //  this constant will not  be populated until it has some data fetched from our API
    const response = await fetch(apiUrl);
    // global var getting the JSON from the api and turning the response into a JSON object and pass it to this global var
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    //Handle error
    console.log(err);
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//on load
getQuotes();
