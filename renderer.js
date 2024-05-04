class Renderer {
    rows = 1
    columns = 1
    t
    constructor(t){
        this.t = t
    }

    setMatch(match){
        this.match = match
    }


    updatePoints(){
        document.getElementById("pointsL").textContent = this.match.pointsL
        document.getElementById("pointsR").textContent = this.matchpointsR
        document.getElementById("setsL").textContent = this.match.setsL
        document.getElementById("setsR").textContent = this.match.setsR
    }

    updateScoreboard(){
        document.getElementById("winners").textContent = scoreboard
    }

    updateTeams(){
        document.getElementById("nameL").textContent = this.match.teamL
        document.getElementById("nameR").textContent = this.match.teamR
    }

    updateTable(teams){
        for(let i=0; i<teams.length; i++){
            document.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].insertAdjacentHTML("afterend", '<td><p>'+teams[i].name+'</p></td>')
            document.getElementsByTagName("table")[0].insertAdjacentHTML("beforeend", '<tr><td><p>'+teams[i].name+'</p></td></tr>')
            this.rows++
            this.columns++
        }
            
        for(let i = 1; i<this.columns-1; i++){ //generování prázdných políček
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
        curRow = tournament.teams.indexOf(this.match.teamL) + 1
        curColumn = tournament.teams.length - 1 - t.teams.indexOf(this.match.teamR) + 1

        if (curColumn + curRow > t.teams.length) {
            let x = curColumn //we need the value before getting overwrited on the line below
            curColumn = (t.teams.length + 1) - curRow
            curRow = (t.teams.length + 1) - x
        }

        console.log(teams, teamL, teamR, curColumn, curRow)

        if (side == "left") {
            t.scoreboard.push(this.match.teamL)
            document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style = "background-color: #81def7"
        }
        if (side == "right") {
            t.scoreboard.push(this.match.teamR)
            document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style = "background-color: #f27474"
        }
    }
}

