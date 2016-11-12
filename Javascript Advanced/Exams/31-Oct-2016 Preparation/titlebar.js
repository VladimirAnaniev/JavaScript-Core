class Titlebar {
  constructor(title){
    this.html = $('<header class="header">')
      .append($('<div class="header-row">')
        .append($('<a class="button">').text('&#9776;'))
        .append($('<span class="title">').text(title)))
      .append($('<div class="drawer">').css('display', 'none')
        .append($('<nav class="menu">')))

    this.html.find('.button').on('click', function () {
      let drawer = this.html.find('.drawer')

      if(drawer.css('display')=='none'){
        drawer.css('display', 'block')
      }
      else drawer.css('display', 'block')
    })
  }

  addLink(href, name){
    let menu = this.html.find('.menu')
    menu.append($('<a class="menu-link">').attr('href', href).text(name))
  }

  appendTo(selector) {
    $(selector).append(this.html)
  }
}