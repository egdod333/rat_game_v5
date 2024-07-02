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
var playerData = {
    menuActivated: false,
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
var ratNames = ["greg", "gorg", "embodiment of sin"];
var ratColors = ["brown"];
class ratData {
    constructor(name, color, equipment) {
        this.name = name;
        this.color = color;
        this.equipment = equipment;
    }
}
function ratName() {
    return (ratNames[Math.floor(Math.random() * ratNames.length)]);
}
function ratColor() {
    return (ratColors[Math.floor(Math.random() * ratColors.length)]);
}
class Rat {
    constructor(name, color, equipment, baseStats) {
        Object.assign(this, { type: "rat", id: 1, data: new ratData((name ? name : ratName()), (color ? color : ratColor()), (equipment ? equipment : emptyEquipmentSet())) });
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
        };
        this.stats = () => {
            var _a, _b, _c, _d;
            return ({
                strength: (_a = this.baseStats) === null || _a === void 0 ? void 0 : _a.strength,
                intelligence: (_b = this.baseStats) === null || _b === void 0 ? void 0 : _b.intelligence,
                willpower: (_c = this.baseStats) === null || _c === void 0 ? void 0 : _c.willpower,
                constitution: (_d = this.baseStats) === null || _d === void 0 ? void 0 : _d.constitution
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
        if (playerData.menuActivated) {
            for (let i = 0; i < menuBoundingRectangle.height; i++) {
                document.getElementById('menu').style.top = (-1 * i) + 'px';
                document.getElementById('mainContent').style.top = (-1 * i) + menuBoundingRectangle.height + 'px';
                yield new Promise((resolve) => setTimeout(resolve, 10));
            }
        }
        else {
            for (let i = menuBoundingRectangle.height; i > 0; i--) {
                document.getElementById('menu').style.top = (menuBoundingRectangle.height - i) - menuBoundingRectangle.height + 'px';
                document.getElementById('mainContent').style.top = (menuBoundingRectangle.height - i) + 'px';
                yield new Promise((resolve) => setTimeout(resolve, 10));
            }
        }
        playerData.menuActivated = !playerData.menuActivated;
    });
}
let gregScene = new Scene("opening", "Welcome to,, the RAT GAME (balls)", [
    new sceneOption("lockedOption", "this option should be locked", new Scene("lockedScene", "You shouldn't be here", []), () => false),
    new sceneOption("openingoption1", "The first option. Standard", new Scene("opt1", "Welcome to greg town :)", [
        new sceneOption("goBack", "go back", new Scene("nowayback", "no way back :(", []))
    ])),
]);
function afterLoad() {
    loadScene(gregScene);
    //document.addEventListener("mousedown",()=>toggleMenu())
}
