/* eslint-disable func-names */
const config = {
  AGE_INIT: 0,
  AGE_MAX: 30,
  AGE_INCREMENT: 1,
  FITNESS_INIT: 10,
  FITNESS_MIN: 0,
  FITNESS_INCREMENT: 4,
  FITNESS_DECREMENT: 3,
  FITNESS_THRESHOLD: 3,
  HUNGER_INIT: 0,
  HUNGER_MAX: 10,
  HUNGER_INCREMENT: 5,
  HUNGER_DECREMENT: 3,
  HUNGER_THRESHOLD: 5
};
function Pet(name) {
  if (!(typeof name === 'string' || name === undefined)) {
    throw new TypeError('name must be a string or undefined');
  }
  this.name = name;
  this.age = config.AGE_INIT;
  this.hunger = config.HUNGER_INIT;
  this.fitness = config.FITNESS_INIT;
  this.children = [];
}

Pet.prototype.growUp = function() {
  if (!this.isAlive) throw 'Your pet is no longer alive';

  this.age += config.AGE_INCREMENT;
  this.hunger += config.HUNGER_INCREMENT;
  this.fitness -= config.FITNESS_DECREMENT;
};

Pet.prototype.walk = function() {
  if (!this.isAlive) throw 'Your pet is no longer alive';

  if (this.fitness + config.FITNESS_INCREMENT > config.FITNESS_INIT) {
    this.fitness = config.FITNESS_INIT;
  } else {
    this.fitness += config.FITNESS_INCREMENT;
  }
};

Pet.prototype.feed = function() {
  if (!this.isAlive) throw 'Your pet is no longer alive';

  if (this.hunger - config.HUNGER_DECREMENT < config.HUNGER_INIT) {
    this.hunger = config.HUNGER_INIT;
  } else {
    this.hunger -= config.HUNGER_DECREMENT;
  }
};

Pet.prototype.checkUp = function() {
  if (!this.isAlive) throw 'Your pet is no longer alive';

  let petStatus = 'I feel great!';
  if (
    this.fitness <= config.FITNESS_THRESHOLD &&
    this.hunger >= config.HUNGER_THRESHOLD
  ) {
    petStatus = 'I am hungry AND I need a walk';
  } else if (this.hunger >= config.HUNGER_THRESHOLD) {
    petStatus = 'I am hungry';
  } else if (this.fitness <= config.FITNESS_THRESHOLD) {
    petStatus = 'I need a walk';
  }
  return petStatus;
};

Pet.prototype.adoptChild = function(child) {
}

Object.defineProperty(Pet.prototype, 'isAlive', {
  get() {
    return (
      this.fitness > config.FITNESS_MIN &&
      this.hunger < config.HUNGER_MAX &&
      this.age < config.AGE_MAX
    );
  }
});

module.exports = { Pet, config };
