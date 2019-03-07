var fighter = {
    name: "fighter",
    health: 250,
    selected: false,
    attack: 10,
    NPCattack: 10
};
var ranger = {
    name: "ranger",
    health: 125,
    selected: false,
    attack: 20,
    NPCattack: 15
};
var rogue = {
    name: "rogue",
    health: 100,
    selected: false,
    attack: 15,
    NPCattack: 10
};
var wizard = {
    name: "wizard",
    health: 85,
    selected: false,
    attack: 13,
    NPCattack: 7
};
var hero;
var maxHealth = 0;
var enemies = [];
var currentEnemy;
var battleStarted = false;
var totalDamage = 0;
var debt = 0;

$(".readiedHeroContent").hide();
$(".choosingHeroContent").hide();

$("#fighterDiv").click(makeChoice);
$("#rangerDiv").click(makeChoice);
$("#rogueDiv").click(makeChoice);
$("#wizardDiv").click(makeChoice);

function showHealth() {
    $(".fighterHealth").html(fighter.health);
    $(".rangerHealth").html(ranger.health);
    $(".rogueHealth").html(rogue.health);
    $(".wizardHealth").html(wizard.health);
    $(".heroHealth").html(hero.health);
    $(".enemyHealth").html(currentEnemy.health);
}

function makeChoice() {
    if (!battleStarted) {
        $("#fighterDiv").show();
        $("#rangerDiv").show();
        $("#rogueDiv").show();
        $("#wizardDiv").show();
        $(".choosingHeroContent").show();
        fighter.selected = false;
        ranger.selected = false;
        rogue.selected = false;
        wizard.selected = false;

        if ($(this).attr("value") === "fighter") {
            $("#choosingHeroDiv").html('<img src="assets/images/Fighter.png" />');
            $("#readiedHeroDiv").html('<img src="assets/images/Fighter.png" />');
            $(".heroHealth").html(fighter.health);
            fighter.selected = true;
            hero = fighter;
            maxhealth = hero.health;

            $("#fighterDiv").hide();
        }

        if ($(this).attr("value") === "ranger") {
            $("#choosingHeroDiv").html('<img src="assets/images/Ranger.png" />');
            $("#readiedHeroDiv").html('<img src="assets/images/Ranger.png" />');
            $(".heroHealth").html(ranger.health);
            ranger.selected = true;
            hero = ranger;
            maxhealth = hero.health;

            $("#rangerDiv").hide();
        }

        if ($(this).attr("value") === "rogue") {
            $("#choosingHeroDiv").html('<img src="assets/images/Rogue.png" />');
            $("#readiedHeroDiv").html('<img src="assets/images/Rogue.png" />');
            $(".heroHealth").html(rogue.health);
            rogue.selected = true;
            hero = rogue;
            maxhealth = hero.health;

            $("#rogueDiv").hide();
        }

        if ($(this).attr("value") === "wizard") {
            $("#choosingHeroDiv").html('<img src="assets/images/Wizard.png" />');
            $("#readiedHeroDiv").html('<img src="assets/images/Wizard.png" />');
            $(".heroHealth").html(wizard.health);
            wizard.selected = true;
            hero = wizard;
            maxhealth = hero.health;

            $("#wizardDiv").hide();
        }
    }
}

$("#confirmButton").click(startFighting);

function startFighting() {
    if (typeof (hero) !== "undefined") {
        $(".choosingHeroContent").hide();
        $(".readiedHeroContent").show();
        $(".readiedEnemyContent").show();
        $(".infoText").html("<h2>The tournament has begun!</h2>");

        battleStarted = true;
        enemies = [];

        if (!fighter.selected && fighter.health > 0) {
            enemies.push(fighter);
        }
        if (!ranger.selected && ranger.health > 0) {
            enemies.push(ranger);
        }
        if (!rogue.selected && rogue.health > 0) {
            enemies.push(rogue);
        }
        if (!wizard.selected && wizard.health > 0) {
            enemies.push(wizard);
        }

        currentEnemy = enemies[Math.floor(Math.random() * enemies.length)];

        showHealth();

        if (currentEnemy.name === "fighter") {
            $("#readiedEnemyDiv").html('<img src="assets/images/Fighter.png" />');
            $(".enemyHealth").html(fighter.health);

            $("#fighterDiv").hide();
        }

        if (currentEnemy.name === "ranger") {
            $("#readiedEnemyDiv").html('<img src="assets/images/Ranger.png" />');
            $(".enemyHealth").html(ranger.health);

            $("#rangerDiv").hide();
        }

        if (currentEnemy.name === "rogue") {
            $("#readiedEnemyDiv").html('<img src="assets/images/Rogue.png" />');
            $(".enemyHealth").html(rogue.health);

            $("#rogueDiv").hide();
        }

        if (currentEnemy.name === "wizard") {
            $("#readiedEnemyDiv").html('<img src="assets/images/Wizard.png" />');
            $(".enemyHealth").html(wizard.health);

            $("#wizardDiv").hide();
        }
    }
}

