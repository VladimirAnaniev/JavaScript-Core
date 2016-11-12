function printDeckOfCards(cards) {
  class Card {
    constructor(face, suit) {
      this.suit = suit
      this.face = face
    }

    set suit(suit) {
      if(suit!='S'&&suit!='H'&&suit!='D'&&suit!='C') throw new Error()
      this._suit = suit
    }

    get suit() {
      return this._suit
    }

    set face(face) {
      if(!(face>=2 && face<=10) && face!='J' &&face!='K' && face!='Q' && face!='A') throw new Error()
      this._face = face
    }

    get face() {
      return this._face
    }

    toString() {
      let suit =''
      if(this.suit=='S') suit = '\u2660 '
      else if(this.suit=='H') suit = '\u2665'
      else if (this.suit=='D') suit = '\u2666'
      else if(this.suit =='C') suit = '\u2663'

      return this.face+suit
    }
  }

  let returnStr = ''

  for(let card of cards) {
    let face = card.substring(0, card.length-1)
    let suit = card[card.length-1]



    try{
      returnStr+= new Card(face, suit) + ' '
    }
    catch (err) {
     console.log( 'Invalid card: ' + card)
      return
    }
  }

  console.log(returnStr)
}
