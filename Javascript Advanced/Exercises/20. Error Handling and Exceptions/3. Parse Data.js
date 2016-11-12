function parseData (input) {
  class Candy {
    constructor(topping, filling, spice){
      if(topping==null || (topping!='milk chocolate' && topping != 'white chocolate' && topping != 'dark chocolate'))
        throw new TypeError()

      if(filling!=null) {
          if(filling.split(',').length>3) throw new TypeError()
          for (let fill of filling.split(',')) {
            if(fill!='hazelnut' && fill!='caramel' && fill!='strawberry' && fill!='blueberry' && fill!='yogurt' && fill!='fudge')
              throw new TypeError()
          }
      }

      if(spice=='poison' || spice=='asbestos') throw new TypeError()

      this.topping = topping
      this.filling = filling
      this.spice = spice
    }
  }

  let candies = []
  for(let line of input) {
    let [topping, fillings, spice] = line.split(':')

    if(topping == '') topping = null

    if(fillings == '') fillings = null

    if(spice == '') spice = null

    try{
      candies.push(new Candy(topping, fillings, spice))
    }
    catch(err) {
      //do nothing
    }
  }

  return candies

}