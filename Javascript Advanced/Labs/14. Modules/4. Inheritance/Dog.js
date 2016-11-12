import Entity from './Entity'

export default class Dog extends Entity {
  constructor(name){
    super(name)
  }

  saySomething() {
    return `${this.name} barks!`
  }
}