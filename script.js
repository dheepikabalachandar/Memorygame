// declare the variables for game start
let cards = [];
let flippedCards = []; // array to hold currently flipped cards
let matchedPairs = 0; // counter for matched pairs

const cardsymbols = ['A', 'B', 'C','D','E','F','G','H'];

// Duplicate each symbol to  create pairs 
  cards =  cardsymbols.concat(cardsymbols);

// function to shuffle the cards array using Fisher-Yates algorithm 

function shuffle(array){
    for (let i = array.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i +1));
        [array[i], array[j]] = [array[j],array[i]];
    }
    return array;
}

// fun to initailize the game 

function initGame() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ''; 
    cards = shuffle(cards); 
    matchedPairs = 0 ; // reset the matched pairs 
    flippedCards = []; // reset the flipped cards array



     cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add ('card'); 
    card.dataset.symbol = symbol;   // store the symbol in the data 

    // flip animation 

    const cardInner = document.createElement('div');
    cardInner.classList.add("card-inner");



    // create the front face of card
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = symbol;


     // create the back face of card
     const cardBack = document.createElement("div");
     cardBack.classList.add ("card-back");

     // append front and back 
     cardInner.appendChild(cardFront);
     cardInner.appendChild(cardBack);

     card.appendChild(cardInner)
     
     card.addEventListener('click', handleCardClick)

     gameBoard.appendChild(card)

     });

}

function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    // prevent clicking same card twice or flipped more than two cards 
    if (flippedCards.length === 2 || clickedCard.classList.contains('flip')){
        return;   // exit the fun if condition are met
    }
    clickedCard.classList.add('flip');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2 ) {
        checkForMatch();
    }

}

// function to chk if flipped cards are match 
function checkForMatch(){
     const [card1, card2] = flippedCards;
     if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        flippedCards = [];

        if(matchedPairs === cardsymbols.length){
            setTimeout(() => alert('YOU WIN'), 500)
        }
     } else {
        setTimeout(()=> {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000 )
     }
}


document.getElementById('restart-btn').addEventListener('click',initGame)

window.onload = initGame;

