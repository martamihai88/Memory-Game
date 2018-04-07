// Array of cards

const cardHolder = ['fa-diamond',
                    'fa-paper-plane-o',
                    'fa-anchor',
                    'fa-bolt',
                    'fa-cube',
                    'fa-leaf',
                    'fa-bicycle',
                    'fa-bomb',
                    'fa-diamond',
                    'fa-paper-plane-o',
                    'fa-anchor',
                    'fa-bolt',
                    'fa-cube',
                    'fa-leaf',
                    'fa-bicycle',
                    'fa-bomb'];

//  all cards in game
const deck = document.getElementById('cardsDeck');
//  open cards 
let openCards = [];

// set timer variables
let start = false;
var clearTime; var seconds = 0, minutes = 0; var secs, mins; 

// shuffle cards
const cards = shuffle(cardHolder);

// variable to hold moves
let count = 0;

// start the game
startGame(); 

// function to start game
function startGame() {
    generateDeck(); // generate deck
    card_listener() // listen for events (beginning of the game)
}

// Shuffle function from http://stackoverflow.com/a/2450976  
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// Deck generator
function generateDeck() {
    const store_1 = document.getElementById('cardsDeck');
    
    for(let i = 0; i < 16; i++) {
        const el_deck = document.createElement('li');
        el_deck.classList.add("card");
        store_1.appendChild(el_deck);
    }
    
    const store_2 = document.getElementsByClassName('card');
    
    for(let i = 0; i < store_2.length; i++) {
        const card_2 = document.createElement('i');
        card_2.classList.add("fa", cards[i], "no-click");
        store_2[i].appendChild(card_2);
    }
};

// Card event listener 
function card_listener(evt) {
    function clicked_card (evt) {
        const card = evt.target;
        
        if(card.className == "card open show" || card.id == "cardsDeck"){
          
        } else {
            card.classList.add("open", "show");
            openCards.push(card);
            count++;
            startTimer();  // start the timer
        }
        starter(); //  start move counter and compare cards          
    }                          
    deck.addEventListener('click', clicked_card);
};

const starter = () => {
    if(openCards.length > 1){  
        moves(); // start to count moves
        noEvent(); //cancel all click events
        animate(); // animate cards
        delayedAnimation(); //remove animation from cards
        delayedCompare(); // call delayed function to compare cards
       }  
};

// function to delay compare cards
const delayedCompare = () => {
    const timeOut = window.setTimeout(compare, 700);
};

// function to compare cards
const compare = () => {
    if(openCards[0].innerHTML === openCards[1].innerHTML ) {
        openCards[0].classList.replace("open", "match");    
        openCards[1].classList.replace("open", "match"); 
    }else {
        
        openCards[0].classList.remove("show", "open");
        openCards[1].classList.remove("show", "open"); 
    } 
    openCards.length = 0; //remove cards from list
    event(); // start all click events
    win(); // check to see if game is finished and display wining message
};

// delay animation of cards
const delayedAnimation = () => {
    const timeOut = window.setTimeout(removeAnimate, 500);
};

// animate cards
const animate = () => {
    openCards[0].classList.add("animate");
    openCards[1].classList.add("animate");
    
};

const removeAnimate = () => {
    openCards[0].classList.remove("animate");
    openCards[1].classList.remove("animate");
}

// function to count moves
const moves = () => {
       const mv = document.querySelector('span');
       mv.textContent = count / 2;  
       stars();
};

// function to display rating
const stars = () => {
    const star =document.querySelector('.stars');
    
    if (count / 2 === 11) {
        star.removeChild(star.firstElementChild);
    } else if(count / 2 === 21) {
        star.removeChild(star.firstElementChild);
    }
};

// function to start timer
const startTimer = () => {
	if (!start) { 
		timer(); 
		start = true; 
        
    }
};

// function to count time
const timer = () => {
    if ( seconds === 60 ) { seconds = 0; minutes = minutes + 1; } 
    mins = ( minutes < 10 ) ? ( '0' + minutes + ': ' ) : ( minutes + ': ' ); 
    if ( minutes === 60 ) { minutes = 0;}
     secs = ( seconds < 10 ) ? ( '0' + seconds ) : ( seconds ); 
     const time = document.getElementById("timer"); time.innerHTML = 'Time: '+ mins + secs; 
    seconds++; 
    clearTime = setTimeout( "timer()", 1000 ); 
};

// stop events
const noEvent = () => deck.classList.add("no-click");
;

//start events
const event = () => deck.classList.remove("no-click");

// variables for modal
var modal; 
var message;

// finish game function
const win = () => {
    let winning = document.getElementsByClassName('match');

    if (winning.length === 16) {
        clearTimeout(clearTime);
        while (deck.firstChild) {
        deck.removeChild(deck.firstChild);  
    }   
        deck.classList.add("no-click"); //remove events from deck
        
        //create modal
        modal = document.createElement('div');
        modal.classList.add("modal")
        deck.appendChild(modal);
        
        // create wining message
        message = document.createElement('h2');
        message.innerHTML = "You Won <br> Congratulations <br> You're time was: " + mins + secs + "<br> Your rating was: ";
        modal.appendChild(message);
        message.classList.add("modal-content");
        
        // display rating
        const stars = document.querySelector('.stars');
        const starsClone = stars.cloneNode(true);
        message.appendChild(starsClone);  
        
        playAgain();  // ask to play again
    }
};

// ask player to play again function
const playAgain = () => {  
    
    const again = document.createElement('p');
    again.innerHTML = "Would you like to play again?";
    message.appendChild(again);
    
    //create button
    const button = document.createElement("input");
    button.type = "button";
    button.value = "Yes";
    again.appendChild(button);
    button.classList.add("btn")
    button.setAttribute("onclick", "window.location.reload()");  
};