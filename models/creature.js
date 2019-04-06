class Creature {
  constructor(damage, health, speed, runRate, race) {
    this.walk = this.walk.bind(this);
    this.run = this.run.bind(this);
    this.takeDamage = this.takeDamage.bind(this);
    this.id = 1; /* uuid */
    this.damage = damage;
    this.health = health;
    this.speed = speed;
    this.runRate = runRate;
    this.race = race;
  }

  walk() {
    console.log(`Walked ${this.speed} unit.`);
  }

  run() {
    console.log(`Ran ${this.speed * this.runRate} unit.`);
  }

  attack(target) {
    target.takeDamage(this.damage);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (!this._alive()) this._die();
  }

  _alive() {
    return this.health >= 0;
  }

  _die() {
    /* Note: Destroy Instance Object Here. */
    console.log('Creature Died. Id: ', this.id);
  }
}

module.exports = Creature;
