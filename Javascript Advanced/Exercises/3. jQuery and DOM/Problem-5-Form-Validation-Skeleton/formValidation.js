function validate() {
    let submitBtn = $('#submit')

    let usernameRegex = /[A-Za-z0-9]{3,20}/
    let passwordRegex = /[A-Za-z0-9_]{5,15}/

    submitBtn.click(function () {
        //Get data
        let username = $('#username').val()
        let password = $('#password').val()
        let email = $('#email').val()
        let confirmPass = $('#confirm-password').val()
        let companyNumber = ($('#companyInfo').is(':visible')) ? $('#companyNumber').val() : -1


        //Check if data is valid
        let isUsernameValid = usernameRegex.test(username)

        let isPasswordValid = passwordRegex.test(password)
        let isConfirmPassowrdValid = passwordRegex.test(confirmPass)
        let doPasswordsMatch = isPasswordValid&&isConfirmPassowrdValid

        let isEmailValid = email.indexOf('@')&& email.substring(email.indexOf('@'),email.length).indexOf('.')
        if(isEmailValid>0) isEmailValid=true
        else isEmailValid=false

        let isCompanyNumberValid = false
        if(companyNumber!=-1){
            if(companyNumber>=1000&&companyNumber<10000) isCompanyNumberValid=true
        }
        else isCompanyNumberValid=true

        //Show feedback
        if(isUsernameValid&&isCompanyNumberValid&&isEmailValid&&doPasswordsMatch){
            $('#valid').show()
            $('#username').css('border','none')
            $('#password').css('border','none')
            $('#confirm-password').css('border','none')
            $('#email').css('border','none')
            $('#companyNumber').css('border','none')
        }
        else{
            $('#valid').hide()
            if(!isUsernameValid)  $('#username').css('border-color','red')
            else $('#username').css('border','none')

            if(!doPasswordsMatch){
                $('#password').css('border-color','red')
                $('#confirm-password').css('border-color','red')
            }
            else {
                $('#password').css('border','none')
                $('#confirm-password').css('border','none')
            }

            if(!isEmailValid)  $('#email').css('border-color','red')
            else $('#email').css('border','none')

            if(!isCompanyNumberValid)  $('#companyNumber').css('border-color','red')
            else $('#companyNumber').css('border','none')
        }

        return false
    })

    let checkbox = $('#company')
    checkbox.on('click', function () {
        if(checkbox.is(':checked')){
            $('#companyInfo').show()
        }
        else{
            $('#companyInfo').hide()
        }
    })



}
