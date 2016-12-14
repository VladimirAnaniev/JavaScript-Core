function startApp() {
  if(isLoggedIn()) {
    changePage(USER)
  }
  else {
    changePage(HOME)
  }

  attachClickEvents()
  attachFormSubmitEvents()
  hideNotifications()
}

function attachClickEvents() {
  $('#linkMenuAppHome').on('click', function () {
    changePage(HOME)
  })
  $('#linkMenuLogin').on('click', function () {
    changePage(LOGIN)
  })
  $('#linkMenuRegister').on('click', function () {
    changePage(REGISTER)
  })
  $('#linkMenuUserHome').on('click', function () {
    changePage(USER)
  })
  $('#linkMenuMyMessages').on('click', function () {
    getMyMessages()
  })
  $('#linkMenuArchiveSent').on('click', function () {
    getMyArchive()
  })
  $('#linkMenuSendMessage').on('click', function () {
    getAllUsers()
  })
  $('#linkMenuLogout').on('click', function () {
    logout()
  })
  $('#infoBox').on('click', function () {
    hideSuccess()
  })
  $('#errorBox').on('click', function () {
    hideError()
  })
  $('#linkUserHomeMyMessages').on('click', function () {
    getMyMessages()
  })
  $('#linkUserHomeSendMessage').on('click', function () {
    getAllUsers()
  })
  $('#linkUserHomeArchiveSent').on('click', function () {
    getMyArchive()
  })
}

function attachFormSubmitEvents() {
  $('#formLogin').submit(function (event) {
    event.preventDefault()
    let username = $('#loginUsername').val()
    let password = $('#loginPasswd').val()

    login(username, password)
  })

  $('#formRegister').submit(function (event) {
    event.preventDefault()
    let username = $('#registerUsername').val()
    let password = $('#registerPasswd').val()
    let name = $('#registerName').val()

    register(username, password, name)
  })

  $('#formSendMessage').submit(function (event) {
    event.preventDefault()
    let username = $('#msgRecipientUsername option:selected').val()
    let message = $('#msgText').val()

    sendMessage(sessionStorage.getItem('username'), sessionStorage.getItem('name') || null, username, message)
  })
}

function hideNotifications() {
  $('#loadingBox').hide()
  $('#infoBox').hide()
  $('#errorBox').hide()
}
