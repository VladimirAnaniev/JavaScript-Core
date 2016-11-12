window.onload = function () {
  solve('#generate')
}

function solve(selector) {
  $(selector).on('click', function () {
    let important = $('#content').find('strong').text()

    let newDiv = $('<div>').attr('id','summary')
      .append($('<h2>').text("Summary"))
      .append($('<p>').text(important))

    $('#content').parent().append(newDiv)
  })
}


