class CheckingAccount {
  constructor(clientId, email, firstName, lastName){
    if(typeof clientId != 'string' || clientId.length!=6) {
      throw new TypeError("Client ID must be a 6-digit number")
    }

    let emailRegex = /[a-zA-z0-9.]+@[a-zA-z0-9.]+/
    if(!emailRegex.test(email)) {
      throw new TypeError("Invalid e-mail")
    }

    let namesRegex = /[a-zA-z]{3,20}/
    if(firstName.length>=20 || firstName.length<=3) {
      throw new TypeError("First name must be between 3 and 20 characters long")
    }
    else {
      if(!namesRegex.test(firstName)) {
        throw new TypeError("First name must contain only Latin characters")
      }
    }

    if(lastName.length>=20 || lastName.length<=3) {
      throw new TypeError("Last name must be between 3 and 20 characters long")
    }
    else {
      if(!namesRegex.test(lastName)) {
        throw new TypeError("Last name must contain only Latin characters")
      }
    }

    this.clientId = clientId
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.products = []
  }
}