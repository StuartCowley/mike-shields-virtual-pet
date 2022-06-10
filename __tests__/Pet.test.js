const { Pet, petConfig } = require('../src/Pet');

const {
  AGE_INIT,
  AGE_INCREMENT,
  AGE_MAX,
  FITNESS_INIT,
  FITNESS_MIN,
  FITNESS_INCREMENT,
  FITNESS_DECREMENT,
  FITNESS_THRESHOLD,
  HUNGER_INIT,
  HUNGER_MAX,
  HUNGER_THRESHOLD,
  HUNGER_INCREMENT,
  HUNGER_DECREMENT
} = petConfig;

describe('Pet constructor', () => {
  it('returns an object', () => {
    expect(new Pet()).toBeInstanceOf(Object);
  });

  it('returns an instance of Pet', () => {
    expect(new Pet()).toBeInstanceOf(Pet);
  });

  it('throws TypeError if the name argument is not <string>', () => {
    expect(() => new Pet(42)).toThrow(TypeError);
    expect(() => new Pet(false)).toThrow('name must be a string or undefined');
  });
});

describe('Pet instance', () => {
  it('name initialised as name argument (if provided)', () => {
    expect(new Pet('Ollie').name).toBe('Ollie');
  });

  it('name initialised as undefined (if name argument not provided)', () => {
    expect(new Pet().name).toBeUndefined();
  });

  it('age initialised as AGE_INIT', () => {
    expect(new Pet().age).toBe(AGE_INIT);
  });

  it('hunger intitialised as HUNGER_INIT', () => {
    expect(new Pet().hunger).toBe(HUNGER_INIT);
  });

  it('fitness initialised as FITNESS_INIT', () => {
    expect(new Pet().fitness).toBe(FITNESS_INIT);
  });
});

describe('Pet prototype', () => {
  it('has growUp method', () => {
    expect(Pet.prototype.growUp).toBeInstanceOf(Function);
  });

  it('has walk method', () => {
    expect(Pet.prototype.walk).toBeInstanceOf(Function);
  });

  it('has feed method', () => {
    expect(Pet.prototype.feed).toBeInstanceOf(Function);
  });

  it('has checkUp method', () => {
    expect(Pet.prototype.checkUp).toBeInstanceOf(Function);
  });

  it('has isAlive getter method', () => {
    expect(
      Object.getOwnPropertyDescriptor(Pet.prototype, 'isAlive').get
    ).toBeInstanceOf(Function);
  });
});

describe('growUp method', () => {
  it('throws exception when isAlive returns false', () => {
    const pet = new Pet();
    pet.fitness = FITNESS_MIN;
    expect(() => pet.growUp()).toThrow('Your pet is no longer alive');
  });

  it('increments age by AGE_INCREMENT', () => {
    const pet = new Pet();
    pet.growUp();
    expect(pet.age).toBe(AGE_INCREMENT);
  
    pet.growUp();
    expect(pet.age).toBe(AGE_INCREMENT * 2);
  });

  it('increments hunger by HUNGER_INCREMENT', () => {
    const pet = new Pet();
    pet.growUp();
    expect(pet.hunger).toBe(HUNGER_INIT + HUNGER_INCREMENT);

    pet.growUp();
    expect(pet.hunger).toBe(
      HUNGER_INIT + HUNGER_INCREMENT * 2
    );
  });

  it('decrements fitness by FITNESS_DECREMENT', () => {
    const pet = new Pet();
    pet.growUp();
    expect(pet.fitness).toBe(
      FITNESS_INIT - FITNESS_DECREMENT
    );

    pet.growUp();
    expect(pet.fitness).toBe(
      FITNESS_INIT - 2 * FITNESS_DECREMENT
    );
  });
})

describe('walk method', () => {
  it('throws exception when isAlive returns false', () => {
    const pet = new Pet();
    pet.fitness = 0;
    expect(() => pet.walk()).toThrow('Your pet is no longer alive');
  });

  it('increments fitness by FITNESS_INCREMENT, but is clamped to FITNESS_INIT', () => {
    const pet = new Pet();
    pet.walk();
    expect(pet.fitness).toBe(FITNESS_INIT);

    pet.fitness = 1;
    pet.walk();
    expect(pet.fitness).toBe(1 + FITNESS_INCREMENT);

    pet.walk();
    expect(pet.fitness).toBe(1 + FITNESS_INCREMENT * 2);
  });
});

describe('feed method', () => {
  it('throws exception when isAlive returns false', () => {
    const pet = new Pet();
    pet.fitness = 0;
    expect(() => pet.feed()).toThrow('Your pet is no longer alive');
  });

  it('decrements hunger by HUNGER_DECREMENT but is clamped to HUNGER_INIT', () => {
    const pet = new Pet();
    pet.hunger = 1;
    pet.feed();
    expect(pet.hunger).toBe(HUNGER_INIT);

    pet.hunger = 4;
    pet.feed();
    expect(pet.hunger).toBe(4 - HUNGER_DECREMENT);
  });
});

describe('checkUp method', () => {
  it('throws exception when pet isAlive returns false', () => {
    const pet = new Pet();
    pet.fitness = FITNESS_MIN;
    expect(() => pet.checkUp()).toThrow('Your pet is no longer alive');
  });

  it(`returns "I need a walk" when fitness is less than or equal to FITNESS_THRESHOLD`, () => {
    const pet = new Pet();
    pet.fitness = FITNESS_THRESHOLD;
    expect(pet.checkUp()).toBe('I need a walk');
  });

  it(`returns "I am hungry" when hunger is greater than or equal to HUNGER_THRESHOLD`, () => {
    const pet = new Pet();
    pet.hunger = HUNGER_THRESHOLD;
    expect(pet.checkUp()).toBe('I am hungry');
  });

  it(`returns "I am hungry AND I need a walk" when 
      hunger is greater than or equal to HUNGER_THRESHOLD and 
      fitness is less than or equal to FITNESS_THRESHOLD`, () => {
    const pet = new Pet();
    pet.hunger = HUNGER_THRESHOLD;
    pet.fitness = FITNESS_THRESHOLD;
    expect(pet.checkUp()).toBe('I am hungry AND I need a walk');
  });

  it(`returns "I feel great!" when 
      hunger is less than HUNGER_THRESHOLD and 
      fitness is greater than or equal to FITNESS_THRESHOLD`, () => {
    const pet = new Pet();
    expect(pet.checkUp()).toBe('I feel great!');
  });
});

describe('isAlive getter method', () => {
  it(`returns true when 
      age is less than AGE_MAX and
      hunger is less than HUNGER_MAX and
      fitness is greater than FITNESS_MIN`, () => {
    const pet = new Pet();
    expect(pet.isAlive).toBe(true);
  });

  it('returns false when fitness is less than or equal to FITNESS_MIN', () => {
    const pet = new Pet();
    pet.fitness = FITNESS_MIN;
    expect(pet.isAlive).toBe(false);

    pet.fitness = FITNESS_MIN - 1;
    expect(pet.isAlive).toBe(false);
  });

  it('returns false when hunger greater than or equal to HUNGER_MAX', () => {
    const pet = new Pet();
    pet.hunger = HUNGER_MAX;
    expect(pet.isAlive).toBe(false);

    pet.hunger = HUNGER_MAX + 1;
    expect(pet.isAlive).toBe(false);
  });

  it('returns false when age is AGE_MAX or more', () => {
    const pet = new Pet();
    pet.age = AGE_MAX;
    expect(pet.isAlive).toBe(false);

    pet.age = AGE_MAX + 1;
    expect(pet.isAlive).toBe(false);
  });
});
