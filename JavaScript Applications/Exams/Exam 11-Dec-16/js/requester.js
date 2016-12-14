function post(url, auth, data) {
  let request = {
    url: url,
    headers: auth
  }

  if(data) request.data = data

  return $.post(request)
}

function get(url, auth) {
  let request = {
    url: url,
    headers: auth
  }

  return $.get(request)
}

function del(url, auth) {
  let request = {
    method: 'DELETE',
    url: url,
    headers: auth
  }

  return $.ajax(request)
}

function login(username, password) {
  let url = KINVEY_USER_URL+'login'
  let auth = getAuthHeader(BASIC)
  let data = {username, password}
  showLoading()
  disableForms()

  post(url, auth, data)
    .then(onLoginSuccess)
    .catch(onRequestError)

  function onLoginSuccess(data) {
    showSuccess("Login successful.")
    updateSession(data._kmd.authtoken, data.username, data.name)
    changePage(USER)
    hideLoading()
    enableForms()
  }
}

function register(username, password, name) {
  let url = KINVEY_USER_URL
  let auth = getAuthHeader(BASIC)
  let data = {username, password, name}
  showLoading()
  disableForms()

  post(url, auth, data)
    .then(onRegisterSuccess)
    .catch(onRequestError)

  function onRegisterSuccess(data) {
    showSuccess("User registration successful.")
    updateSession(data._kmd.authtoken, data.username, data.name)
    changePage(USER)
    hideLoading()
    enableForms()
  }
}

function logout() {
  let url = KINVEY_USER_URL+'_logout'
  let auth = getAuthHeader(KINVEY)
  showLoading()

  post(url, auth)
    .then(onLogoutSuccess)
    .catch(onRequestError)

  function onLogoutSuccess(data) {
    showSuccess("Logout successful.")
    clearSession()
    changePage(HOME)
    hideLoading()
  }
}

function onRequestError(err) {
  hideLoading()
  showError(err.responseJSON.description)
  enableForms()
}

function getMyMessages() {
  let url = KINVEY_URL+`messages/?query={"recipient_username":"${sessionStorage.getItem('username')}"}`
  let auth = getAuthHeader(KINVEY)
  showLoading()

  get(url, auth)
    .then(onGetMessagesSuccess)
    .catch(onRequestError)

  function onGetMessagesSuccess(data) {
    fillMessagesTable(data)
    changePage(MESSAGES)
    hideLoading()
  }
}

function getMyArchive() {
  let url = KINVEY_URL+`messages/?query={"sender_username":"${sessionStorage.getItem('username')}"}`
  let auth = getAuthHeader(KINVEY)
  showLoading()

  get(url, auth)
    .then(onGetArchiveSuccess)
    .catch(onRequestError)

  function onGetArchiveSuccess(data) {
    fillArchiveTable(data)
    changePage(ARCHIVE)
    hideLoading()
  }
}

function getAllUsers() {
  let url = KINVEY_USER_URL
  let auth = getAuthHeader(KINVEY)
  showLoading()

  get(url, auth)
    .then(onGetAllUserSuccess)
    .catch(onRequestError)

  function onGetAllUserSuccess(data) {
    fillSendMessageSelect(data)
    changePage(SEND)
    hideLoading()
  }
}

function sendMessage(senderUsername, senderName, recieverUsername, message) {
  let url = KINVEY_URL+'messages'
  let auth = getAuthHeader(KINVEY)
  let data = {
    sender_username: senderUsername,
    sender_name: senderName,
    recipient_username: recieverUsername,
    text: message
  }
  showLoading()
  disableForms()

  post(url, auth, data)
    .then(onSendMessageSuccess)
    .catch(onRequestError)

  function onSendMessageSuccess(data) {
    hideLoading()
    showSuccess("Message sent.")
    getMyArchive()
    enableForms()
  }
}

function handleDeleteBtnClick(id) {
  let url = KINVEY_URL+`messages/${id}`
  let auth = getAuthHeader(KINVEY)
  showLoading()

  del(url, auth)
    .then(onSuccessfulDelete)
    .catch(onRequestError)

  function onSuccessfulDelete(data) {
    hideLoading()
    showSuccess("Message deleted.")
    getMyArchive()
  }
}
