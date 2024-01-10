"use strict";
// VALUES VARIABLES
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [`stick`];
// BUTTON VARIABLES
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
// DOM ELEMENTS
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");

// WEAPONS VARIABLE
const weapons = [
  {
    name: "stick",
    power: 5,
  },
  {
    name: "dagger",
    power: 30,
  },
  {
    name: "claw hammer",
    power: 50,
  },
  {
    name: "sword",
    power: 100,
  },
];
// locations variable, ki jih uporabi funkcija goTown and goStore, da se koda ne ponavlja!

// MONSTERS ARRAY
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];
// LOCATIONS ARRAY
const locations = [
  {
    //GO TOWN SQUARE OBJECT
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: (text.innerText =
      'You are in the town square. You see a sign that says "Store".'),
  },
  {
    // GO STORE OBJECT
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: (text.innerText = "You enter the store."),
  },
  {
    //GO CAVE OBJECT
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },
  {
    //FIGHT OBJECTS
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    // KILL MONSTERT OBJECT
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    //LOOSE OBJECT
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️",
  }, // WIN GAME OBJECT
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉",
  },
  {
    // EASTER EGG FUNCTION
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];
const monsterHealthText = document.querySelector("#monsterHealth");
// INITIALIZE BUTTONS // KO KLIKNEŠ DOLOČEN GUM SE IZVEDE DOLOČENA FUNKCIJA
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
// GO TO TOWN SQUARE GUMB IZVEDE FUNKCIJO UPORABI 1 ELEMENT LOCATIONS ARRAYA IN TO JE name:town square
function goTown() {
  update(locations[0]);
}
// KLIK NA GUMB GO TO STORE IZVEDE TO FUNKCIJO UPORABI 2 ELEMENT LOCATIONS ARRAYA IN TO JE name:store
function goStore() {
  update(locations[1]);
}
// INNER TEXT PRIKAZE BESEDILO KO KLIKNEŠ DOLOČEN GUMB, ONCLICK PA ZAŽENE FUNKCIJO IZ OBJECTA BUTTON FUNCTIONS
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0]; //you use bracket notation to get the button text property of the location object passed into the function.
  button1.onclick = location["button functions"][0];
  button2.innerText = location["button text"][1];
  button2.onclick = location["button functions"][1];
  button3.innerText = location["button text"][2];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}
// IZVEDE FUNKCIJO UPDATE KO KLIKŠEN GO CAVE
function goCave() {
  update(locations[2]);
}
// IZVEDE FUNKCIJO BUYHEALTH GUMB
function buyHealth() {
  // USTAVI FUNKCIJO KO PRIDE GOLD NA 10
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    //   prikaže text oz. spremeni gold in health text
    goldText.innerText = gold;
    healthText.innerText = health;
  } //KO ZMANKA DENARJA PRIKAZE TEXT SPODAJ
  else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}
// FUNKCIJA BUY WEAPON (GOLD) GUMB
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    // CURRENT WEAPON JE MAX 3 OZ. SWORD. ZATO UPORABIMO WEAPONS.LENGTH POTEM SE FUNKCIJA USTAVI
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++; //VSAKIČ KO KUPIŠ OROŽJE KUPIŠ BOLJŠI WEAPON...PRVO STICK,DAGGER ITD. MAX INDEX 3
      goldText.innerText = gold; //UPDEJTA GOLD IZ 50 NA 20 KO KUPIŠ WEAPON
      let newWeapon = weapons[currentWeapon].name; //tell the player what weapon they bought access an object within the weapons array and assign it to your newWeapon variable.
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon); //push newweapon in inventory variable
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon."; //UPDEJTA TEXT ČE NIMAS DOVOLJ GOLDA
    }
  }
  //   V DRUGEM PRIMERU IZVRŠI SELL WEAPON
  else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}
// FUNKCIJA SELL WEAPON
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift(); //ODSTRANI 1 ELEMENT IZ ARRAYA INVENTORY KER GA PRODAŠ
    // scoped only to this if statement... outside old currentweapon will be used
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}
// FIGHT SLIME
function fightSlime() {
  fighting = 0;
  goFight();
}
// FIGHT BEAST
function fightBeast() {
  fighting = 1;
  goFight();
}
// FIGHT DRAGON
function fightDragon() {
  fighting = 2;
  goFight();
}
// GO FIGHT
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health; // UPDEJTA HEALTH POŠASTI V MONSTERS ARRAY
  monsterStats.style.display = "block"; //PRIKAŽE HEALTH DISPLAY IZ CSS SPREMENI DISPLAY IZ NONE V BLOCK!
  monsterHealthText.innerText = monsterHealth[fighting].health; //PRIKAŽE HEALTH DOLOČENE POŠASTI S KATERO SE FIGHTAŠ
}

// FUNCTION ATTACK
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks."; //prikaže ime monsterja
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level); //vsakič zniža tvoj health za toliko kolikor je level pošasti!
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; //  zniza tudi health monsterja za toliko kolikor je moč orožja oz power + 1 tega števila!
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health; //UPDEJTA HEALTH IN MONSTER HEALTH TEXT
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose(); //ČE JE HEALTH MANSI OD 0 ZGUBIS FUNKCIJA
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster(); //TERNARY OPERATOR... ČE JE FIGHTING ENAKO 2 SE IZVEDE FUNKCIJA WINGAME DRUGAČE PA SE IZVEDE FUNKCIJA DEFEAT MONSTER
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    // and operator pogleda če imamo samo 1 weapon. Če da potem si ga nemoremo uničiti
    //On every attack, there should be a chance that the player's weapon breaks.
    text.innerText += " Your " + inventory.pop() + " breaks."; // inventory.pop(), which will remove the last item in the array AND return it so it appears in your string.
    currentWeapon--;
  }
}
// MONSTER ATTACK VALUE FUNCTION
function getMonsterAttackValue(level) {
  //The attack of the monster will be based on the monster's level and the player's xp
  const hit = level * 5 - Math.floor(Math.random() * xp); //This will set the monster's attack to five times their level minus a random number between 0 and the player's xp.
  console.log(hit);
  return hit > 0 ? hit : 0; //return hit to a ternary operator that returns hit if hit is greater than 0, or returns 0 if it is not.
}
// FUNCTION DODGE
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name; //UPDEJTA TEXT
}

// DEFEATMONSTER FUNCTION
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7); // ko premagaš pošast dobiš toliko golda
  xp += monsters[fighting].level; // dobiš toliko xperienca kolikor je level pošasti
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
// LOSE FUNCTION
function lose() {
  update(locations[5]);
}
// WINGAME FUNCTION
function winGame() {
  update(locations[6]);
}
// RESTART FUNCTION
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = healthText;
  xpText.innerText = xpText;
  goTown();
}

// MONSTER HIT FUNCTION
function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

//EASTER EGG FUNCTION

function easterEgg() {
  update(locations[7]);
}

// PICK FUNcTION

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11)); //push a random number between 0 and 10 to the end of the numbers array.
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n"; // Add the number at index i of the numbers array
      if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
      } else {
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
          lose();
        }
      }
    }
  }
}
function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}
