const Pet = require('../src/Pet');

describe('Pet constructor', () => {
  it('returns an object', () => {
    expect(new Pet()).toBeInstanceOf(Object);
  });

  it('returns an instance of Pet', () => {
    expect(new Pet()).toBeInstanceOf(Pet);
  });
});
