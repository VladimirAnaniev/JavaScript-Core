function showSuccess(message) {
  let infoBox = $('#infoBox').show().text(message)

  setTimeout(function () {
    infoBox.fadeOut()
  }, 3000)
}

function hideSuccess() {
  $('#infoBox').fadeOut()
}

function showError(message) {
  $('#errorBox').show().text(message)
}

function hideError() {
  $('#errorBox').fadeOut()
}

function showLoading() {
  $('#loadingBox').show()
}

function hideLoading() {
  $('#loadingBox').hide()
}
