class Round {
    constructor(character, enemies) {
        this.character = character;
        this.enemies = enemies;
        this.defender = null;
        $('#your_char').append(character.unitElem);
        for (let unit of enemies) { $('#enemies').append(unit.unitElem); }
        let choseEnemy = $('<h2></h2>');
        userInteraction("Click to select an enemy!")
    }

    handleUnitClick(unit) {
        if (unit == this.character) {
            userInteraction("dumb!");
        } else if (!this.defender) {
            this.defender = unit;
            $('#defender').append(unit.unitElem);
        } else if (unit == this.defender) {
            this.handleAttack();
        } else { userInteraction("enemy chosen!"); }
    }

    handleAttack() {
        userInteraction("points");
        this.character.health -= this.defender.attackPoints;
        this.defender.health -= this.character.attackPoints;
        if (this.character.health <= 0) {
            this.character.unitElem.remove();
        } else if (this.defender.health <= 0) {
            this.enemies = this.enemies.filter(enem => enem !== this.defender);
            this.defender.unitElem.remove();
            this.defender = null;
            if (this.enemies.length !== 0) {
                userInteraction("choose new enemy");
            } else { userInteraction("You won!"); }
        }
    }

}

class Unit {
    constructor(name, health, weapon, points) {
        this.name = name;
        this.health = health;
        this.weapon = weapon;
        this.attackPoints = points;
    }
}

let round = null;

window.onload = () => {
    startGame();
};

function startGame() {
    const allUnits = [new Unit("A-10-Thunderbolt", 120, "AGM-65 Maverick", 50),
    new Unit("F-18", 150, "AGM-88 HARM", 100), new Unit("F-22", 200, "AIM-120C", 150), new Unit("space-cat", 500, "space-bite", 250)];

    for (let unit of allUnits) {
        let unitElem = $(`<div id='${unit.name}'></div>`);
        unit.unitElem = unitElem;
        unitElem.appendTo('#game_container');
        unitElem.text(`${unit.name}`);
        unitElem.click(function () {
            if (!round) {
                round = new Round(unit, allUnits.filter(other => other !== unit));
                return;
            }
            round.handleUnitClick(unit);

        });
    }
}

function userInteraction (text) {
    $("#text").text(text);
}

