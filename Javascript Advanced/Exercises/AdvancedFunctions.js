(function sortArray(arr, method) {
  let ascCompare = (a, b) => a - b
  let descCompare = (a, b) => b - a

  let compareTypes = {
    'asc': ascCompare,
    'desc': descCompare
  }

  return arr.sort(compareTypes[method])
})()

// ---------------------

;
(function argumentInfo() {
  let summary = []

  for (let i = 0; i < arguments.length; i++) {
    let obj = arguments[i]
    let type = typeof obj
    console.log(`${type}: ${obj}`)

    if (!summary[type]) {
      summary[type] = 1
    } else {
      summary[type]++
    }
  }

  let sortedTypes = []
  for (let currentType in summary) {
    sortedTypes.push([currentType, summary[currentType]])
    console.log(`${currentType} = ${summary[currentType]}`)
  }
})()

// ---------------------

;
(function () {
  let total = 0
  return function sum(a) {
    total += a
    sum.toString = () => total
    return sum
  }
})()

// ---------------------

;
(function personalBMI(name, age, weight, height) {
  let obj = {}

  obj.name = name
  obj.personalInfo = {
    age,
    weight,
    height
  }
  obj.BMI = Math.round(weight / ((height / 100) * (height / 100)))

  let status
  if (obj.BMI < 18.5) status = 'underweight'
  else if (obj.BMI < 25) status = 'normal'
  else if (obj.BMI < 30) status = 'overweight'
  else status = 'obese'

  obj.status = status

  if (obj.status === 'obese') obj.recommendation = 'admission required'

  return obj
})()

// ---------------------

;
(function vectorMath() {
  return {
    add: function (v1, v2) {
      return [v1[0] + v2[0], v1[1] + v2[1]]
    },

    multiply: function (vec, scalar) {
      return [vec[0] * scalar, vec[1] * scalar]
    },

    length: function (vec) {
      return Math.sqrt((vec[0] * vec[0]) + (vec[1] * vec[1]))
    },

    dot: function (v1, v2) {
      return (v1[0] * v2[0]) + (v1[1] * v2[1])
    },

    cross: function (v1, v2) {
      return (v1[0] * v2[1]) - (v1[1] * v2[0])
    }
  }
})()

// ---------------------

;
(function breakfastRobot() {
  let stock = {
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    flavour: 0
  }

  let recipes = {
    apple: {
      protein: 0,
      carbohydrate: 1,
      fat: 0,
      flavour: 2
    },
    coke: {
      protein: 0,
      carbohydrate: 10,
      fat: 0,
      flavour: 20
    },
    burger: {
      protein: 0,
      carbohydrate: 5,
      fat: 7,
      flavour: 3
    },
    omelet: {
      protein: 5,
      carbohydrate: 0,
      fat: 1,
      flavour: 1
    },
    cheverme: {
      protein: 10,
      carbohydrate: 10,
      fat: 10,
      flavour: 10
    }
  }

  let functions = {
    restock: function (ingredients, quantity) {
      stock[ingredients] += Number(quantity)
      return 'Success'
    },
    prepare: function (str, quantity) {
      quantity = Number(quantity)
      let recipe = recipes[str]

      let proteinReq = recipe.protein * quantity
      let carbReq = recipe.carbohydrate * quantity
      let fatReq = recipe.fat * quantity
      let flavourReq = recipe.flavour * quantity

      if (stock.protein >= proteinReq) {
        if (stock.carbohydrate >= carbReq) {
          if (stock.fat >= fatReq) {
            if (stock.flavour >= flavourReq) {
              stock.protein -= proteinReq
              stock.carbohydrate -= carbReq
              stock.fat -= fatReq
              stock.flavour -= flavourReq
              return 'Success'
            } else return 'Error: not enough flavour in stock'
          } else return 'Error: not enough fat in stock'
        } else return 'Error: not enough carbohydrate in stock'
      } else return 'Error: not enough protein in stock'
    },

    report: function () {
      return `protein=${stock.protein} carbohydrate=${stock.carbohydrate} fat=${stock.fat} flavour=${stock.flavour}`
    }
  }

  return function (input) {
    let [func, p1, p2] = input.split(' ')
    return functions[func](p1, p2)
  }
})()

// ---------------------

/* ;(function monkeyPatcher () {
  let commands = {
    upvote: function () {
      this.upvotes++
    },
    downvote: function () {
      this.downvotes++
    },
    report: function () {
      let totalVotes = this.upvotes + this.downvotes

      let addedVotes = 0
      if (totalVotes > 50) {
        addedVotes = Math.round(Math.max(this.upvotes, this.downvotes) / 4)
      }

      let afterUpvotes = this.upvotes + addedVotes
      let afterDownvotes = this.downvotes + addedVotes
      let rating = Math.abs(afterDownvotes - afterUpvotes)

      let status
      if (totalVotes < 10) {
        status = 'new'
      } else if (rating < 0) {
        status = 'unpopular'
      }
      return
    }
  }

  return function () {

  }
})()*/

function euclidus(a, b) {
  if (b === 0) {
    return a
  } else {
    return euclidus(b, a % b)
  }
}

console.log(euclidus(252, 105))
