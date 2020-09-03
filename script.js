const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let state = { count: 0, err: 'API is down :(' };
// show loading
function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}
// hide loading
function removeLoadingSpinner() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}
// getQuote from API
async function getQuote() {
	// showLoadingSpinner();
	loader.hidden = true;
	const proxyURL = `https://cors-anywhere.herokuapp.com/`;
	const apiURL = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=eng&format=json`;
	try {
		const response = await fetch(proxyURL + apiURL);
		const data = await response.json();
		// if author is blank add unknown
		if (data.quoteAuthor === '') {
			authorText.innerText = 'Unknown';
		} else {
			authorText.innerText = data.quoteAuthor;
		}
		// authorText.innerText = data.quoteAuthor;
		// reduce font size for long quotes
		if (data.quoteText.length > 120) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}

		quoteText.innerText = data.quoteText;
		// stop loader show quote
		// complete();
		// removeLoadingSpinner();
	} catch (error) {
		state.count++;
		console.log('The API is temporarily down. Please try again later');
		quoteText.innerText = state.err;
		authorText.innerText = '';
		// getQuote();
		// quoteText.innerText = 'Too Many request';
		// console.log(`No Quote, ${error}`);
	}
}

// tweet quote
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}
// event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
// on Load

getQuote();
if (state.count > 0) {
}