$("#readiedHeroDiv").click(retreat);

function retreat() {
    $(".readiedEnemyContent").hide();
    $(".choosingHeroContent").show();
    $(".readiedHeroContent").hide();

    if (currentEnemy.name === "fighter") {
        $("#fighterDiv").show();
    }

    if (currentEnemy.name === "ranger") {
        $("#rangerDiv").show();
    }

    if (currentEnemy.name === "rogue") {
        $("#rogueDiv").show();
    }

    if (currentEnemy.name === "wizard") {
        $("#wizardDiv").show();
    }

    if(fighter.health === 0 && ranger.health === 0 && rogue.health === 0){
        $("#confirmButton").hide();
        $(".infoText").html("<h2>You've won! You are best art. Refresh to fight again.</h2>");
    }

    if(hero.health === 0){
        $("#confirmButton").hide();
        $(".infoText").html("<h2>You are dead. You are not best art. Refresh to fight again.</h2>");
    }
}

$("#readiedEnemyDiv").click(attack);

function attack() {
    $("#damageTaken").html(currentEnemy.NPCattack);
    $("#enemyDamageTaken").html(hero.attack + Math.round(totalDamage / 10));

    if (currentEnemy.name === "fighter") {
        if (hero.name === "wizard") {
            wizardAttack();
        } else {
            fighter.health -= hero.attack + Math.round(totalDamage / 10);
            totalDamage += hero.attack + Math.round(totalDamage / 10);
            if (hero.name === "rogue") {
                hero.attack += 3;
            }
        }
        hero.health -= fighter.NPCattack;
    }

    if (currentEnemy.name === "ranger") {
        if (hero.name === "wizard") {
            wizardAttack();
        } else {
            ranger.health -= hero.attack + Math.round(totalDamage / 10);
            totalDamage += hero.attack + Math.round(totalDamage / 10);
            if (hero.name === "rogue") {
                hero.attack += 3;
            }
        }
        hero.health -= ranger.NPCattack;
    }

    if (currentEnemy.name === "rogue") {
        if (hero.name === "wizard") {
            wizardAttack();
        } else {
            rogue.health -= hero.attack + Math.round(totalDamage / 10);
            totalDamage += hero.attack + Math.round(totalDamage / 10);
        }
        hero.health -= rogue.NPCattack;
    }

    if (currentEnemy.name === "wizard") {
        wizard.health -= hero.attack + Math.round(totalDamage / 10);
        totalDamage += hero.attack + Math.round(totalDamage / 10);
        hero.health -= wizard.NPCattack;
        if (hero.name === "rogue") {
            hero.attack += 3;
        }
        if (fighter.health > 0) {
            fighter.health -= wizard.NPCattack;
            if (fighter.health < 0) {
                fighter.health = 0;
            }
        }
        if (ranger.health > 0) {
            ranger.health -= wizard.NPCattack;
            if (ranger.health < 0) {
                ranger.health = 0;
            }
        }
        if (rogue.health > 0) {
            rogue.health -= wizard.NPCattack;
            if (rogue.health < 0) {
                rogue.health = 0;
            }
        }

    }

    if (currentEnemy.health <= 0) {
        currentEnemy.health = 0;
        retreat();
    }

    if (hero.health <= 0) {
        hero.health = 0;
        retreat();
    }

    showHealth();
}

function wizardAttack() {
    var cumulativeWizardDamage = 0;
    if (fighter.health > 0) {
        fighter.health -= hero.attack + Math.round(totalDamage / 10);
        cumulativeWizardDamage += hero.attack + Math.round(totalDamage / 10);
        if (fighter.health < 0) {
            fighter.health = 0;
        }
    }

    if (ranger.health > 0) {
        ranger.health -= hero.attack + Math.round(totalDamage / 10);
        cumulativeWizardDamage += hero.attack + Math.round(totalDamage / 10);
        if (ranger.health < 0) {
            ranger.health = 0;
        }
    }
    if (rogue.health > 0) {
        rogue.health -= hero.attack + Math.round(totalDamage / 10);
        cumulativeWizardDamage += hero.attack + Math.round(totalDamage / 10);
        if (rogue.health < 0) {
            rogue.health = 0;
        }
    }
    totalDamage += cumulativeWizardDamage;
}

function clericMafia() {
    debt += 100;
    hero.health = maxHealth;
}