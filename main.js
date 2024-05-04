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

let ended = false

document.getElementById("theOnlyOne").style="background-color: #FFFFFF"
document.getElementById("theOnlyOne").style="background-color: #FFFFFF"

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
        win("left")
    }

    if(setsR >= maxSets){
        win("right")
    }
    
    /**
     * New functionality, should be in another function.
     * Also, everything related to visuals should be ideally in it's own class.
     */
    draw()
}

function reset(){
    pointsL = 0
    pointsR = 0
    setsL = 0
    setsR = 0
    draw()
}
    //pojmenovávání nového týmu


/**
 * OK, belongs to the visual class.
 */
//přidávání týmu do tabulky a generování nových políček                      




/**
 * param name is given but never used.
 * The math is incomprehensible for me, idk why it works.
 * Too omnipotent function, should be split into more smaller ones.
 */
function win(side){
    curRow = teams.indexOf(teamL)+1
    curColumn = teams.length - 1 - teams.indexOf(teamR) + 1

    // if(curRow >= rows-1){
    //     curRow = 1
    // }

    // if(curColumn >= columns-1){
    //     curColumn = 1
    // }

    if(curColumn + curRow > teams.length){
        let x = curColumn //we need the value before getting overwrited on the line below
        curColumn = (teams.length + 1) - curRow
        curRow = (teams.length + 1) - x
    }

    console.log(teams, teamL, teamR, curColumn, curRow)

    if(side=="left"){
        scoreboard.push(teamL)
        document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style="background-color: #81def7"
    }
    if(side=="right"){
        scoreboard.push(teamR)
        document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style="background-color: #f27474"
    }

    

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
        ended = true
    }


    

    reset()
    
    document.getElementById("winners").textContent=scoreboard
    document.getElementById("nameL").textContent = teamL
    document.getElementById("nameR").textContent = teamR


    if(ended){
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

function draw(){
    document.getElementById("pointsR").textContent=pointsR
    document.getElementById("pointsL").textContent=pointsL
    document.getElementById("setsL").textContent=setsL
    document.getElementById("setsR").textContent=setsR
}