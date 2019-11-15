class Round {
  constructor(character, enemies) {
    this.character = character;
    this.enemies = enemies;
    this.defender = null;
    $("#your_char").append(character.unitElem);
    for (let unit of enemies) {
      $("#enemies").append(unit.unitElem);
    }
    userInteraction("Click to select an enemy!");
  }

  handleUnitClick(unit) {
    if (unit == this.character) {
      userInteraction("dumb!");
    } else if (!this.defender) {
      this.defender = unit;
      $("#defender").append(unit.unitElem);
      let fightBox = $(`<div id="fight-box"></div>`);
      $('#defender').append(fightBox);
      fightBox.text(`A precision-attack of ${unit.name} ${unit.weapon} ${unit.weaponDescription} will causing a harmfull damage in ${unit.attackPower} points`);
    } else if (unit == this.defender) {
      this.handleAttack();
    } else {
      userInteraction("Enemy alredy chosen!");
    }
  }

  handleAttack() {
    userInteraction("");
    this.character.health -= this.defender.attackPower / 10;
    this.defender.health -= this.character.attackPower;
    if (this.character.health <= 0) {
      this.character.unitElem.remove();
    } else if (this.defender.health <= 0) {
      this.enemies = this.enemies.filter(enem => enem !== this.defender);
      this.defender.unitElem.remove();
      this.defender = null;
      if (this.enemies.length !== 0) {
        $('#fight-box').remove();
        userInteraction("Choose new enemy");
      } else {
        $('#fight-box').remove();
        userInteraction("You won!");
      }
    }
  }
}

class Unit {
  constructor(name, image, health, weapon, desctiption, power, attackPower) {
    this.name = name;
    this.avatarImage = image;
    this.health = health;
    this.weapon = weapon;
    this.weaponDescription = desctiption;
    this.attackPower = power;
    this.CounterAttackPower = attackPower;
  }
}

let round = null;

window.onload = () => {
  document.body.style.background = 'url("assets/images/startBack.jpg") top';
  setTimeout(startGame, 1000);
};

function startGame() {
  userInteraction("Choose your avatar!");
  document.body.style.background = 'url("assets/images/mainBack.jpg")';
  const allUnits = [
    new Unit("Thunderbolt", "A-10.jpg", 120, "AGM-65 Maverick", "air-to-surface guided missile", 20, 40),
    new Unit("F-18", "F-18.jpg", 150, "AGM-88 HARM", 30, 50),
    new Unit("F-22", "F-22.jpeg", 200, "AIM-120C", 60, 80),
    new Unit("Space_cat", "spaceCat.jpg", 300, "space-bite", 100, 120)
  ];

  for (let unit of allUnits) {
    let unitElem = creatAvatarBox(unit);
    unitElem.click(function() {
      if (!round) {
        round = new Round(
          unit,
          allUnits.filter(other => other !== unit)
        );
        return;
      }
      userInteraction("Let's fight! Click to the enemy icon for attack");
      round.handleUnitClick(unit);
    });
  }
}

function userInteraction(text) {
  $("#text").text(text);
}

function creatAvatarBox(unit) {
  let unitElem = $(`<div class="avatar-box"></div>`);
  let nameDiv = $(`<div class="avatar-name"></div>`);
  let healthDiv = $(`<div class="avatar-health"></div>`);
  unit.unitElem = unitElem;
  unitElem.appendTo("#game_container");
  unitElem.append(
    `<img src="assets/images/${unit.avatarImage}" width="110" height="130"/>`
  );
  unitElem.append(nameDiv);
  unitElem.append(healthDiv);
  nameDiv.text(`${unit.name}`);
  healthDiv.text(`${unit.health} points`);
  return unitElem;
}
