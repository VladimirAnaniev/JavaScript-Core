attachEvents()

function attachEvents() {
  const authHeader = {Authorization: 'Basic '+btoa('guest:pass')}

  $('#getVenues').on('click', function () {
    let date = $('#venueDate').val()
    getVenues(date)
  })

  function getVenues(date) {
    $.get({
      url: 'https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query='+date,
      headers: authHeader
    })
      .then(getVenuesSuccess)
      .catch(showError)
  }

  function getVenuesSuccess(data) {
    console.dir(data)
  }

  function showError(err) {
    console.dir(err)
  }
}