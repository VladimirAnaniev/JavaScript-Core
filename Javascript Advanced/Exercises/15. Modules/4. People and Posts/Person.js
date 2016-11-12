export default class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  addToSelector(selector) {
    let div = $(`<div class="person ${this.name}">`)
      .append($('<p class="name">').text(this.name))
      .append($('<p class="age">').text(this.age))
      .append($(`<div class="posts ${this.name}">`))

    $(selector).append(div)
  }
}