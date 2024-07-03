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
                for (let i = 0; i < Object.keys(this.data.equipment).length; i++) {
                    if (Object.values(this.data.equipment)[i]) {
                        if (Array.isArray(Object.values(this.data.equipment)[i].attributesOn)) {
                            for (let j of Object.values(this.data.equipment)[i].attributesOn) {
                                totalBonus += j.strength;
                            }
                        }
                        else {
                            totalBonus += Object.values(this.data.equipment)[i].attributesOn.strength;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.intelligenceBonus = () => {
            let totalBonus = 0;
            if (this.data.equipment) {
                for (let i = 0; i < Object.keys(this.data.equipment).length; i++) {
                    if (Object.values(this.data.equipment)[i]) {
                        if (Array.isArray(Object.values(this.data.equipment)[i].attributesOn)) {
                            for (let j of Object.values(this.data.equipment)[i].attributesOn) {
                                totalBonus += j.intelligence;
                            }
                        }
                        else {
                            totalBonus += Object.values(this.data.equipment)[i].attributesOn.intelligence;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.willpowerBonus = () => {
            let totalBonus = 0;
            if (this.data.equipment) {
                for (let i = 0; i < Object.keys(this.data.equipment).length; i++) {
                    if (Object.values(this.data.equipment)[i]) {
                        if (Array.isArray(Object.values(this.data.equipment)[i].attributesOn)) {
                            for (let j of Object.values(this.data.equipment)[i].attributesOn) {
                                totalBonus += j.willpower;
                            }
                        }
                        else {
                            totalBonus += Object.values(this.data.equipment)[i].attributesOn.willpower;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.constitutionBonus = () => {
            let totalBonus = 0;
            if (this.data.equipment) {
                for (let i = 0; i < Object.keys(this.data.equipment).length; i++) {
                    if (Object.values(this.data.equipment)[i]) {
                        if (Array.isArray(Object.values(this.data.equipment)[i].attributesOn)) {
                            for (let j of Object.values(this.data.equipment)[i].attributesOn) {
                                totalBonus += j.strength;
                            }
                        }
                        else {
                            totalBonus += Object.values(this.data.equipment)[i].attributesOn.strength;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.stats = () => {
            var _a, _b, _c, _d;
            return {
                strength: ((_a = this.baseStats) === null || _a === void 0 ? void 0 : _a.strength) + this.strengthBonus(),
                intelligence: ((_b = this.baseStats) === null || _b === void 0 ? void 0 : _b.intelligence) + this.intelligenceBonus(),
                willpower: ((_c = this.baseStats) === null || _c === void 0 ? void 0 : _c.willpower) + this.willpowerBonus(),
                constitution: ((_d = this.baseStats) === null || _d === void 0 ? void 0 : _d.constitution) + this.constitutionBonus()
            };
        };
        this.combatData = () => {
            return ({
                maxHealth: this.stats().constitution * 10,
                health: this.stats().constitution * 5,
                damageResistPercent: this.stats().constitution * 2
            });
        };
    }
}
class sceneOption {
    constructor(id, text, nextScene, requirements) {
        this.id = id;
        this.text = (text ? text : "Option");
        this.nextScene = nextScene;
        this.requirements = (requirements ? requirements : () => { return (true); });
    }
}
class Scene {
    constructor(id, text, options) {
        this.id = id;
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
    constructor(name, cost, effect, cooldown) {
        this.name = name;
        this.cost = cost;
        this.effect = effect;
        this.cooldown = (cooldown ? cooldown : 0);
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
    combatAbilities: []
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
    outputElement.id = scene.id;
    outputElement.appendChild(document.createElement('h2'));
    outputElement.children[0].innerHTML = scene.text;
    outputElement.classList.add("scene");
    for (let i of scene.options) {
        let newOption = document.createElement('p');
        newOption.classList.add("sceneChoice");
        newOption.innerHTML = i.text;
        newOption.id = i.id;
        newOption.onclick = () => {
            if (i.requirements()) {
                if (i.nextScene instanceof Scene) {
                    loadScene(i.nextScene);
                }
                else if (i.nextScene instanceof Function) {
                    i.nextScene();
                }
            }
        };
        if (!i.requirements()) {
            newOption.classList.add("lockedSceneChoice");
        }
        outputElement.appendChild(newOption);
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
    //this shit dont work unless i set up a (local?) web server :(
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file);
    xhr.send();
    await new Promise((resolve)=>xhr.onreadystatechange=()=>{if(xhr.readyState==4){resolve}})
    console.log(xhr.responseText)
}*/
function startCombat(enemy) {
    if (playerData.menuActivated) {
        toggleMenu();
    }
    playerData.inCombat = true;
    for (let i of document.getElementById("mainContent").getElementsByClassName("scene")) {
        i.remove();
    }
    const canvas = document.getElementById("combatCanvas");
    const canvasContext = canvas.getContext("2d");
    const { height, width } = document.getElementById("mainContent").getBoundingClientRect();
    canvas.height = height;
    canvas.width = width;
    function drawHealthBar() {
        const healthBar = { x: 0, y: height - ((height / 10) + 1), fill: ((width / 4) / playerData.creatureInfo.combatData().maxHealth) * playerData.creatureInfo.combatData().health, height: (height / 10), width: (width / 4) };
        canvasContext.clearRect(healthBar.x, healthBar.y, healthBar.height, healthBar.width);
        //console.log(healthBar)
        canvas.style.display = "block";
        canvasContext.strokeRect(healthBar.x, healthBar.y, (width / 4), healthBar.height);
        canvasContext.fillRect(healthBar.x, healthBar.y, healthBar.fill, healthBar.height);
    }
    function drawAbilities() {
        let flexAbilitiesElement = document.createElement("div");
        let styleThing = {
            display: "flex"
        };
        Object.assign(flexAbilitiesElement.style, styleThing);
        console.log(flexAbilitiesElement);
    }
    drawHealthBar();
    drawAbilities();
    // console.log(playerData.creatureInfo.stats())
    // console.log(playerData.creatureInfo.combatData().health+" / "+playerData.creatureInfo.combatData().maxHealth)
}
let gregScene = new Scene("opening", "Welcome to,, the RAT GAME", [
    new sceneOption("lockedOption", "this option should be locked", new Scene("lockedScene", "You shouldn't be here", []), () => false),
    new sceneOption("openingoption1", "The first option. Standard", new Scene("opt1", "Welcome to greg town :)", [
        new sceneOption("goBack", "go back", new Scene("nowayback", "no way back :(", [])),
        new sceneOption("nothing", "nothing", null, undefined)
    ])),
    new sceneOption("combatTestSceneOption", "test combat ;(", (() => {
        startCombat(new Creature("guh", undefined, undefined));
    }), undefined)
]);
function afterLoad() {
    loadScene(gregScene);
    //document.addEventListener("mousedown",()=>toggleMenu())
}
