/* eslint-disable func-names */
function Pet(name) {
  if (!(typeof name === 'string' || name === undefined)) {
    throw new TypeError('name must be a string or undefined');
  }
  this.name = name;
  this.age = 0;
  this.hunger = 0;
  this.maxFitness = 10;
  this.fitness = this.maxFitness;
}

Pet.prototype.growUp = function() {
  this.age += 1;
  this.hunger += 5;
  this.fitness -= 3;
};

Pet.prototype.walk = function() {
  const fitnessBoost = 4;
  if (this.fitness + fitnessBoost > this.maxFitness) {
    this.fitness = this.maxFitness;
  } else {
    this.fitness += fitnessBoost;
  }
};

module.exports = Pet;
