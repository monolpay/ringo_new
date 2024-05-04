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
    // if(setsL >= maxSets){
    //     win("left")
    // }

    // if(setsR >= maxSets){
    //     win("right")
    // }
    
    /**
     * New functionality, should be in another function.
     * Also, everything related to visuals should be ideally in it's own class.
     */
}

function reset(){
    pointsL = 0
    pointsR = 0
    setsL = 0
    setsR = 0
}
    //pojmenovávání nového týmu

