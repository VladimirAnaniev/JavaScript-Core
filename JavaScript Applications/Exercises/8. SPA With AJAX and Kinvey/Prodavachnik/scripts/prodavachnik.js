const basicAuth = {Authorization: 'Basic '+ btoa('kid_SyxVEMvGl:380c5701c0a34e3f81bcddd3920c740f')}

function startApp() {
  changeView('home')
  attachLinkEvents()
}

function attachLinkEvents() {
  $('#linkHome').on('click', function () {
      changeView('home')
  })
  $('#linkListAds').on('click', function () {
    loadAds()
  })
  $('#linkRegister').on('click', function () {
    changeView('register')
  })
  $('#linkLogin').on('click', function () {
    changeView('login')
  })
  $('#linkLogout').on('click', function () {
    logout()
  })
  $('#linkCreateAd').on('click', function () {
    changeView('create')
  })
  $('#buttonLoginUser').on('click', function () {
    loginBtnClicked()
  })
  $('#buttonRegisterUser').on('click', function () {
    registerBtnClicked()
  })
  $('#buttonCreateAd').on('click', function () {
    createAdBtnClicked()
  })
}

function editAdBtnClicked(id) {
  let data = fetchCreateEditFormData('#formEditAd')
  editAd(id, data)
}

function editAd(id, data) {
  $.ajax({
    method: "PUT",
    url: 'https://baas.kinvey.com/appdata/kid_SyxVEMvGl/advertisements/'+id,
    headers: {Authorization: 'Kinvey '+sessionStorage.getItem('authToken')},
    contentType: 'application/json',
    data: JSON.stringify(data)
  })
    .then(editSuccessful)
    .catch(showError)

  function editSuccessful() {
    loadAds()
  }
}

function fetchCreateEditFormData(selector) {
  let form = $(selector)
  let titleInput = form.find('input[name="title"]')
  let descriptionInput = form.find('textarea[name="description"]')
  let dateInput = form.find('input[name="datePublished"]')
  let priceInput = form.find('input[name="price"]')

  let title = titleInput.val()
  let description = descriptionInput.val()
  let date = dateInput.val()
  let price = priceInput.val()

  return {title, description, date, price}
}

function createAdBtnClicked() {
  let data = fetchCreateEditFormData('#formCreateAd')
  createAd(data)
}

function createAd(data) {
  $.post({
    url: 'https://baas.kinvey.com/appdata/kid_SyxVEMvGl/advertisements',
    headers: {Authorization: 'Kinvey '+sessionStorage.getItem('authToken')},
    contentType: 'application/json',
    data: JSON.stringify(data)
  })
    .then(createSuccessful)
    .catch(showError)

  function createSuccessful() {
    loadAds()
  }
}

function loginBtnClicked() {
  let data = fetchLoginRegisterFormData('#formLogin')
  login(data)
}

function registerBtnClicked() {
  let data = fetchLoginRegisterFormData('#formRegister')
  register(data)
}

function fetchLoginRegisterFormData(selector) {
  let form = $(selector)
  let usernameInput = form.find('input[name="username"]')
  let passwordInput = form.find('input[name="passwd"]')

  let username = usernameInput.val()
  let password = passwordInput.val()

  usernameInput.val('')
  passwordInput.val('')

  return {username, password}
}

function loadAds() {
  $.get({
    url: 'https://baas.kinvey.com/appdata/kid_SyxVEMvGl/advertisements',
    headers: {Authorization: 'Kinvey '+ sessionStorage.getItem('authToken')}
  })
    .then(displayAds)
    .catch(showError)

  function displayAds(data) {
      console.dir(data)
    let table = $('#ads').find('table')

    table.empty()

    let header = $('<tr>')
      .append($('<th>').text('Title'))
      .append($('<th>').text('Publisher'))
      .append($('<th>').text('Description'))
      .append($('<th>').text('Date'))
      .append($('<th>').text('Price'))
      .append($('<th>').text('Actions'))

    table.append(header)

    for(let ad of data) {
      let row = $(`<tr data-id="${ad._id}">`)
        .append($('<td>').text(ad.title))
        .append($('<td>').text(ad._acl.creator))
        .append($('<td>').text(ad.description))
        .append($('<td>').text(ad.date))
        .append($('<td>').text(ad.price))

      let actions = $('<td>')
      if(sessionStorage.getItem('userId')==ad._acl.creator) {
          actions
            .append($('<a href="#">').text('[Delete]').on('click', function () {
              deleteBtnClicked(ad._id)
            }))
            .append($('<a href="#">').text('[Edit]').on('click', function () {
              editBtnClicked(ad._id)
            }))
      }
      row.append(actions)

      table.append(row)
    }

    changeView('ads')
  }
}

