import Turtle from './Turtle'

export default class NinjaTurtle extends Turtle {
  constructor(name, age, gender, maskColor, weapon) {
    super(name, age, gender)
    this.maskColor = maskColor
    this.weapon = weapon
    this.level = 0;
  }

  grow(age) {
    this.level = this.level+age
    super.grow(age)
  }

  toString() {
    let addition =''
    if(this.level<25) addition = `\n${this.name.substring(0,3)} wears a ${this.maskColor} mask, and is an apprentice with the ${this.weapon}.`
    else if(this.level<100) addition = `\n${this.name.substring(0,3)} wears a ${this.maskColor} mask, and is smokin strong with the ${this.weapon}.`
    else addition = `\n${this.name.substring(0,3)} wears a ${this.maskColor} mask, and is BEYOND GODLIKE with the ${this.weapon}.`

    return super.toString() + addition
  }
}