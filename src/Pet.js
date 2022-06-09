  if (!(typeof name === 'string' || name === undefined)) {
    throw new TypeError('name must be a string or undefined');
  }
  this.name = name;
  this.age = 0;
Pet.prototype.growUp = function() {
  this.age += 1;
};
module.exports = Pet;
