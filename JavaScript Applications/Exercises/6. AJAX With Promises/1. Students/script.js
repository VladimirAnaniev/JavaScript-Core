const appKey = 'kid_BJXTsSi-e'
const appSecret = '447b8e7046f048039d95610c1b039390'
const userAndPass = 'guest'
const getAuthHeader = {Authorization: 'Basic '+ btoa(userAndPass+':'+userAndPass)}

initialize()

function initialize() {
  renderLoadButton()
  renderCreateNewForm()
}

function renderCreateNewForm() {
  let formDiv = $('<div>')
    .append($('<input type="number" id="Id-input" placeholder="ID">'))
    .append($('<input type="text" id="first-name-input" placeholder="First Name">'))
    .append($('<input type="text" id="last-name-input" placeholder="Last Name">'))
    .append($('<input type="text" id="faculty-number-input" placeholder="Faculty Number">'))
    .append($('<input type="number" id="grade-input" placeholder="Grade">'))
    .append($('<button>').text('Create').on('click', function () {
      onCreateStudentBtnClicked()
    }))

  $('body').append(formDiv)
}

function renderLoadButton() {
  $('body').append($('<button>').text('Load Students').on('click', function () {
    loadStudents()
  }))
}

function onCreateStudentBtnClicked() {
  let id = Number($('#Id-input').val())
  let firstName = $('#first-name-input').val()
  let lastName = $('#last-name-input').val()
  let facultyNumber = $('#faculty-number-input').val()
  let grade = Number($('#grade-input').val())
  
  let data = {
    ID: id,
    FirstName: firstName,
    LastName: lastName,
    FacultyNumber: facultyNumber,
    Grade: grade
  }
  
  createStudent(JSON.stringify(data))
}

function createStudent(data) {
  $.post({
    url: 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students',
    headers: getAuthHeader,
    data: data,
    contentType: 'application/json'
  })
    .then(loadStudents)
    .catch(showError)
}

function loadStudents() {
  $.get({
    url: 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students',
    headers: getAuthHeader
  })
    .then(renderData)
    .catch(showError)
}

function renderData(data) {
  for(let student of data.sort((x,y) => x.ID - y.ID)) {
    let row = $('<tr>')
      .append($('<td>').text(student.ID))
      .append($('<td>').text(student.FirstName))
      .append($('<td>').text(student.LastName))
      .append($('<td>').text(student.FacultyNumber))
      .append($('<td>').text(student.Grade))

    $('#results').append(row)
  }
}

function showError(err) {
  console.dir(err)
}