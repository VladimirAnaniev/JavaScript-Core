class TimeSpan {
  constructor(hours, minutes, seconds) {
    this.seconds = TimeSpan.calcSeconds(hours, minutes, seconds)
  }

  static calcSeconds(hours, minutes, seconds) {
    if(!TimeSpan.isInteger(hours)) throw new RangeError(`Invalid hours: ${hours}`)
    if(!TimeSpan.isInteger(minutes)) throw new RangeError(`Invalid minutes: ${minutes}`)
    if(!TimeSpan.isInteger(seconds)) throw new RangeError(`Invalid seconds: ${seconds}`)

    if(seconds<0) {
      minutes = minutes + Math.floor(seconds/60)
      seconds = 60+seconds%60;
    }
    else if (seconds>60) {
      minutes = minutes + Math.floor(seconds/60)
      seconds = seconds % 60
    }

    if(minutes<0) {
      hours = hours - Math.floor(minutes/60 + 1)
      minutes = 60+minutes%60;
    }
    else if (minutes>60) {
      hours = hours + Math.floor(minutes/60)
      minutes = minutes % 60
    }

    return seconds + (hours*60 + minutes) * 60
  }

  static isInteger(x) {
    return typeof x === "number" && isFinite(x) && Math.floor(x) === x;
  }

  toString() {
    let seconds = this.seconds%60
    let minutes = Math.floor((this.seconds/60)) % 60
    let hours = Math.floor(this.seconds/3600)

    if(minutes<10) minutes = '0'+minutes
    if(seconds<10) seconds= '0'+seconds
    return `${hours}:${minutes}:${seconds}`
  }
}