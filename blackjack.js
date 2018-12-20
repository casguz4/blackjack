//Player Classes
class Card {
  constructor(suit, face){
    this.suit = suit;
    this.face = face;
  }

  compareCard(card){
    return this.face - card.face;
  }

  isAce(){
    return this.face === 'A';
  }
}

class Deck {
  constructor(){
    this.deck = [];

    const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const faces = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for(let suit in suits){
      for(let face in faces){
        this.deck.push(new Card(suits[suit], faces[face]));
      }
    }
  }

  shuffle(){
    const { deck } = this;
    let m = deck.length, i;

    while(m){
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return this;
  }
}

class Player {
  constructor() {
    this.hand = [];
    this.hadTurn = false;
  }

  get handValue(){
    let { hand } = this;
    let handValue = 0;

    for( let i = 0; i < hand.length; i++){
      if(hand[i].face === 'Jack' || hand[i].face === 'Queen' || hand[i].face === 'King'){
        handValue += 10;
      }else if(hand[i].face !== 'Ace'){
        handValue += hand[i].face;
      }else{
        handValue += hand[i].face;
      }
    }

    return handValue;
  }

  set handValue(value){
    this.handValue = value;
  }

  stand(){
    this.hand = true;
  }

  hit(deck){
    this.hand.push(deck.pop());
  }

  hasBlackJack(){
    return (this.hasAce() && this.hasFace()) ? true : false;
  }

  hasFace(){
    return this.hand.find( card => card.face === 10 || card.face === 'Jack' || card.face === 'Queen' || card.face === 'King' ) ? true : false;
  }

  hasAce(){
    return this.hand.find( card => card.face === 'Ace') ? true : false;
  }
}

//Game Methods
document.getElementById('new-game').addEventListener('click', () =>{
  //instantiate variables and objects
  let d = new Deck().shuffle();
  let tempD = new Deck().shuffle();
  let p = new Player();
  let dealer = new Player();

  const playerScore = document.getElementById('player-score');
  const dealerScore = document.getElementById('dealer-score');
  const endgame = document.getElementById('endgame');
  const modal = document.getElementById('ace-value-modal');
  const playerHand = document.getElementById('player-hand');

  d.deck = d.deck.concat(tempD.deck);
  d.shuffle();
  console.log(d);
  while(p.hand.length < 2){
    p.hit(d.deck);
  }
  
  console.log(p);
  //check for winner
  if(p.hasBlackJack()){
    console.log('checking black jack');
    playerScore.classList.remove('hidden').innerText('21');
    endgame.classList.remove('hidden').innerText('Player Wins!');
  }

  if(p.hasAce()){
    console.log('checking if player has Ace card and opening modal');
    modal.classList.remove('hidden');
  }

  playerHand.classList.remove('hidden');
  playerHand.innerHTML = playerHandTemplate(p.hand);
  console.log(`hand value is ${p.handValue}`);
});

function playerHandTemplate(hand){
    let template;
    for(let card of hand){
      template += `
        <div class="suit">${hand[card].suit}</div>
        <div class="face">${hand[card].face}</div>
      `;
    }
    return template;
}