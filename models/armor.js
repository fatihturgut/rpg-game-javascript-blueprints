const Equipment = require('./equipment');

class Armor extends Equipment {
  constructor(
    name,
    price,
    type,
    slot,
    durability,
    requiredLevel,
    weight,
    defense
  ) {
    super('armor', name, price, type, slot, durability, requiredLevel, weight);
    this.defense = defense;
  }
}

module.exports = Armor;
