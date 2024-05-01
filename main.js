let pointsL = 0
let pointsR = 0

let setsL = 0
let setsR = 0

let maxPoints = -1

let teamL = "Název týmu"
let teamR = "Název týmu"

//počítání bodů
function points(id){
    switch(id){
        case "plusR":
            pointsR ++
            break
        case "minusR":
            pointsR --
            break
        case "plusL":
            pointsL ++
            break
        case "minusL":
            pointsL --
            break
        case "both":
            pointsL++
            pointsR++
            break

    }

    if(pointsL < 0){
        pointsL = 0
    }

    if(pointsR < 0){
        pointsR = 0
    }
            //počítání setů
    if(maxPoints > 0){
        if(pointsL >= maxPoints && pointsR != pointsL){
            setsL ++
            pointsL = 0
            pointsR = 0
        }
    
        if(pointsR >= maxPoints && pointsR != pointsL){
            setsR ++
            pointsR = 0
            pointsL = 0
        }
    }

    if(setsL == 2){
        win("left")
    }

    if(setsR == 2){
        win("right")
    }
    
    //výpis všeho
    document.getElementById("pointsR").textContent=pointsR
    document.getElementById("pointsL").textContent=pointsL
    document.getElementById("setsL").textContent=setsL
    document.getElementById("setsR").textContent=setsR
    console.log(pointsL, pointsR, maxPoints)
}

function reset(){
    pointsL = 0
    pointsR = 0
    setsL = 0
    setsR = 0
    document.getElementById("pointsR").textContent=pointsR
    document.getElementById("pointsL").textContent=pointsL
    document.getElementById("setsL").textContent=setsL
    document.getElementById("setsR").textContent=setsR
}

let curColumn = 1
let curRow = 1

    //pojmenovávání nového týmu
function newTeam() {
    let newTeamName = document.getElementById("teamName").value
    addTeamToTable(newTeamName)
    teamL = document.getElementsByTagName("tr")[0].getElementsByTagName("td")[curColumn].textContent
    teamR = document.getElementsByTagName("tr")[curRow].textContent

    console.log(newTeamName)
    document.getElementById("nameL").textContent = teamL
    document.getElementById("nameR").textContent = teamR
    return false
}
  

//přidávání týmu do tabulky a generování nových políček
let rows = 1
let columns = 1
                        
function addTeamToTable(name){
    document.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].insertAdjacentHTML("afterend", '<td><p>'+name+'</p></td>')
    document.getElementsByTagName("table")[0].insertAdjacentHTML("beforeend", '<tr><td><p>'+name+'</p></td></tr>')
    rows++
    columns++
    for(let i = 1; i<columns-1; i++){ //generování prázdnýc políček
        document.getElementsByTagName("tr")[i].insertAdjacentHTML("beforeend", '<td><p></p></td>')
    }

}

function win(side){
    document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].textContent=setsL+":"+setsR

    if(curColumn<columns-(curRow+1)){
        curColumn++
    }
    else{
        curColumn = 1
        curRow ++
    }
    
    
    teamL = document.getElementsByTagName("tr")[0].getElementsByTagName("td")[curColumn].textContent
    teamR = document.getElementsByTagName("tr")[curRow].textContent
    if(side=="left"){
        scoreboard.push(teamL)
    }
    if(side=="right"){
        scoreboard.push(teamR)
    }

    reset()
    console.log(scoreboard)
    document.getElementById("winners").textContent=scoreboard
    document.getElementById("nameL").textContent = teamL
    document.getElementById("nameR").textContent = teamR

}

let scoreboard = []
