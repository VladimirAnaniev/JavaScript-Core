import Turtle from './Turtle'

export default class EvkodianTurtle extends Turtle {
  constructor(name, age, gender, evkodiumValue) {
    super(name, age, gender)
    this._evkodiumValue = evkodiumValue
  }

  get evkodium () {
    return {
      value : this._evkodiumValue,
      density: this.gender=='male' ? 3*this.age : 2* this.age
    }
  }

  toString () {
    return super.toString() + `\nEvkodium: ${this.evkodium.value*this.evkodium.density}`
  }
}