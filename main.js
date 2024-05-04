/* 
* a lot of variables (and functions) with similar topic -> maybe create a class to encapsulate them?
*/
let pointsL = 0
let pointsR = 0

let setsL = 0
let setsR = 0

let maxPoints = -1

let maxSets = -1

let teamL = "Název týmu"
let teamR = "Název týmu"

let rows = 1
let columns = 1

let curColumn = 1
let curRow = 1

let scoreboard = []

/**
 * case both should be in it's own function - it doesn't need most of the checks..
 * create enum for the switch? but that's just minor, only for not having "magic constants"
 */

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
    /**
     * Don't know why this is here?
     */
    if(pointsL < 0){
        pointsL = 0
    }

    if(pointsR < 0){
        pointsR = 0
    }
    /**
     * New functionality, should be in another function (ideally one function to be called onclick, which only call other functions - pocitani bodu, pocitani setu, check win)
     */
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

    /**
     * New functionality, should be in another function.
     * Also, 2 is magic constant, should be at least variable editable in the code, better via front-end.
     */
    if(setsL >= maxSets){
        win("left", teamL)
    }

    if(setsR >= maxSets){
        win("right", teamR)
    }
    
    /**
     * New functionality, should be in another function.
     * Also, everything related to visuals should be ideally in it's own class.
     */
    //výpis všeho
    document.getElementById("pointsR").textContent=pointsR
    document.getElementById("pointsL").textContent=pointsL
    document.getElementById("setsL").textContent=setsL
    document.getElementById("setsR").textContent=setsR
    /**
     * harmless, but useless
     */
    console.log(pointsL, pointsR, maxPoints)
}

function reset(){
    pointsL = 0
    pointsR = 0
    setsL = 0
    setsR = 0
    /**
     * As mentioned before, shoud be in another function - doing this removes duplicity also
     */
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
    /**
     * What would happen, if it's not a new team? why should compute the tournament again? waste of resources.
     * Better to add guard condition: if team already in teams: alert and return. If not, do all of this.
     * Also, you shouldn't use addTeamToArray for this - that's mixing responsibilities, rather create function to check if team in teams.
     */
    
    // initialize new order of matches
    order_tournament_clear();
    order_tournament();
    
    /**
     * Should be a function in the visual class.
     */
    teamL = document.getElementsByTagName("tr")[0].getElementsByTagName("td")[curColumn].textContent
    teamR = document.getElementsByTagName("tr")[curRow].textContent

    /**
     * Maybe in its own function, doesn't feel right to be here, but not that bad.
     */
    if (ordered_matches.length > 0){ //get current teams before the first game
        let curTeams = ordered_matches.shift();
        teamL = curTeams[0]
        teamR = curTeams[1]
        /**
         * Very funny but useless log.
         */
        console.log("tento blok kodu funguje dobře:"+teamL, teamR)
    } 

    /**
     * Funny log, but I cannot digest what it means from the console. Remove, or make it more informative eg. The name of the new team is: ...
     * The document.getElement... should have it's own function, ideally in visual class.
     */
    console.log(newTeamName)
    document.getElementById("nameL").textContent = teamL
    document.getElementById("nameR").textContent = teamR
    return false
}

/**
 * OK, belongs to the visual class.
 */
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

/**
 * param name is given but never used.
 * The math is incomprehensible for me, idk why it works.
 * Too omnipotent function, should be split into more smaller ones.
 */
function win(side, name){
    curRow = Math.ceil(teams.indexOf(teamL)/2)+1
    curColumn = Math.ceil(Math.abs(teams.indexOf(teamR)-(teams.length-1))/2)

    if(curRow >= rows-1){
        curRow = 1
    }

    if(curColumn >= columns - 1){
        curColumn = 1
    }

    console.log(teams, teamL, teamR, curColumn, curRow)

    /**
     * In it's own function, in visual class.
     */
    document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].textContent=setsL+":"+setsR

    /**
     * New functionality, should be in own function.
     * Also, the confirm is interrupting everything, so the subsequent steps are not done until it's confirmed - including coloring the table and displaying the scoreboard.
     */
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

    /**
     * OK
     */
    if(side=="left"){
        scoreboard.push(teamL)
    }
    if(side=="right"){
        scoreboard.push(teamR)
    }

    reset()
    /**
     * Document.get... should be in it's own function in the visual class.
     */
    document.getElementById("winners").textContent=scoreboard
    document.getElementById("nameL").textContent = teamL
    document.getElementById("nameR").textContent = teamR

}


