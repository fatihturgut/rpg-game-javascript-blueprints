const Creature = require('./creature');

class Enemy extends Creature {
  constructor(damage, health, speed, runRate, race) {
    super(damage, health, speed, runRate, race);
  }

  walk() {
    console.log(`${this.race} walked ${this.speed} unit.`);
  }

  run() {
    console.log(`${this.race} ran ${this.speed * this.runRate} unit.`);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (!this._alive()) { 
      this._die();
      return;
    }
    console.log(`${this.race}'s latest health is ${this.health}`);
  }
}

module.exports = Enemy;
