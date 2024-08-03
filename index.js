"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class EquipmentItem {
    constructor(wearableOn, attributesOn) {
        this.wearableOn = wearableOn;
        this.attributesOn = attributesOn;
    }
}
function emptyEquipmentSet() {
    return ({
        head: null,
        body: null,
        tail: null,
        frontRightLeg: null,
        frontLeftLeg: null,
        backRightLeg: null,
        backLeftLeg: null
    });
}
function defaultStats(type) {
    if (type == "rat") {
        return ({
            strength: 3,
            intelligence: 3,
            willpower: 3,
            constitution: 3
        });
    }
    else if (type == "equipment") {
        return ({
            strength: 1,
            intelligence: 0,
            willpower: 0,
            constitution: 0
        });
    }
}
class creatureData {
    constructor(name, equipment) {
        this.name = name;
        this.equipment = equipment;
    }
}
class Creature {
    constructor(name, equipment, baseStats) {
        Object.assign(this, { type: "creature", id: 1, data: new creatureData((name ? name : "beast"), (equipment ? equipment : emptyEquipmentSet())) });
        this.baseStats = (baseStats ? baseStats : defaultStats("rat"));
        this.strengthBonus = () => {
            let totalBonus = 0;
            if (this.data.equipment) {
                for (let i in this.data.equipment) {
                    if (this.data.equipment[i]) {
                        if (Array.isArray((this.data.equipment)[i])) {
                            for (let j of this.data.equipment[i].attributesOn) {
                                totalBonus += j.strength;
                            }
                        }
                        else {
                            totalBonus += this.data.equipment[i].attributesOn.strength;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.intelligenceBonus = () => {
            let totalBonus = 0;
            if (this.data.equipment) {
                for (let i in this.data.equipment) {
                    if (this.data.equipment[i]) {
                        if (Array.isArray((this.data.equipment)[i])) {
                            for (let j of this.data.equipment[i].attributesOn) {
                                totalBonus += j.intelligence;
                            }
                        }
                        else {
                            totalBonus += this.data.equipment[i].attributesOn.intelligence;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.willpowerBonus = () => {
            let totalBonus = 0;
            if (this.data.equipment) {
                for (let i in this.data.equipment) {
                    if (this.data.equipment[i]) {
                        if (Array.isArray((this.data.equipment)[i])) {
                            for (let j of this.data.equipment[i].attributesOn) {
                                totalBonus += j.willpower;
                            }
                        }
                        else {
                            totalBonus += this.data.equipment[i].attributesOn.willpower;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.constitutionBonus = () => {
            let totalBonus = 0;
            if (this.data.equipment) {
                for (let i in this.data.equipment) {
                    if (this.data.equipment[i]) {
                        if (Array.isArray((this.data.equipment)[i])) {
                            for (let j of this.data.equipment[i].attributesOn) {
                                totalBonus += j.willpower;
                            }
                        }
                        else {
                            totalBonus += this.data.equipment[i].attributesOn.willpower;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.stats = () => {
            var _a, _b, _c, _d, _e, _f;
            return {
                strength: ((_a = this.baseStats) === null || _a === void 0 ? void 0 : _a.strength) + this.strengthBonus(),
                intelligence: ((_b = this.baseStats) === null || _b === void 0 ? void 0 : _b.intelligence) + this.intelligenceBonus(),
                willpower: ((_c = this.baseStats) === null || _c === void 0 ? void 0 : _c.willpower) + this.willpowerBonus(),
                constitution: ((_d = this.baseStats) === null || _d === void 0 ? void 0 : _d.constitution) + this.constitutionBonus(),
                maxHealth: ((_e = this.baseStats) === null || _e === void 0 ? void 0 : _e.constitution) + this.constitutionBonus() * 10,
                damageResistPercent: ((_f = this.baseStats) === null || _f === void 0 ? void 0 : _f.constitution) + this.constitutionBonus() * 2
            };
        };
        this.combatData = {
            health: this.stats().maxHealth,
        };
    }
}
class sceneOption {
    constructor(text, nextScene, requirements) {
        this.text = (text ? text : "Option");
        this.nextScene = nextScene;
        this.requirements = (requirements ? requirements : () => { return ("visible"); });
    }
}
class Scene {
    constructor(text, options) {
        this.text = text;
        this.options = options;
    }
}
class StatusEffect {
    constructor(name, effect) {
        this.name = name;
        this.effect = effect;
    }
}
class abilityCost {
    constructor(description, radiation, fire, exhaustion, health) {
        this.description = description;
        this.costs = {
            radiation: radiation,
            fire: fire,
            exhaustion: exhaustion,
            health: health
        };
    }
}
class playerAbility {
    constructor(name, description, cost, effect, icon, cooldownIcon, cooldownLength) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.effect = effect;
        this.cooldownLength = (cooldownLength ? cooldownLength : 0);
        this.icon = (icon ? icon : "./assets/testIcon.png");
        this.cooldownIcon = (cooldownIcon ? cooldownIcon : "./assets/inquire.png");
        this.cooldown = 0;
    }
}
var playerData = {
    menuActivated: false,
    inCombat: false,
    creatureInfo: new Creature("mainCharacter", undefined, {
        strength: 1,
        intelligence: 1,
        willpower: 1,
        constitution: 1
    }),
    combatAbilities: [
        new playerAbility("ability title", "description", new abilityCost("No cost"), (creature, setCreature) => {
            creature.combatData.health = 0;
            setCreature(creature);
        }, undefined, undefined, 3),
        new playerAbility("literally nothing", "does actually nothing blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah", new abilityCost("No cost"), () => { alert(); }, "./assets/one.jpg", "./assets/two.jpg", 5),
        new playerAbility("End Turn", "End your turn", new abilityCost("No cost"), (creature, setCreature, updateAbilities) => {
            for (let i of playerData.combatAbilities) {
                i.cooldown = (i.cooldown >= 1 ? i.cooldown - 1 : 0);
                updateAbilities();
            }
        }, "./assets/rat.png", "./assets/rat.png", 0)
    ]
};
function loadScene(scene) {
    var _a;
    for (let i of document.getElementById("mainContent").getElementsByClassName("scene")) {
        i.remove();
    }
    (_a = document.getElementById("mainContent")) === null || _a === void 0 ? void 0 : _a.appendChild(extractElementFromScene(scene));
}
function extractElementFromScene(scene) {
    let outputElement = document.createElement('div');
    outputElement.appendChild(document.createElement('h2'));
    outputElement.children[0].innerHTML = scene.text;
    outputElement.classList.add("scene");
    for (let i of scene.options) {
        let newOption = document.createElement('p');
        newOption.classList.add("sceneChoice");
        newOption.innerHTML = i.text;
        newOption.onclick = () => {
            if (i.requirements() != "locked") {
                if (i.nextScene instanceof Scene) {
                    loadScene(i.nextScene);
                }
                else if (i.nextScene instanceof Function) {
                    i.nextScene();
                }
            }
        };
        if (i.requirements() == "locked") {
            newOption.classList.add("lockedSceneChoice");
        }
        if (i.requirements() != "hidden") {
            outputElement.appendChild(newOption);
        }
    }
    return (outputElement);
}
function toggleMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let menuBoundingRectangle = (_a = document.getElementById("menu")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        if (!playerData.inCombat) {
            if (playerData.menuActivated) {
                for (let i = 0; i < menuBoundingRectangle.height; i++) {
                    document.getElementById('menu').style.top = (-1 * i) + 'px';
                    document.getElementById('mainContent').style.top = (-1 * i) + menuBoundingRectangle.height + 'px';
                    yield new Promise((resolve) => setTimeout(resolve, 10));
                }
                document.getElementById("menu").style.display = "none";
            }
            else {
                document.getElementById("menu").style.display = "block";
                for (let i = menuBoundingRectangle.height; i > 0; i--) {
                    document.getElementById('menu').style.top = (menuBoundingRectangle.height - i) - menuBoundingRectangle.height + 'px';
                    document.getElementById('mainContent').style.top = (menuBoundingRectangle.height - i) + 'px';
                    yield new Promise((resolve) => setTimeout(resolve, 10));
                }
            }
            playerData.menuActivated = !playerData.menuActivated;
        }
    });
}
/*async function loadFile(file:string) {
    //ignore this shit it dont work
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file);
    xhr.send();
    await new Promise((resolve)=>xhr.onreadystatechange=()=>{if(xhr.readyState==4){resolve}})
    return(xhr.responseText)
}*/
function startCombat(enemy) {
    let opponent = enemy;
    if (playerData.menuActivated) {
        toggleMenu();
    }
    playerData.inCombat = true;
    for (let i of document.getElementById("mainContent").getElementsByClassName("scene")) {
        i.remove();
    }
    const canvas = document.getElementById("combatCanvas");
    const canvasContext = canvas.getContext("2d");
    canvas.style.height = "70vh";
    canvas.style.width = "100vw";
    canvas.style.display = "block";
    const { height, width } = document.getElementById("combatCanvas").getBoundingClientRect();
    //console.log(document.getElementById("combatCanvas"))
    canvas.height = height;
    canvas.width = width;
    function drawHealthBar() {
        const healthBar = { x: 0, y: height - ((height / 10) + 1), fill: ((width / 4) / playerData.creatureInfo.stats().maxHealth) * playerData.creatureInfo.combatData.health, height: (height / 10), width: (width / 4) };
        canvasContext.clearRect(healthBar.x, healthBar.y, healthBar.height, healthBar.width);
        canvas.style.display = "block";
        canvasContext.strokeRect(healthBar.x, healthBar.y, (width / 4), healthBar.height);
        canvasContext.fillRect(healthBar.x, healthBar.y, healthBar.fill, healthBar.height);
    }
    function drawAbilities() {
        var _a, _b;
        let flexAbilitiesElement = document.createElement("div");
        flexAbilitiesElement.id = "abilities";
        let styleThing = {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            alignContent: "space-between",
            margin: "auto",
            width: "90vw",
            overflow: "auto",
            height: "30vh",
            gap: "1%"
        };
        for (let i of playerData.combatAbilities) {
            let newAbilityElement = document.createElement("div");
            Object.assign(newAbilityElement.style, {
                backgroundColor: "gray",
                width: width / 15 + "px",
                height: width / 15 + "px",
                backgroundImage: "url('" + i.icon + "')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                overflow: "hidden",
            });
            newAbilityElement.onmouseenter = () => {
                var _a;
                Object.assign(newAbilityElement.style, {
                    outline: "3px dotted black",
                    backgroundImage: "none",
                    overflow: "auto",
                });
                (_a = newAbilityElement.children[0]) === null || _a === void 0 ? void 0 : _a.remove();
                newAbilityElement.innerHTML = "<b>" + i.name + "</b><br/>" + i.description;
            };
            newAbilityElement.onmouseleave = () => {
                var _a;
                newAbilityElement.innerHTML = "";
                let newImageElement = document.createElement("img");
                newImageElement.src = i.cooldownIcon;
                Object.assign(newImageElement.style, {
                    objectFit: "cover",
                    objectPosition: "left top",
                });
                newImageElement.height = (i.cooldown > 0 ? (i.cooldown / i.cooldownLength) * newAbilityElement.getBoundingClientRect().height : 0);
                newImageElement.width = newAbilityElement.getBoundingClientRect().width;
                Object.assign(newAbilityElement.style, {
                    outline: "0px dotted black",
                    backgroundImage: "url('" + i.icon + "')",
                    overflow: "hidden"
                });
                (_a = newAbilityElement.children[0]) === null || _a === void 0 ? void 0 : _a.remove();
                newAbilityElement.appendChild(newImageElement);
            };
            newAbilityElement.onclick = () => {
                i.effect(opponent, (newCreature) => { opponent = newCreature; }, () => { drawAbilities(); });
                i.cooldown = i.cooldownLength;
            };
            flexAbilitiesElement.appendChild(newAbilityElement);
        }
        Object.assign(flexAbilitiesElement.style, styleThing);
        (_a = document.getElementById("abilities")) === null || _a === void 0 ? void 0 : _a.remove();
        document.getElementById("mainContent").appendChild(flexAbilitiesElement);
        for (let i of playerData.combatAbilities) {
            let abilityElement = document.getElementById("abilities").children[playerData.combatAbilities.indexOf(i)];
            if (i.cooldown > 0) {
                let newImageElement = document.createElement("img");
                newImageElement.src = i.cooldownIcon;
                Object.assign(newImageElement.style, {
                    objectFit: "cover",
                    objectPosition: "left top",
                    zIndex: "15"
                });
                newImageElement.height = (i.cooldown > 0 ? (i.cooldown / i.cooldownLength) * abilityElement.getBoundingClientRect().height : 0);
                newImageElement.width = abilityElement.getBoundingClientRect().width;
                (_b = abilityElement.children[0]) === null || _b === void 0 ? void 0 : _b.remove();
                abilityElement.appendChild(newImageElement);
            }
        }
    }
    function drawRat() {
        let thing = new Image();
        thing.src = "./assets/rat.png";
        thing.onload = () => {
            canvasContext === null || canvasContext === void 0 ? void 0 : canvasContext.drawImage(thing, 10, 10);
        };
    }
    drawHealthBar();
    drawAbilities();
    drawRat();
}
let gregScene = new Scene("Welcome to,, the RAT GAME", [
    new sceneOption("this option should be locked", new Scene("You shouldn't be here", []), () => { return ("locked"); }),
    new sceneOption("this option should be hidden", new Scene("You shouldn't be here", []), () => { return ("hidden"); }),
    new sceneOption("The first option. Standard", new Scene("Welcome to greg town :)", [
        new sceneOption("go back", new Scene("no way back :(", [])),
        new sceneOption("nothing", null, undefined)
    ])),
    new sceneOption("test combat ;(", (() => {
        startCombat(new Creature("guh", undefined, undefined));
    }), undefined)
]);
function afterLoad() {
    loadScene(gregScene);
    //document.addEventListener("mousedown",()=>toggleMenu())
}
