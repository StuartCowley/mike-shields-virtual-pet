/* eslint-disable func-names */
const petConfig = {
  AGE_INIT: 0,
  AGE_INCREMENT: 1,
  MAX_FITNESS: 10,
  FITNESS_INCREMENT: 4,
  FITNESS_DECREMENT: 3,
  FITNESS_THRESHOLD: 3,
  HUNGER_INIT: 0,
  HUNGER_THRESHOLD: 5,
  HUNGER_INCREMENT: 5,
  HUNGER_DECREMENT: 3
};
function Pet(name) {
  if (!(typeof name === 'string' || name === undefined)) {
    throw new TypeError('name must be a string or undefined');
  }
  this.name = name;
  this.age = petConfig.AGE_INIT;
  this.hunger = petConfig.HUNGER_INIT;
  this.fitness = petConfig.MAX_FITNESS;
}

Pet.prototype.growUp = function() {
  this.age += petConfig.AGE_INCREMENT;
  this.hunger += petConfig.HUNGER_INCREMENT;
  this.fitness -= petConfig.FITNESS_DECREMENT;
};

Pet.prototype.walk = function() {
  if (this.fitness + petConfig.FITNESS_INCREMENT > petConfig.MAX_FITNESS) {
    this.fitness = petConfig.MAX_FITNESS;
  } else {
    this.fitness += petConfig.FITNESS_INCREMENT;
  }
};

Pet.prototype.feed = function() {
  if (this.hunger - petConfig.HUNGER_DECREMENT < petConfig.HUNGER_INIT) {
    this.hunger = petConfig.HUNGER_INIT;
  } else {
    this.hunger -= petConfig.HUNGER_DECREMENT;
  }
};

Pet.prototype.checkUp = function() {
  let petStatus = 'I feel great!';

  if (this.fitness <= 3 && this.hunger >= 5) {
    petStatus = 'I am hungry AND I need a walk';
  } else if (this.hunger >= petConfig.HUNGER_THRESHOLD) {
    petStatus = 'I am hungry';
  } else if (this.fitness <= petConfig.FITNESS_THRESHOLD) {
    petStatus = 'I need a walk';
  }
  return petStatus;
};

module.exports = { Pet, petConfig };
