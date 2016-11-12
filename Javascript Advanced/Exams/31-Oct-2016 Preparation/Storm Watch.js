(function () {
  let id = 0

  return class stormWatcher {
    constructor(temperature, humidity, pressure, windSpeed) {
      this.id = id++
      this.temperature = temperature
      this.humidity = humidity
      this.pressure = pressure
      this.windSpeed = windSpeed
    }

    toString() {
      let status = this.determineStatus()

      return `Reading ID: ${this.id}
Temperature: ${this.temperature}*C
Relative Humidity: ${this.humidity}%
Pressure: ${this.pressure}hpa
Wind Speed: ${this.windSpeed}m/s
Weather: ${status}
`
    }

    determineStatus() {
      if(this.temperature<20 && this.windSpeed>25 && (this.pressure<700 || this.pressure>900))
        return "Stormy"
      else return "Not stormy"
    }
  }
})()