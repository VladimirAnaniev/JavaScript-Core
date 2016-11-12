function createComputerHierarchy() {
  class Electronic {
    constructor(manufacturer) {
      if(new.target === Electronic) {
        throw new Error()
      }
      this.manufacturer  = manufacturer
    }
  }

  class Keyboard extends Electronic{
    constructor(manufacturer, responseTime) {
      super(manufacturer)
      this.responseTime = responseTime
    }
  }

  class Monitor extends Electronic{
    constructor(manufacturer, width, height) {
      super(manufacturer)
      this.width = width
      this.height = height
    }
  }

  class Battery extends Electronic{
    constructor(manufacturer, expectedLife) {
      super(manufacturer)
      this.expectedLife = expectedLife
    }
  }

  class Computer extends Electronic{
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
      if(new.target === Computer) {
        throw new Error()
      }
      super(manufacturer)
      this.processorSpeed = processorSpeed
      this.ram = ram
      this.hardDiskSpace = hardDiskSpace
    }
  }

  class Laptop extends Computer{
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace)
      this.weight = weight
      this.color = color
      this.battery = battery
    }

    set battery (b) {
      if(b instanceof Battery) this._battery = b
      else throw new TypeError()

      return this
    }

    get battery() {
      return this._battery
    }
  }

  class Desktop extends Computer {
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor){
      super(manufacturer, processorSpeed, ram, hardDiskSpace)
      this.keyboard = keyboard
      this.monitor = monitor
    }

    set keyboard(k) {
      if(k instanceof Keyboard) this._keyboard = k
      else throw new TypeError()

      return this
    }

    get keyboard() {
      return this._keyboard
    }

    set monitor (m) {
      if(m instanceof Monitor) this._monitor = m
      else throw new TypeError()

      return this
    }

    get monitor() {
      return this._monitor
    }
  }

  return {
    Battery,
    Keyboard,
    Monitor,
    Computer,
    Laptop,
    Desktop
  }
}

module.exports = createComputerHierarchy()
