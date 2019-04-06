const $C = require('../constants');

class Equipment {
  constructor(
    className = 'equipment',
    name,
    price,
    type,
    slot,
    durability,
    requiredLevel,
    weight
  ) {
    this.className = className;
    this.name = name;
    this.price = price;
    this.type = $C.EQUIPMENT_TYPES[type];
    this.slot = $C.SLOT_TYPES[slot];
    this.initialDurability = durability;
    this.currentDurability = durability; // Note: e.g. 20, should decrease when this Equipment in use.
    this.requiredLevel = requiredLevel;
    this.weight = weight;
  }

  decreaseDurability() {
    if (this.className === 'accesory') return;
    this.currentDurability -=
      (this.currentDurability * $C.EQUIPMEMT_DURABILITY_DECREASE_PERCENTAGE) / 100;
  }
}

module.exports = Equipment;
