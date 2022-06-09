  if (!(typeof name === 'string' || name === undefined)) {
    throw new TypeError('name must be a string or undefined');
  }
  this.name = name;
  this.age = 0;
  this.hunger = 0;
Pet.prototype.growUp = function() {
  this.age += 1;
  this.hunger += 5;
};
module.exports = Pet;
