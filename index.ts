type itemType = "rat" | "equipment"
type equipmentLocation = "head" | "leg" | "body" | "tail"
type combatData = {
    //expand on later? use not just for player but enemies too
    maxHealth:number
    health:number
    damageResistPercent:number

}
type statusEffectName = "radiation" | "fire" | "exhaustion"

type stats = {
    strength:number
    intelligence:number
    willpower:number
    constitution:number
}
type statsExtra = {
    strength:number
    intelligence:number
    willpower:number
    constitution:number
    maxHealth:number
    damageResistPercent:number
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
class creatureData {
    name:string;
    equipment:object;
    constructor(name:string,equipment:object){
        this.name=name
        this.equipment=equipment
    }
}
class Creature {
    [x: string]: any
    name?:string;
    equipment?:equipmentSet;
    baseStats?:stats
    stats: () => statsExtra
    strengthBonus: () => void
    intelligenceBonus: () => void
    willpowerBonus: () => void
    constitutionBonus: () => void

    constructor(name?:string,equipment?:object,baseStats?:stats){
        Object.assign(this,{type:"creature",id:1,data:new creatureData((name?name:"beast"),(equipment?equipment:emptyEquipmentSet()))})
        this.baseStats = (baseStats?baseStats:defaultStats("rat"))
        this.strengthBonus = (): Number => {
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
            return(totalBonus)
        }
        this.intelligenceBonus = (): Number => {
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
            return(totalBonus)
}
        this.willpowerBonus = (): Number => {
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
            return(totalBonus)
}
        this.constitutionBonus = (): Number => {
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
            return(totalBonus)
}
        this.stats = (): statsExtra => {return({
            strength:this.baseStats?.strength!+(this.strengthBonus() as unknown as number),
            intelligence:this.baseStats?.intelligence!+(this.intelligenceBonus() as unknown as number),
            willpower:this.baseStats?.willpower!+(this.willpowerBonus() as unknown as number),
            constitution:this.baseStats?.constitution!+(this.constitutionBonus() as unknown as number),
            maxHealth:this.baseStats?.constitution!+(this.constitutionBonus() as unknown as number)*10,
            damageResistPercent:this.baseStats?.constitution!+(this.constitutionBonus() as unknown as number)*2
        } as statsExtra)}
        this.combatData = {
            health:this.stats().maxHealth,
        }
    }
}
class sceneOption {
    id:string;
    text:string;
    requirements?: (() => boolean)
    nextScene:Scene | null | Function
    constructor(id:string,text:string,nextScene:Scene | null | Function,requirements?:(()=>boolean)) {
        this.id=id
        this.text=(text?text:"Option")
        this.nextScene=nextScene
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
class StatusEffect {
    name:string;
    effect:Function;
    constructor(name:string,effect:Function) {
        this.name=name
        this.effect=effect
    }
}
class abilityCost {
    description:string
    radiation?:number
    fire?:number
    exhaustion?:number
    health?:number
    costs:{
        radiation:number | undefined,
        fire:number | undefined,
        exhaustion:number | undefined,
        health:number | undefined
    }
    constructor(description:string,radiation?:number,fire?:number,exhaustion?:number,health?:number) {
        this.description=description
        this.costs = {
            radiation:radiation,
            fire:fire,
            exhaustion:exhaustion,
            health:health
        }
    }
}
class playerAbility {
    name:string;
    description:string;
    cost:abilityCost;
    effect:(creature:Creature,setCreature:(newCreature:Creature)=>void)=>void;
    icon?:string
    cooldown?:number;
    constructor(name:string,description:string,cost:abilityCost,effect:(creature:Creature,setCreature:(newCreature:Creature)=>void)=>void,icon?:string,cooldown?:number) {
        this.name=name
        this.description=description
        this.cost=cost
        this.effect=effect
        this.cooldown=(cooldown?cooldown:0)
        this.icon=(icon?icon:"./assets/testIcon.png")
    }

}


var playerData = {
    menuActivated:false,
    inCombat:false,
    creatureInfo:new Creature("mainCharacter",undefined,{
        strength:1,
        intelligence:1,
        willpower:1,
        constitution:1
    }),
    combatAbilities:[
        new playerAbility("kill","kill the beast :3",new abilityCost("No cost"),(creature:Creature,setCreature:(newCreature:Creature)=>void)=>{
            creature.combatData.health = 0
            console.log(creature.combatData.health)
        })
    ]
}


function loadScene(scene: Scene) {
    for(let i of document.getElementById("mainContent")!.getElementsByClassName("scene")){
        i.remove()
    }
    document.getElementById("mainContent")?.appendChild(extractElementFromScene(scene))
}
function extractElementFromScene(scene: Scene) {
    let outputElement = document.createElement('div')
    outputElement.id=scene.id
    outputElement.appendChild(document.createElement('h2'))
    outputElement.children[0].innerHTML=scene.text
    outputElement.classList.add("scene")
    for(let i of scene.options) {
        let newOption = document.createElement('p')
        newOption.classList.add("sceneChoice")
        newOption.innerHTML=(i.text as string)
        newOption.id=i.id
        newOption.onclick=()=>{
            if(i.requirements!()) {
                if(i.nextScene instanceof Scene){
                    loadScene(i.nextScene as Scene)
                } else if( i.nextScene instanceof Function) {
                    i.nextScene()
                }
            }
        }
        if(!i.requirements!()) {
            newOption.classList.add("lockedSceneChoice")
        }
        outputElement.appendChild(newOption)
    }
    return(outputElement)
}
async function toggleMenu() {
    let menuBoundingRectangle = document.getElementById("menu")?.getBoundingClientRect();
    if(!playerData.inCombat){
        if(playerData.menuActivated){
            for(let i = 0;i<menuBoundingRectangle!.height;i++) {
                document.getElementById('menu')!.style.top = (-1*i)+'px'
                document.getElementById('mainContent')!.style.top = (-1*i)+menuBoundingRectangle!.height+'px'
                await new Promise((resolve)=>setTimeout(resolve,10))
            }
            document.getElementById("menu")!.style.display="none"
        } else {
            document.getElementById("menu")!.style.display="block"
            for(let i=menuBoundingRectangle!.height;i>0;i--) {
                document.getElementById('menu')!.style.top = (menuBoundingRectangle!.height-i)-menuBoundingRectangle!.height+'px'
                document.getElementById('mainContent')!.style.top = (menuBoundingRectangle!.height-i)+'px'
                await new Promise((resolve)=>setTimeout(resolve,10))
            }
        }
        playerData.menuActivated=!playerData.menuActivated
    }

}
/*async function loadFile(file:string) {
    //this shit dont work unless i set up a (local?) web server :(
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file);
    xhr.send();
    await new Promise((resolve)=>xhr.onreadystatechange=()=>{if(xhr.readyState==4){resolve}})
    console.log(xhr.responseText)
}*/
function startCombat(enemy:Creature) {
    if(playerData.menuActivated) {
        toggleMenu()
    }
    playerData.inCombat = true
    for(let i of document.getElementById("mainContent")!.getElementsByClassName("scene")){
        i.remove()
    }
    const canvas = document.getElementById("combatCanvas")! as HTMLCanvasElement
    const canvasContext = canvas.getContext("2d")
    const {height, width} = document.getElementById("mainContent")!.getBoundingClientRect()
    canvas.height=height
    canvas.width=width
    function drawHealthBar() {
        const healthBar = {x:0,y:height-((height/10)+1),fill:((width/4)/playerData.creatureInfo.stats().maxHealth)*playerData.creatureInfo.combatData.health,height:(height/10),width:(width/4)}
        canvasContext!.clearRect(healthBar.x,healthBar.y,healthBar.height,healthBar.width)
        //console.log(healthBar)
        canvas.style.display="block"
        canvasContext!.strokeRect(healthBar.x, healthBar.y, (width/4), healthBar.height);
        canvasContext!.fillRect(healthBar.x, healthBar.y,healthBar.fill,healthBar.height)
    }
    function drawAbilities() {
        let flexAbilitiesElement = document.createElement("div") as HTMLDivElement
        let styleThing = {
            display:"flex",
            alignItems:"center",
            flexDirection:"row",
            flexWrap: "nowrap",
            justifyContent:"flex-start",
            alignContent:"space-between",
            margin:"auto",
            width:"90%",
            overflow:"auto",
            height:"30%",
            padding:"10px"

        }
        for(let i of playerData.combatAbilities) {
            let newAbilityElement = document.createElement("div") as HTMLDivElement
            Object.assign(newAbilityElement.style,{
                backgroundColor:"green",
                width:width/15+"px",
                height:width/15+"px",
                content:"url('"+i.icon+"')"
            })
            newAbilityElement.onmouseenter = () => {
                Object.assign(newAbilityElement.style,{
                    border:"3px dotted black",
                    margin:"-3px"
                })
            }
            newAbilityElement.onmouseleave = () => {
                Object.assign(newAbilityElement.style,{
                    border:"0px dotted black",
                    margin:"0px"
                })
            }
            flexAbilitiesElement.appendChild(newAbilityElement)
        }
        Object.assign(flexAbilitiesElement.style,styleThing)
        document.getElementById("mainContent")?.appendChild(flexAbilitiesElement)
        console.log(flexAbilitiesElement)
    }
    drawHealthBar()
    drawAbilities()
}
let gregScene = new Scene("opening","Welcome to,, the RAT GAME",[
    new sceneOption("lockedOption","this option should be locked",new Scene("lockedScene","You shouldn't be here",[]),()=>false),
    new sceneOption("openingoption1","The first option. Standard",new Scene("opt1","Welcome to greg town :)",[
        new sceneOption("goBack","go back",new Scene("nowayback","no way back :(",[])),
        new sceneOption("nothing","nothing",null,undefined)
    ])),
    new sceneOption("combatTestSceneOption","test combat ;(",(()=>{
        startCombat(new Creature("guh",undefined,undefined))
    }),undefined)
])
gregScene
function afterLoad() {
    loadScene(gregScene)
    //document.addEventListener("mousedown",()=>toggleMenu())
}