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

    }

    updateTeams(){
        document.getElementById("nameL").textContent = teamL
        document.getElementById("nameR").textContent = teamR
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
}

