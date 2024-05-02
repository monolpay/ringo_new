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
        win("left", teamL)
    }

    if(setsR == 2){
        win("right", teamR)
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
    
    
    // tournament ordering section here
    
    if(addTeamToArray(newTeamName)){
        addTeamToTable(newTeamName)
    }
    
    // initialize new order of matches
    order_tournament_clear();
    order_tournament();
    
    teamL = document.getElementsByTagName("tr")[0].getElementsByTagName("td")[curColumn].textContent
    teamR = document.getElementsByTagName("tr")[curRow].textContent

    if (ordered_matches.length > 0){ //get current teams before the first game
        let curTeams = ordered_matches.shift();
        teamL = curTeams[0]
        teamR = curTeams[1]
        console.log("tento blok kodu funguje dobře:"+teamL, teamR)
    } 

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

function win(side, name){
    curColumn = Math.ceil(teams.indexOf(teamL)/2)+1
    curRow = Math.ceil(teams.indexOf(teamR)/2)+1

    if(curColumn >= columns-1){
        curColumn = 1
    }

    console.log(teams, teamL, teamR, curColumn, curRow)

    document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].textContent=setsL+":"+setsR

    // get current team names
    if (ordered_matches.length > 0){
        let curTeams = ordered_matches.shift();
        teamL = curTeams[0]
        teamR = curTeams[1]
        console.log("tento blok kodu funguje dobře:"+teamL, teamR)
    } else{
        if(confirm("Hra skončila. Chcete započít nový turnaj?")){
            reset()
        }
        else {
            alert("Dobrá. Děkujeme že jste použili toto úžasné RRRingo počítadlo bodů. Vaší dedikaci si opravdu vážíme. Užívejte ringa, života nebo jiných sportovních her. \n S pozdravem\n Vývojář")
        }
    }


    if(side=="left"){
        scoreboard.push(teamL)
    }
    if(side=="right"){
        scoreboard.push(teamR)
    }

    reset()
    
    document.getElementById("winners").textContent=scoreboard
    document.getElementById("nameL").textContent = teamL
    document.getElementById("nameR").textContent = teamR

}


