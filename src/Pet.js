/* eslint-disable func-names */

const AGE_INIT = 0;
const AGE_INCREMENT = 1;

const MAX_FITNESS = 10;
const FITNESS_INCREMENT = 4;
const FITNESS_DECREMENT = 3;

const HUNGER_INIT = 0;
const HUNGER_INCREMENT = 5;
const HUNGER_DECREMENT = 3;

function Pet(name) {
  if (!(typeof name === 'string' || name === undefined)) {
    throw new TypeError('name must be a string or undefined');
  }
  this.name = name;
  this.age = AGE_INIT;
  this.hunger = HUNGER_INIT;
  this.fitness = MAX_FITNESS;
}

Pet.prototype.growUp = function() {
  this.age += AGE_INCREMENT;
  this.hunger += HUNGER_INCREMENT;
  this.fitness -= FITNESS_DECREMENT;
};

Pet.prototype.walk = function() {
  if (this.fitness + FITNESS_INCREMENT > MAX_FITNESS) {
    this.fitness = MAX_FITNESS;
  } else {
    this.fitness += FITNESS_INCREMENT;
  }
};

Pet.prototype.feed = function() {
  if (this.hunger - HUNGER_DECREMENT < HUNGER_INIT) {
    this.hunger = HUNGER_INIT;
  } else {
    this.hunger -= HUNGER_DECREMENT;
  }
};

module.exports = Pet;
