const Equipment = require('./equipment');

class Accessory extends Equipment {
  constructor(
    name,
    price,
    type,
    slot,
    durability,
    requiredLevel,
    weight,
    health,
    damage,
    defense
  ) {
    super(
      'accessory',
      name,
      price,
      type,
      slot,
      durability,
      requiredLevel,
      weight
    );
    this.health = health;
    this.damage = damage;
    this.defense = defense;
  }
}

module.exports = Accessory;
