const Pet = require('../src/Pet');

describe('Pet constructor', () => {
  it('returns an object', () => {
    expect(new Pet()).toBeInstanceOf(Object);
  });

  it('returns an instance of Pet', () => {
    expect(new Pet()).toBeInstanceOf(Pet);
  });

  it('sets name prop equal to the name argument (if provided)', () => {
    const name = 'Ollie';
    const pet = new Pet(name);
    expect(pet.name).toBe(name);
  });

  it('sets name prop that is undefined (if no name argument is provided)', () => {
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

  it('sets hunger prop equal to 0', () => {
    const pet = new Pet();
    expect(pet.hunger).toBe(0);
  });

  it('sets fitness prop equal to 10', () => {
    const pet = new Pet();
    expect(pet.fitness).toBe(10);
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

  it('growUp method increments hunger prop by 5', () => {
    const pet = new Pet();
    pet.growUp();
    expect(pet.hunger).toBe(5);
    pet.growUp();
    expect(pet.hunger).toBe(10);
  });

  it('decrements the fitness prop by three', () => {
    const pet = new Pet();
    pet.growUp();
    expect(pet.fitness).toBe(7);
    pet.growUp();
    expect(pet.fitness).toBe(4);
  });

  it('has walk method', () => {
    const pet = new Pet();
    expect(pet.walk).toBeInstanceOf(Function);
  });

  it('walk method increments pet fitness by 4 but is clamped to pet maxFitness', () => {
    const pet = new Pet();
    pet.fitness = pet.maxFitness - 1;

    pet.walk();
    expect(pet.fitness).toBe(10);

    pet.fitness = 0;

    pet.walk();
    expect(pet.fitness).toBe(4);
    pet.walk();
    expect(pet.fitness).toBe(8);
  });
});
