class Greeter {
  greeting:string
  constructor(msg:string) {
    this.greeting = msg
  }
  greet() {
    return "hello" + this.greeting
  }
}
//基类 超类
class Animal {
  move(distanceInMeters:number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`)
  }
}
//派生类 子类
class Dog extends Animal {
  bark() {
    console.log('Woof!')
  }
}
const dog = new Dog()
dog.bark()
dog.move(10)
dog.bark()

class Animals {
  name:string
  private names:string
  constructor(name:string) {
    this.name = name
  }
  move(distanceInMeters:number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`)
  }
}


class Snake extends Animals {
  constructor(name:string) {
    super(name)
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...")
    super.move(distanceInMeters)
  }
}

class Horse extends Animals {
  constructor(name:string) {
    super(name)
  }
  move(distanceInMeters = 45) {
    console.log("Galloping...")
    super.move(distanceInMeters)
  }
}
