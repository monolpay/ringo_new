let pointsL = 0
let pointsR = 0

let setsL = 0
let setsR = 0

let maxPoints = -1
let nicenedeljicipromenna


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

    }

    if(pointsL < 0){
        pointsL = 0
    }

    if(pointsR < 0){
        pointsR < 0
    }

    if(maxPoints > 0){
        if(pointsL >= maxPoints){
            setsL ++
            pointsL = 0
        }
    
        if(pointsR >= maxPoints){
            setsR ++
            pointsR = 0
        }
    }
    

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

function newTeam() {
    let newTeamName = document.getElementById("teamName").value
    addTeamToTable(newTeamName)

    console.log(newTeamName)
    return false
}

let rows = 1
let columns = 1

function addTeamToTable(name){
    document.getElementsByTagName("tr")[0].insertAdjacentHTML("beforeend", '<td>'+name+'</td>')
    document.getElementsByTagName("table")[0].insertAdjacentHTML("beforeend", '<tr><td>'+name+'</td></tr>')
    // rows++
    // columns++
    // for(let i = 0; i<rows; i++){
    //     for(let x = 0; x <= columns; x++){
    //         document.getElementsByTagName("table")[i].insertAdjacentHTML("beforeend", "<td></td>")
    //     }
    // }

}
