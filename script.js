let apiQuotes = [];

// SHOW NEW QUOTE
function newQuote() {
  // Pick a random quote from api quote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
}
// fetch quotes from API
async function getQuotes() {
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
//on load
getQuotes();
