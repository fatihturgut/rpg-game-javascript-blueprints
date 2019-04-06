const Creature = require('./creature');

class Player extends Creature {
  constructor(damage, health, speed, runRate, race, name, equipments) {
    super(damage, health, speed, runRate, race);
    this.name = name;
    this.equipments = equipments;
    this.health = this._totalHealth();
    this.armor = this._totalArmor();
    this.damage = this._totalDamage();
  }

  walk() {
    console.log(`${this.name} walked ${this.speed} unit.`);
  }

  run() {
    console.log(`${this.name} ran ${this.speed * this.runRate} unit.`);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (!this._alive()) {
      this._die();
      return;
    }
    if (this._hasSomePropertyByKey(this.equipments, 'defense')) {
      this.equipments.forEach(equipment => {
        if (equipment.defense) equipment.decreaseDurability();
      });
    }
    console.log(`${this.name}'s latest health is ${this.health}`);
  }

  attack(target) {
    target.takeDamage(this.damage);
    if (this._hasSomePropertyByKey(this.equipments, 'damage')) {
      this.equipments.forEach(equipment => {
        if (equipment.damage) equipment.decreaseDurability();
      });
    }
  }

  _totalArmor() {
    let totalArmor = 0;
    this.equipments.forEach(equipment => {
      if (equipment.defense) totalArmor += equipment.defense;
    });
    return totalArmor;
  }

  _totalDamage() {
    if (!this._hasSomePropertyByKey(this.equipments, 'damage')) return this.damage;
    let totalDamage = 0;
    this.equipments.forEach(equipment => {
      if (equipment.damage) totalDamage += equipment.damage;
    });
    return totalDamage;
  }

  _totalHealth() {
    let totalHealth = 0;
    this.equipments.forEach(equipment => {
      if (equipment.health) totalHealth += equipment.health;
    });
    return totalHealth;
  }

  _hasSomePropertyByKey(equipments, key) {
    return equipments.some(equipment => equipment[key]);
  }
}

module.exports = Player;
