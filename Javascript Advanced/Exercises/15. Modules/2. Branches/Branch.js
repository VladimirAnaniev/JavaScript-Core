import Employee from './Employee'

export default class Branch {
  constructor(id, branchName, companyName){
    this._id = id
    this._branchName = branchName
    this._companyName = companyName
    this._employees = []
  }

  get employees () {
    return this._employees
  }

  hire (employee) {
    this.employees.push(employee)
  }

  toString () {
    let returnValue = `@ ${this._companyName}, ${this._branchName}, ${this._id}
Employed:`

    if(this.employees.length === 0) returnValue+='\nNone...'
    else {
      for(let employee of this.employees) {
        returnValue+=`\n** ${employee.name}`
      }
    }

    return returnValue
  }
}