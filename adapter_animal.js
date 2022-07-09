var Cat = /** @class */ (function () {
    function Cat() {
    }
    Cat.prototype.walk = function () {
        console.log("cat walking");
    };
    return Cat;
}());
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.walk = function () {
        console.log("dog walking");
    };
    return Dog;
}());
var Fish = /** @class */ (function () {
    function Fish() {
    }
    Fish.prototype.swim = function () {
        console.log("fish swimming");
    };
    return Fish;
}());
var FishAdapter = /** @class */ (function () {
    function FishAdapter(fish) {
        this._fish = fish;
    }
    FishAdapter.prototype.walk = function () {
        this._fish.swim();
    };
    return FishAdapter;
}());
function makeWalk(animal) {
    animal.walk();
}
var kitty = new Cat();
var bingo = new Dog();
var nemo = new Fish();
makeWalk(kitty);
makeWalk(bingo);
// error (animal.walk() is not a function)
// makeWalk(nemo)
makeWalk(new FishAdapter(nemo));
