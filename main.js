let pointsL = 0
let pointsR = 0

let setsL = 0
let setsR = 0

let maxPoints = -1

let teamL = "Název týmu"
let teamR = "Název týmu"

let rows = 1
let columns = 1

let curColumn = 1
let curRow = 1

let scoreboard = []

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
    //pojmenovávání nového týmu
function newTeam() {
    let newTeamName = document.getElementById("teamName").value
    addTeamToTable(newTeamName)
    
    // tournament ordering section here
    addTeamToArray(newTeamName);
    // initialize new order of matches
    order_tournament_clear();
    order_tournament();
    
    teamL = document.getElementsByTagName("tr")[0].getElementsByTagName("td")[curColumn].textContent
    teamR = document.getElementsByTagName("tr")[curRow].textContent

    console.log(newTeamName)
    document.getElementById("nameL").textContent = teamL
    document.getElementById("nameR").textContent = teamR
    return false
}

//přidávání týmu do tabulky a generování nových políček                      
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

    // get current team names
    if (ordered_matches.length > 0){
        teamLname, teamRname = ordered_matches.shift();
    } else{
        // what will happen, if this is the end of the game?
        //
        // currently nothing, first we need to make sure that it will be at least playable
    }

    // Here, what will you do with the names you got? Find them in the table or whatever?
    // maybe it will help, that you have all the teams in a variable, now you can determine the column/row of any team just by finding it in the array (and maybe revers +-1 or whatever, irrelevant)
    // if you would rather get index of the row/column, just say, no problem.

    // redundant now, remove at will
    if(curColumn<columns-(curRow+1)){
        curColumn++
    }
    else{
        curColumn = 1
        curRow ++
    }
    // till here redundant
    
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


