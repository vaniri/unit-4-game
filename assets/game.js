class Round {
    constructor(character, enemies) {
        this.character = character;
        this.enemies = enemies;
        $('#your_char').append(character);
        $('#enemies').append(enemies);
    }

    handleUnitClick (unit) {
        if (unit == this.character) {
            console.log("dumb!");
        } else {
            $('#defender').append(unit.unitElem); 
        }

    };
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
    const allUnits = [new Unit("A-10 Thunderbolt", 120, "AGM-65 Maverick", 50),
    new Unit("A-10 Thunderbolt", 120, "AGM-65 Maverick", 50)];
    for (let unit of allUnits) {
        let unitElem = $('<div></div>');
        unit.unitElem = unitElem;
        unitElem.appendTo('#game_container');
        unitElem.innerHTML = unit.name;
        unitElem.click(function () {
            if (!round) {
                round = new Round(unit, allUnits);
                return;
            }
            round.handleUnitClick(unit);
        });
    }

}
