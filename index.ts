type itemType = "rat" | "equipment"
type equipmentLocation = "head" | "leg" | "body" | "tail"
type stats = {
    strength:number
    intelligence:number
    willpower:number
    constitution:number
}
type equipmentEffect = {
    strength:number
    intelligence:number
    willpower:number
    constitution:number
}
type equipmentItem = {
    wearableOn:Array<equipmentLocation>
    attributesOn:{
        head:equipmentEffect|Array<equipmentEffect>
        leg:equipmentEffect|Array<equipmentEffect>
        body:equipmentEffect|Array<equipmentEffect>
        item:equipmentEffect|Array<equipmentEffect>
    }
}
class EquipmentItem {
    wearableOn: Array<equipmentLocation>
    attributesOn:equipmentEffect | Array<equipmentEffect>
    constructor(wearableOn:Array<equipmentLocation>,attributesOn:equipmentEffect | Array<equipmentEffect>) {
        this.wearableOn=wearableOn
        this.attributesOn=attributesOn
    }
}
type equipmentSet = {
    [x: string]: any
    head:equipmentItem | null,
    body:equipmentItem | null,
    tail:equipmentItem | null,
    frontRightLeg:equipmentItem | null,
    frontLeftLeg:equipmentItem | null,
    backRightLeg:equipmentItem | null,
    backLeftLeg:equipmentItem | null
}
function emptyEquipmentSet() {
    return(
        {
            head:null,
            body:null,
            tail:null,
            frontRightLeg:null,
            frontLeftLeg:null,
            backRightLeg:null,
            backLeftLeg:null
        }
    )
}
function defaultStats(type:itemType) {
    if(type=="rat") {
        return({
            strength:3,
            intelligence:3,
            willpower:3,
            constitution:3
        })
    } else if (type=="equipment") {
        return({
            strength:1,
            intelligence:0,
            willpower:0,
            constitution:0
        })
    }

}
var ratNames = ["greg","gorg","embodiment of sin"]
var ratColors = ["brown"]
interface Item_Generic {
    type: itemType;
    id: number;
    data: Object | false;
}
class ratData {
    name:string;
    color:string;
    equipment:object;
    constructor(name:string,color:string,equipment:object){
        this.name=name
        this.color=color
        this.equipment=equipment
    }
}
function ratName() {
    return(ratNames[Math.floor(Math.random()*ratNames.length)])
}
function ratColor() {
    return(ratColors[Math.floor(Math.random()*ratColors.length)])
}
class Rat {
    [x: string]: any
    name?:string;
    color?:string;
    equipment?:equipmentSet;
    baseStats?:stats
    stats: () => void
    strengthBonus: () => void
    intelligenceBonus: () => void
    willpowerBonus: () => void
    constitutionBonus: () => void
    constructor(name?:string,color?:string,equipment?:object,baseStats?:stats){
        Object.assign(this,{type:"rat",id:1,data:new ratData((name?name:ratName()),(color?color:ratColor()),(equipment?equipment:emptyEquipmentSet()))})
        this.baseStats = (baseStats?baseStats:defaultStats("rat"))
        this.strengthBonus = () => {
            let totalBonus = 0
            if(this.data.equipment){
                for(let i = 0;i<Object.keys(this.data.equipment).length;i++) {
                    if(Object.values(this.data.equipment)[i]) {
                        if(Array.isArray((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn)) {
                            for(let j of ((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn as Array<equipmentEffect>)) {
                                totalBonus+=j.strength
                            }
                        } else {
                            totalBonus+=((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn as equipmentEffect).strength
                        }
                    }
                }
            }
        }
        this.intelligenceBonus = () => {
            let totalBonus = 0
            if(this.data.equipment){
                for(let i = 0;i<Object.keys(this.data.equipment).length;i++) {
                    if(Object.values(this.data.equipment)[i]) {
                        if(Array.isArray((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn)) {
                            for(let j of ((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn as Array<equipmentEffect>)) {
                                totalBonus+=j.intelligence
                            }
                        } else {
                            totalBonus+=((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn as equipmentEffect).intelligence
                        }
                    }
                }
            }
}
        this.willpowerBonus = () => {
            let totalBonus = 0
            if(this.data.equipment){
                for(let i = 0;i<Object.keys(this.data.equipment).length;i++) {
                    if(Object.values(this.data.equipment)[i]) {
                        if(Array.isArray((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn)) {
                            for(let j of ((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn as Array<equipmentEffect>)) {
                                totalBonus+=j.willpower
                            }
                        } else {
                            totalBonus+=((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn as equipmentEffect).willpower
                        }
                    }
                }
            }
}
        this.constitutionBonus = () => {
            let totalBonus = 0
            if(this.data.equipment){
                for(let i = 0;i<Object.keys(this.data.equipment).length;i++) {
                    if(Object.values(this.data.equipment)[i]) {
                        if(Array.isArray((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn)) {
                            for(let j of ((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn as Array<equipmentEffect>)) {
                                totalBonus+=j.strength
                            }
                        } else {
                            totalBonus+=((Object.values(this.data.equipment)[i] as EquipmentItem).attributesOn as equipmentEffect).strength
                        }
                    }
                }
            }
}
        this.stats = () => {return({
            strength:this.baseStats?.strength,
            intelligence:this.baseStats?.intelligence,
            willpower:this.baseStats?.willpower,
            constitution:this.baseStats?.constitution
        })}
    }
}
class sceneOption {
    id:string;
    text?:string;
    requirements?: (() => boolean)
    constructor(id:string,text?:string,requirements?:(()=>boolean)) {
        this.id=id
        this.text=(text?text:"Option")
        this.requirements=(requirements?requirements:()=>{return(true)})
    }
}
class Scene {
    id:string;
    text:string;
    options:Array<sceneOption>
    constructor(id:string,text:string,options:Array<sceneOption>) {
        this.id=id
        this.text=text
        this.options=options
    }
}
function extractElementFromScene(scene: Scene) {
    let outputElement = document.createElement('div')
    outputElement.id=scene.id
    outputElement.appendChild(document.createElement('h2'))
    outputElement.children[0].innerHTML=scene.text
    for(let i of scene.options) {
        let newOption = document.createElement('p')
        newOption.classList.add("sceneChoice")
        newOption.innerHTML=(i.text as string)
        newOption.id=i.id
        outputElement.appendChild(newOption)
        outputElement.appendChild(document.createElement("br"))
    }
    return(outputElement)
}
function afterLoad() {
    document.body.appendChild(extractElementFromScene(new Scene("balls","random scene text",[new sceneOption("option 1","option 1 text")])))
}