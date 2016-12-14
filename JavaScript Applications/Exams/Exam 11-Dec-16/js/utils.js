function isLoggedIn() {
  return sessionStorage.getItem('authToken')
}

function getAuthHeader(type) {
  if(type === KINVEY) {
    return {Authorization: KINVEY + sessionStorage.getItem('authToken')}
  }
  else if(type === BASIC) {
    return {Authorization: BASIC + btoa(APP_ID+':'+APP_SECRET)}
  }
}

function updateSession(authToken, username, name) {
  sessionStorage.setItem('authToken', authToken)
  sessionStorage.setItem('username', username)
  sessionStorage.setItem('name', name)
}

function clearSession() {
  sessionStorage.clear()
}

function refreshHeader() {
  if(isLoggedIn()) {
    $('.anonymous').hide()
    $('.useronly').show()
    $('#spanMenuLoggedInUser').show().text(`Welcome, ${sessionStorage.getItem('username')}!`)
  }
  else {
    $('.anonymous').show()
    $('.useronly').hide()
    $('#spanMenuLoggedInUser').hide()
  }
}

function changePage(page) {
  refreshHeader()
  emptyInputs()

  let home = $('#viewAppHome').hide()
  let login = $('#viewLogin').hide()
  let register = $('#viewRegister').hide()
  let userHome = $('#viewUserHome').hide()
  let myMessages = $('#viewMyMessages').hide()
  let archive = $('#viewArchiveSent').hide()
  let send = $('#viewSendMessage').hide()

  switch (page) {
    case HOME:
      home.show()
      break
    case LOGIN:
      login.show()
      break
    case REGISTER:
      register.show()
      break
    case USER:
      userHome.show()
      $('#viewUserHomeHeading').text(`Welcome, ${sessionStorage.getItem('username')}!`)
      break
    case MESSAGES:
      myMessages.show()
      break
    case ARCHIVE:
      archive.show()
      break
    case SEND:
      send.show()
      break
  }

}

function fillMessagesTable(data) {
  let container = $('#myMessages table').empty()

  let head = $('<thead>')
    .append($('<tr>')
      .append($('<th>').text('From'))
      .append($('<th>').text('Message'))
      .append($('<th>').text('Date received'))
    )

  container.append(head)

  if(data.length>0) {
    let body = $('<tbody>')

    for(let message of data) {
      let row = $('<tr>')
        .append($('<td>').text(formatSender(message.sender_name, message.sender_username)))
        .append($('<td>').text(message.text))
        .append($('<td>').text(formatDate(message._kmd.lmt)))

      body.append(row)
    }

    container.append(body)
  }
}

function fillArchiveTable(data) {
  let container = $('#sentMessages table').empty()

  let head = $('<thead>')
    .append($('<tr>')
      .append($('<th>').text('To'))
      .append($('<th>').text('Message'))
      .append($('<th>').text('Date sent'))
      .append($('<th>').text('Actions'))
    )

  container.append(head)

  if(data.length>0) {
    let body = $('<tbody>')

    for(let message of data) {
      let row = $('<tr>')
        .append($('<td>').text(message.recipient_username))
        .append($('<td>').text(message.text))
        .append($('<td>').text(formatDate(message._kmd.lmt)))
        .append($('<td>')
          .append($('<button>').text('Delete').on('click', function () {
            handleDeleteBtnClick(message._id)
          }))
        )

      body.append(row)
    }

    container.append(body)
  }
}

function fillSendMessageSelect(data) {
  let select = $('#msgRecipientUsername').empty()

  for(let user of data) {
    select.append($('<option>').val(user.username).text(formatSender(user.name, user.username)))
  }
}

function formatDate(dateISO8601) {
  let date = new Date(dateISO8601);
  if (Number.isNaN(date.getDate()))
    return '';
  return date.getDate() + '.' + padZeros(date.getMonth() + 1) +
    "." + date.getFullYear() + ' ' + date.getHours() + ':' +
    padZeros(date.getMinutes()) + ':' + padZeros(date.getSeconds());

  function padZeros(num) {
    return ('0' + num).slice(-2);
  }
}

function formatSender(name, username) {
  if (!name)
    return username;
  else
    return username + ' (' + name + ')';
}

function emptyInputs() {
  $('input[type="text"]').val('')
  $('input[type="password"]').val('')
}

function disableForms() {
  $('input').attr('disabled', 'disabled')
}

function enableForms() {
  $('input').removeAttr('disabled')
}