function deleteBtnClicked(id) {
  $.ajax({
    method:'DELETE',
    url: 'https://baas.kinvey.com/appdata/kid_SyxVEMvGl/advertisements/'+id,
    headers: {Authorization: 'Kinvey '+ sessionStorage.getItem('authToken')}
  })
    .then(deleteSuccessful)
    .catch(showError)

  function deleteSuccessful(data) {
    loadAds()
  }
}

function editBtnClicked(id) {
  $.get({
    url: 'https://baas.kinvey.com/appdata/kid_SyxVEMvGl/advertisements/'+id,
    headers: {Authorization: 'Kinvey '+ sessionStorage.getItem('authToken')}
  })
    .then(showEditForm)
    .catch(showError)

  function showEditForm(data) {
    changeView('edit')

    let form = $('#formEditAd')
    form.find('input[name="title"]').val(data.title)
    form.find('textarea[name="description"]').val(data.description)
    form.find('input[name="datePublished"]').val(data.date)
    form.find('input[name="price"]').val(data.price)

    $('#buttonEditAd').on('click', function () {
      editAdBtnClicked(data._id)
    })
  }
}

function register(data) {
  $.post({
    url: 'https://baas.kinvey.com/user/kid_SyxVEMvGl',
    headers: basicAuth,
    contentType: 'application/json',
    data: JSON.stringify(data)
  })
    .then(successfulRegister)
    .catch(showError)

  function successfulRegister(data) {
    login({username: data.username, password: data.password})
  }
}

function changeView(view) {
  showMenuLinks()

  let homeView = $('#viewHome').hide()
  let loginView = $('#viewLogin').hide()
  let registerView = $('#viewRegister').hide()
  let adsView = $('#viewAds').hide()
  let editView = $('#viewEditAd').hide()
  let createView = $('#viewCreateAd').hide()

  if(view=='home'){
    homeView.show()
  }
  else if(view=='login') {
    loginView.show()
  }
  else if(view=='register') {
    registerView.show()
  }
  else if(view=='ads') {
    adsView.show()
  }
  else if(view=='edit') {
    editView.show()
  }
  else if(view=='create') {
    createView.show()
  }

  function showMenuLinks() {
    let linkHome = $('#linkHome').show()
    let linkCreate = $('#linkCreateAd').hide()
    let linkList = $('#linkListAds').hide()
    let linkLogout = $('#linkLogout').hide()
    let linkLogin = $('#linkLogin').hide()
    let linkRegister = $('#linkRegister').hide()

    if(sessionStorage.getItem('authToken')) {
      linkCreate.show()
      linkList.show()
      linkLogout.show()
    }
    else {
      linkLogin.show()
      linkRegister.show()
    }
  }
}

function login(authData) {
  $.post({
    url: 'https://baas.kinvey.com/user/kid_SyxVEMvGl/login',
    headers: basicAuth,
    contentType: 'application/json',
    data: JSON.stringify(authData)
  })
    .then(successfulLogin)
    .catch(showError)

  function successfulLogin(data) {
    sessionStorage.setItem('authToken', data._kmd.authtoken)
    sessionStorage.setItem('userId', data._id)
    loadAds()
  }
}

function logout() {
  $.post({
    url: 'https://baas.kinvey.com/user/kid_SyxVEMvGl/_logout',
    headers: {Authorization: 'Kinvey '+sessionStorage.getItem('authToken')},
  })
    .then(successfulLogout)
    .catch(showError)

  function successfulLogout() {
    sessionStorage.clear()
    changeView('home')
  }
}

function showError(err) {
  console.dir(err)
}