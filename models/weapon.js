const Equipment = require('./equipment');

class Weapon extends Equipment {
  constructor(
    name,
    price,
    type,
    slot,
    durability,
    requiredLevel,
    weight,
    damage
  ) {
    super('weapon', name, price, type, slot, durability, requiredLevel, weight);
    this.damage = damage;
  }
}

module.exports = Weapon;
