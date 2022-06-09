const Pet = require('../src/Pet');

describe('Pet constructor', () => {
  it('returns an object', () => {
    expect(new Pet()).toBeInstanceOf(Object);
  });

  it('returns an instance of Pet', () => {
    expect(new Pet()).toBeInstanceOf(Pet);
  });

  it(`sets name prop equal to the name argument (if provided)`, () => {
    const name = 'Ollie';
    const pet = new Pet(name);
    expect(pet.name).toBe(name);
  });

  it(`sets name prop that is undefined (if no name argument is provided)`, () => {
    const pet = new Pet();
    expect(pet.name).toBeUndefined();
  });

  it('throws a TypeError if the name argument is not a string', () => {
    expect(() => new Pet(42)).toThrow(TypeError);
    expect(() => new Pet(false)).toThrow('name must be a string or undefined');
  });

  it('sets age prop equal to 0', () => {
    const pet = new Pet();
    expect(pet.age).toBe(0);
  });
});

describe('Pet prototype', () => {
  it('has growUp method', () => {
    expect(new Pet().growUp).toBeInstanceOf(Function);
  });

  it('growUp method increments pet age by 1', () => {
    const pet = new Pet();
    pet.growUp();
    expect(pet.age).toBe(1);
    pet.growUp();
    expect(pet.age).toBe(2);
  });
});
