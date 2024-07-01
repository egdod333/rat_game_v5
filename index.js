"use strict";
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
    constructor(id, text, requirements) {
        this.id = id;
        this.text = (text ? text : "Option");
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
function extractElementFromScene(scene) {
    let outputElement = document.createElement('div');
    outputElement.id = scene.id;
    outputElement.appendChild(document.createElement('h2'));
    outputElement.children[0].innerHTML = scene.text;
    for (let i of scene.options) {
        let newOption = document.createElement('p');
        newOption.classList.add("sceneChoice");
        newOption.innerHTML = i.text;
        newOption.id = i.id;
        outputElement.appendChild(newOption);
        outputElement.appendChild(document.createElement("br"));
    }
    return (outputElement);
}
function afterLoad() {
    document.body.appendChild(extractElementFromScene(new Scene("balls", "random scene text", [new sceneOption("option 1", "option 1 text")])));
}
