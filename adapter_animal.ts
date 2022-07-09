interface Animal{
  walk() : void
}

class Cat implements Animal{
  walk(): void {
    console.log("cat walking")
  }
}

class Dog implements Animal{
  walk(): void {
    console.log("dog walking")
  }
}

class Fish{
  swim() {
    console.log("fish swimming")
  }
}

class FishAdapter implements Animal{
  private _fish
  constructor(fish) {
    this._fish = fish
  }
  walk(): void {
    this._fish.swim()
  }
}

function makeWalk(animal) {
  animal.walk()
}

const kitty = new Cat()
const bingo = new Dog()
const nemo = new Fish()

makeWalk(kitty)
makeWalk(bingo)

// error (animal.walk() is not a function)
// makeWalk(nemo)

makeWalk(new FishAdapter(nemo))