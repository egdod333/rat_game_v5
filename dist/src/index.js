var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var assets = {
    "abilities": {
        "End Turn": {
            "normal": "../assets/abilities/end turn/one.jpg",
            "cooldown": "../assets/abilities/test2/testicon.png"
        },
        "test1": {
            "normal": "../assets/abilities/test1/inquire.png",
            "cooldown": "../assets/abilities/test2/testicon.png"
        },
        "test2": {
            "normal": "../assets/abilities/test2/testicon.png",
            "cooldown": "../assets/abilities/test2/two.jpg"
        }
    },
    "characters": {
        "player": "../assets/character sprites/rat.png"
    }
};
var EquipmentItem = /** @class */ (function () {
    function EquipmentItem(wearableOn, attributesOn) {
        this.wearableOn = wearableOn;
        this.attributesOn = attributesOn;
    }
    return EquipmentItem;
}());
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
} //*/
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
var creatureData = /** @class */ (function () {
    function creatureData(name, equipment) {
        this.name = name;
        this.equipment = equipment;
    }
    return creatureData;
}());
var Creature = /** @class */ (function () {
    function Creature(name, equipment, baseStats) {
        var _this = this;
        Object.assign(this, { type: "creature", id: 1, data: new creatureData((name ? name : "beast"), (equipment ? equipment : emptyEquipmentSet())) });
        this.baseStats = (baseStats ? baseStats : defaultStats("rat"));
        this.strengthBonus = function () {
            var totalBonus = 0;
            if (_this.equipment) {
                for (var i in _this.equipment) {
                    if (_this.equipment[i]) {
                        if (Array.isArray((_this.equipment)[i])) {
                            for (var _i = 0, _a = _this.equipment[i].attributesOn; _i < _a.length; _i++) {
                                var j = _a[_i];
                                totalBonus += j.strength;
                            }
                        }
                        else {
                            totalBonus += _this.equipment[i].attributesOn.strength;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.intelligenceBonus = function () {
            var totalBonus = 0;
            if (_this.equipment) {
                for (var i in _this.equipment) {
                    if (_this.equipment[i]) {
                        if (Array.isArray((_this.equipment)[i])) {
                            for (var _i = 0, _a = _this.equipment[i].attributesOn; _i < _a.length; _i++) {
                                var j = _a[_i];
                                totalBonus += j.intelligence;
                            }
                        }
                        else {
                            totalBonus += _this.equipment[i].attributesOn.intelligence;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.willpowerBonus = function () {
            var totalBonus = 0;
            if (_this.equipment) {
                for (var i in _this.equipment) {
                    if (_this.equipment[i]) {
                        if (Array.isArray((_this.equipment)[i])) {
                            for (var _i = 0, _a = _this.equipment[i].attributesOn; _i < _a.length; _i++) {
                                var j = _a[_i];
                                totalBonus += j.willpower;
                            }
                        }
                        else {
                            totalBonus += _this.equipment[i].attributesOn.willpower;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.constitutionBonus = function () {
            var totalBonus = 0;
            if (_this.equipment) {
                for (var i in _this.equipment) {
                    if (_this.equipment[i]) {
                        if (Array.isArray((_this.equipment)[i])) {
                            for (var _i = 0, _a = _this.equipment[i].attributesOn; _i < _a.length; _i++) {
                                var j = _a[_i];
                                totalBonus += j.willpower;
                            }
                        }
                        else {
                            totalBonus += _this.equipment[i].attributesOn.willpower;
                        }
                    }
                }
            }
            return (totalBonus);
        };
        this.stats = function () {
            var _a, _b, _c, _d, _e, _f;
            return {
                strength: ((_a = _this.baseStats) === null || _a === void 0 ? void 0 : _a.strength) + _this.strengthBonus(),
                intelligence: ((_b = _this.baseStats) === null || _b === void 0 ? void 0 : _b.intelligence) + _this.intelligenceBonus(),
                willpower: ((_c = _this.baseStats) === null || _c === void 0 ? void 0 : _c.willpower) + _this.willpowerBonus(),
                constitution: ((_d = _this.baseStats) === null || _d === void 0 ? void 0 : _d.constitution) + _this.constitutionBonus(),
                maxHealth: ((_e = _this.baseStats) === null || _e === void 0 ? void 0 : _e.constitution) + _this.constitutionBonus() * 10,
                damageResistPercent: ((_f = _this.baseStats) === null || _f === void 0 ? void 0 : _f.constitution) + _this.constitutionBonus() * 2
            };
        };
        this.combatData = {
            health: this.stats().maxHealth,
        };
    }
    return Creature;
}());
var sceneOption = /** @class */ (function () {
    function sceneOption(text, nextScene, requirements) {
        this.text = (text ? text : "Option");
        this.nextScene = nextScene;
        this.requirements = (requirements ? requirements : function () { return ("visible"); });
    }
    return sceneOption;
}());
var Scene = /** @class */ (function () {
    function Scene(text, options) {
        this.text = text;
        this.options = options;
    }
    return Scene;
}());
var StatusEffect = /** @class */ (function () {
    function StatusEffect(name, effect) {
        this.name = name;
        this.effect = effect;
    }
    return StatusEffect;
}());
var abilityCost = /** @class */ (function () {
    function abilityCost(description, radiation, fire, exhaustion, health) {
        this.description = description;
        this.costs = {
            radiation: radiation,
            fire: fire,
            exhaustion: exhaustion,
            health: health
        };
    }
    return abilityCost;
}());
var playerAbility = /** @class */ (function () {
    function playerAbility(name, description, cost, effect, icon, cooldownIcon, cooldownLength) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.effect = effect;
        this.cooldownLength = (cooldownLength ? cooldownLength : 0);
        this.icon = icon;
        this.cooldownIcon = (cooldownIcon ? cooldownIcon : null);
        this.cooldown = 0;
    }
    return playerAbility;
}());
var playerData = {
    menuActivated: false,
    inCombat: false,
    creatureInfo: new Creature("mainCharacter", undefined, {
        strength: 1,
        intelligence: 1,
        willpower: 1,
        constitution: 5
    }),
    combatAbilities: [
        new playerAbility("test1", "description", new abilityCost("No cost"), function (creature, setCreature) {
            creature.combatData.health = 0;
            setCreature(creature);
        }, assets.abilities.test1.normal, assets.abilities.test1.cooldown, 3),
        new playerAbility("test2", "lower health by 1", new abilityCost("No cost"), function (creature, setCreature, updateAbilities, updateHealth) {
            playerData.creatureInfo.combatData.health--;
            updateHealth();
        }, assets.abilities.test2.normal, assets.abilities.test2.cooldown, 5),
        new playerAbility("End Turn", "End your turn", new abilityCost("No cost"), function (creature, setCreature, updateAbilities, updateHealth) {
            for (var _i = 0, _a = playerData.combatAbilities; _i < _a.length; _i++) {
                var i = _a[_i];
                i.cooldown = (i.cooldown >= 1 ? i.cooldown - 1 : 0);
                updateAbilities();
            }
        }, assets.abilities["End Turn"].normal, assets.abilities["End Turn"].cooldown, 0)
    ]
};
function loadScene(scene) {
    var _a;
    for (var _i = 0, _b = Array.prototype.slice.call(document.getElementById("mainContent").getElementsByClassName("scene")); _i < _b.length; _i++) {
        var i = _b[_i];
        i.remove();
    }
    (_a = document.getElementById("mainContent")) === null || _a === void 0 ? void 0 : _a.appendChild(extractElementFromScene(scene));
}
function extractElementFromScene(scene) {
    var outputElement = document.createElement('div');
    outputElement.appendChild(document.createElement('h2'));
    outputElement.children[0].innerHTML = scene.text;
    outputElement.classList.add("scene");
    var _loop_1 = function (i) {
        var newOption = document.createElement('p');
        newOption.classList.add("sceneChoice");
        newOption.innerHTML = i.text;
        newOption.onclick = function () {
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
    };
    for (var _i = 0, _a = scene.options; _i < _a.length; _i++) {
        var i = _a[_i];
        _loop_1(i);
    }
    return (outputElement);
}
function toggleMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var menuBoundingRectangle, i, i;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    menuBoundingRectangle = (_a = document.getElementById("menu")) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                    if (!!playerData.inCombat) return [3 /*break*/, 10];
                    if (!playerData.menuActivated) return [3 /*break*/, 5];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < menuBoundingRectangle.height)) return [3 /*break*/, 4];
                    document.getElementById('menu').style.top = (-1 * i) + 'px';
                    document.getElementById('mainContent').style.top = (-1 * i) + menuBoundingRectangle.height + 'px';
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10); })];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    document.getElementById("menu").style.display = "none";
                    return [3 /*break*/, 9];
                case 5:
                    document.getElementById("menu").style.display = "block";
                    i = menuBoundingRectangle.height;
                    _b.label = 6;
                case 6:
                    if (!(i > 0)) return [3 /*break*/, 9];
                    document.getElementById('menu').style.top = (menuBoundingRectangle.height - i) - menuBoundingRectangle.height + 'px';
                    document.getElementById('mainContent').style.top = (menuBoundingRectangle.height - i) + 'px';
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10); })];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    i--;
                    return [3 /*break*/, 6];
                case 9:
                    playerData.menuActivated = !playerData.menuActivated;
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
/*async function loadFile(file:string) {
    //ignore this shit it dont work
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file);
    xhr.send();
    await new Promise((resolve)=>xhr.onreadystatechange=()=>{if(xhr.readyState==4){resolve}})
    return(xhr.responseText)
}//*/
function startCombat(enemy) {
    var opponent = enemy;
    if (playerData.menuActivated) {
        toggleMenu();
    }
    playerData.inCombat = true;
    for (var _i = 0, _a = Array.prototype.slice.call(document.getElementById("mainContent").getElementsByClassName("scene")); _i < _a.length; _i++) {
        var i = _a[_i];
        i.remove();
    }
    var canvas = document.getElementById("combatCanvas");
    var canvasContext = canvas.getContext("2d");
    canvas.style.height = "70vh";
    canvas.style.width = "100vw";
    canvas.style.display = "block";
    var _b = document.getElementById("combatCanvas").getBoundingClientRect(), height = _b.height, width = _b.width;
    canvas.height = height;
    canvas.width = width;
    canvas.style.display = "block";
    function drawHealthBar() {
        var healthBar = { x: 0, y: height - ((height / 10) + 1), fill: ((width / 4) / playerData.creatureInfo.stats().maxHealth) * playerData.creatureInfo.combatData.health, height: (height / 10), width: (width / 4) };
        canvasContext.clearRect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);
        canvasContext.strokeRect(healthBar.x, healthBar.y, healthBar.width, healthBar.height);
        canvasContext.fillRect(healthBar.x, healthBar.y, healthBar.fill, healthBar.height);
    }
    function drawAbilities() {
        var _a, _b;
        var flexAbilitiesElement = document.createElement("div");
        flexAbilitiesElement.id = "abilities";
        var styleThing = {
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
        var _loop_2 = function (i) {
            var newAbilityElement = document.createElement("div");
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
            newAbilityElement.onmouseenter = function () {
                var _a;
                Object.assign(newAbilityElement.style, {
                    outline: "3px dotted black",
                    backgroundImage: "none",
                    overflow: "auto",
                });
                (_a = newAbilityElement.children[0]) === null || _a === void 0 ? void 0 : _a.remove();
                newAbilityElement.innerHTML = "<b>" + i.name + "</b><br/>" + i.description;
            };
            newAbilityElement.onmouseleave = function () {
                var _a;
                newAbilityElement.innerHTML = "";
                var newImageElement = document.createElement("img");
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
            newAbilityElement.onclick = function () {
                i.effect(opponent, function (newCreature) { opponent = newCreature; }, function () { drawAbilities(); }, function () { return drawHealthBar(); });
                i.cooldown = i.cooldownLength;
            };
            flexAbilitiesElement.appendChild(newAbilityElement);
        };
        for (var _i = 0, _c = playerData.combatAbilities; _i < _c.length; _i++) {
            var i = _c[_i];
            _loop_2(i);
        }
        Object.assign(flexAbilitiesElement.style, styleThing);
        (_a = document.getElementById("abilities")) === null || _a === void 0 ? void 0 : _a.remove();
        document.getElementById("mainContent").appendChild(flexAbilitiesElement);
        for (var _d = 0, _e = playerData.combatAbilities; _d < _e.length; _d++) {
            var i = _e[_d];
            var abilityElement = document.getElementById("abilities").children[playerData.combatAbilities.indexOf(i)];
            if (i.cooldown > 0) {
                var newImageElement = document.createElement("img");
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
        var thing = new Image();
        thing.src = assets.characters.player;
        thing.onload = function () {
            canvasContext === null || canvasContext === void 0 ? void 0 : canvasContext.drawImage(thing, 10, 10);
        };
    }
    drawHealthBar();
    drawAbilities();
    drawRat();
}
var gregScene = new Scene("Welcome to,, the RAT GAME", [
    new sceneOption("this option should be locked", new Scene("You shouldn't be here", []), function () { return ("locked"); }),
    new sceneOption("this option should be hidden", new Scene("You shouldn't be here", []), function () { return ("hidden"); }),
    new sceneOption("The first option. Standard", new Scene("Welcome to greg town :)", [
        new sceneOption("go back", new Scene("no way back :(", [])),
        new sceneOption("nothing", null, undefined)
    ])),
    new sceneOption("test combat ;(", (function () {
        startCombat(new Creature("guh", undefined, undefined));
    }), undefined)
]);
function afterLoad() {
    loadScene(gregScene);
    //document.addEventListener("mousedown",()=>toggleMenu())
    //jsonData.key = 'new value';
    //for(let i in gregScene) {
    //jsonData[i] = JSON.stringify(gregScene[i])
    //}
    // Write the updated data back to the JSON file
    //fs.writeFileSync('./data.json', JSON.stringify(jsonData, null, 2));
}
