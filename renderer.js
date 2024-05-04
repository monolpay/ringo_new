class Renderer {
    rows
    columns
    constructor(){

    }

    updatePoints(){
        document.getElementById("pointsL").textContent = Match.pointsL
        document.getElementById("pointsR").textContent = Match.pointsR
        document.getElementById("setsL").textContent = Match.setsL
        document.getElementById("setsR").textContent = Match.setsR
    }

    updateScoreboard(){
        document.getElementById("winners").textContent = scoreboard
    }

    updateTeams(){
        document.getElementById("nameL").textContent = Match.teamL
        document.getElementById("nameR").textContent = Match.teamR
    }

    updateTable(teams){
        for(i=0; i<teams.length; i++)
            document.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].insertAdjacentHTML("afterend", '<td><p>'+teams[i]+'</p></td>')
            document.getElementsByTagName("table")[0].insertAdjacentHTML("beforeend", '<tr><td><p>'+teams[i]+'</p></td></tr>')
            rows++
            columns++
        for(let i = 1; i<columns-1; i++){ //generování prázdnýc políček
            document.getElementsByTagName("tr")[i].insertAdjacentHTML("beforeend", '<td><p></p></td>')
        }
    }

    updateAll(){
        this.updatePoints()
        this.updateScoreboard()
        this.updateTable()
        this.updateTeams
    }

    writeToTable(){
        let curRow
        let curColumn
        curRow = Tournament.teams.indexOf(Match.teamL) + 1
        curColumn = Tournament.teams.length - 1 - Tournament.teams.indexOf(Match.teamR) + 1

        if (curColumn + curRow > Tournament.teams.length) {
            let x = curColumn //we need the value before getting overwrited on the line below
            curColumn = (Tournament.teams.length + 1) - curRow
            curRow = (Tournament.teams.length + 1) - x
        }

        console.log(teams, teamL, teamR, curColumn, curRow)

        if (side == "left") {
            Tournament.scoreboard.push(Match.teamL)
            document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style = "background-color: #81def7"
        }
        if (side == "right") {
            Tournament.scoreboard.push(Match.teamR)
            document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style = "background-color: #f27474"
        }
    }
}

