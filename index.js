const Weapon = require('./models/weapon');
const Armor = require('./models/armor');
const Accessory = require('./models/accessory');
const Player = require('./models/player');
const Enemy = require('./models/enemy');

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

const player = new Player(5, 10, 3, 1.8, "Human", "Fatih", equipments);
const enemy = new Enemy(3, 300, 3, 1.4, "Zombie");

player.attack(enemy);
enemy.attack(player);
enemy.run();
player.run();
player.attack(enemy);
player.attack(enemy);
enemy.attack(player);
player.attack(enemy);

// console.log("sword", sword);
// console.log("shield", shield);
// console.log("chestArmor", chestArmor);
// console.log("ring", ring);
// console.log("belt", belt);
// console.log("equipments", equipments);
// console.log("player", player);
// console.log("enemy", enemy);