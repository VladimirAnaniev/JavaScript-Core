function elemelons() {
  class Melon {
    constructor(weight, sort) {
      if(new.target === Melon) {
        throw new Error("Abstract class cannot be instantiated directly")
      }
      this.weight = weight
      this.melonSort = sort
    }

    get elementIndex () {
      return this.weight * this.melonSort.length
    }

    toString () {
      return `Element: ${this.element}
Sort: ${this.melonSort}
Element Index: ${this.elementIndex}`
    }
  }

  class Watermelon extends Melon {
    constructor(weight, sort) {
      super(weight, sort)
      this.element = 'Water'
    }
  }

  class Firemelon extends Melon {
    constructor(weight, sort) {
      super(weight, sort)
      this.element = 'Fire'
    }
  }

  class Earthmelon extends Melon {
    constructor(weight, sort) {
      super(weight, sort)
      this.element = 'Earth'
    }
  }

  class Airmelon extends Melon {
    constructor(weight, sort) {
      super(weight, sort)
      this.element = 'Air'
    }
  }

  class Melolemonmelon extends Watermelon {
    constructor(weight, sort) {
      super(weight, sort)
    }

    morph () {
      if(this.element === 'Water') this.element = "Fire"
      else if(this.element === 'Fire') this.element = "Earth"
      else if(this.element === 'Earth') this.element = "Air"
      else if(this.element === 'Air') this.element = "Water"

      return this
    }
  }

  return {Melon, Airmelon, Earthmelon, Firemelon, Watermelon, Melolemonmelon}
}
let obj = elemelons()
let watermelon = new obj.Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());
