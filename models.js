const EQUIPMEMT_DURABILITY_DECREASE_PERCENTAGE = 2;

const equipmentTypes = {
  "common": "common", 
  "rare": "rare", 
  "legendary": "legendary",
}

const slotTypes = { 
  "head": "head", 
  "neck": "neck",
  "shoulder": "shouler", 
  "chest": "chest", 
  "wrist": "wrist", 
  "hands": "hands", 
  "right_hand": "right_hand", 
  "left_hand": "left_hand", 
  "finger": "finger",
  "belt": "belt", 
  "legs": "legs", 
  "feet": "feet", 
}

class Creature {
  constructor (damage, health, speed, race) {
    this.id = 1; /* uuid */
    this.damage = damage;
    this.health = health;
    this.speed = speed;
    this.race = race;
  }

  move() {
    console.log("Moved ", this.speed, " unit.")
  }

	attack(target) {
    target.takeDamage(this.damage);
  };

	takeDamage(damage) {
    this.health -= damage;
    if (!this._alive()) this._die();
  };

  _alive() {
    return this.health >= 0;
  }

	_die() {
    /* Note: Destroy Instance Object Here. */
    console.log("Creature Died. Id: ", this.id);
  };				
}

class Player extends Creature {
  constructor (damage, health, speed, race, name, equipments) {
    super(damage, health, speed, race);
    this.name = name;
    this.equipments = equipments;
    this.health = this._totalHealth();
    this.armor = this._totalArmor();
    this.damage = this._totalDamage();
  }

  takeDamage(damage) {
    this.health -= damage;
    if (!this._alive()) this._die();
    if (this._hasSomePropertyByKey(this.equipments, 'defense')) {
      this.equipments.forEach(equipment => {
        if (equipment.defense) equipment.decreaseDurability();
      });
    }
  }

	attack(target) {
    target.takeDamage(this.damage);
    if (this._hasSomePropertyByKey(this.equipments, 'damage')) {
      this.equipments.forEach(equipment => {
        if (equipment.damage) equipment.decreaseDurability();
      });
    }
  };

  _totalArmor() {
    let totalArmor = 0;
    this.equipments.forEach(equipment => {
      if (equipment.defense) totalArmor += equipment.defense;
    });
    return totalArmor;
  }

  _totalDamage() {
    if (!this._hasSomePropertyByKey(equipments, 'damage')) return this.damage;
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

class Enemy extends Creature {
  constructor (damage, health, speed, race) {
    super(damage, health, speed, race);
  }
}

class Equipment {
  constructor (className = 'equipment', name, price, type, slot, durability, requiredLevel, weight) {
    this.className = className;
    this.name = name;
    this.price = price;
    this.type = equipmentTypes[type];
    this.slot = slotTypes[slot];
    this.initialDurability = durability;
    this.currentDurability = durability; // Note: e.g. 20, should decrease when this Equipment in use.
    this.requiredLevel = requiredLevel;
    this.weight = weight;
  }

  decreaseDurability() {
    if (this.className === 'accesory') return;
    this.currentDurability -= (this.currentDurability * EQUIPMEMT_DURABILITY_DECREASE_PERCENTAGE) / 100
  }
}

class Armor extends Equipment {
  constructor (name, price, type, slot, durability, requiredLevel, weight, defense) {
    super('armor', name, price, type, slot, durability, requiredLevel, weight);
    this.defense = defense;
  }
}

class Weapon extends Equipment {
  constructor (name, price, type, slot, durability, requiredLevel, weight, damage) {
    super('weapon', name, price, type, slot, durability, requiredLevel, weight);
    this.damage = damage;
  }
}

class Accessory extends Equipment {
  constructor (name, price, type, slot, durability, requiredLevel, weight, health, damage, defense) {
    super('accessory', name, price, type, slot, durability, requiredLevel, weight);
    this.health = health;
    this.damage = damage;
    this.defense = defense;
  }
}


const sword = new Weapon("Excalibur One-Handed Sword", 100, "legendary", "right_hand" , 20, 15, 3, 55);
const shield = new Armor("Black Shield", 100, "rare", "left_hand", 20, 15, 3, 20);
const chestArmor = new Armor("Leather Body Armour", 250, "rare", "chest", 20, 14, 4, 50);
const necklace = new Accessory("Gold Necklace", 250, "rare", "neck", 20, 14, 4, 25, 15, 30);
const ring = new Accessory("Opal Ring", 250, "rare", "finger", 20, 14, 4, 5, 25, 30);
const belt = new Accessory("Leather Belt", 250, "rare", "belt", 10, 8, 3, 5, 2, 30);
const equipments = [
  sword,
  shield,
  chestArmor,
  necklace,
  ring,
  belt,
];
const player = new Player(5, 10, 3, "Human", "Fatih", equipments);
const enemy = new Enemy(3, 300, 3, "Zombie");