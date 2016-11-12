export default class Post {
  constructor(title, body, author) {
    this.title = title
    this.body = body
    this.author = author
  }

  addToSelector(selector) {
    let div = $(`<div class="post ${this.author}">`)
      .append($('<h3 class="title">').text(this.title))
      .append($('<p class="body">').text(this.body))
      .append($(`<p class="author">`).text(this.author))

    $(selector).append(div)
  }
}