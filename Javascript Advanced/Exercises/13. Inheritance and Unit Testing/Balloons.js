function balloons() {
  class Balloon {
    constructor(color, gasWeight){
      this.color = color
      this.gasWeight = gasWeight
    }
  }

  class PartyBalloon extends Balloon {
    constructor(color, gasWeight, ribbonColor, ribbonLength){
      super(color, gasWeight)
      this._ribbon = {ribbonColor, ribbonLength}
    }

    get ribbon() {
      return this._ribbon
    }
  }

  class BirthdayBalloon extends PartyBalloon {
    constructor(color, gasWeight, ribbonColor, ribbonLength, tint){
      super(color, gasWeight, ribbonColor, ribbonLength)
      this._tint = tint;
    }

    get tint() {
      return this._tint;
    }

    set tint(value) {
      this._tint = value;
    }

    explode() {
      console.log(`The ${this._tint} balloon with ${this.ribbon.ribbonColor} ribbon exploded!!`)
    }
  }

  return {Balloon, PartyBalloon, BirthdayBalloon}
} //60%

//----------------------------

