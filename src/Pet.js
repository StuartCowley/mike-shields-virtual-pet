/* eslint-disable func-names */
function Pet(name) {
  if (!(typeof name === 'string' || name === undefined)) {
    throw new TypeError('name must be a string or undefined');
  }
  this.name = name;
  this.age = 0;
  this.hunger = 0;
  this.fitness = 10;
}

Pet.prototype.growUp = function() {
  this.age += 1;
  this.hunger += 5;
  this.fitness -= 3;
};

module.exports = Pet;
