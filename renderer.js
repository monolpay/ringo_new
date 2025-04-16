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
        document.getElementById("pointsR").textContent = this.match.pointsR
        document.getElementById("setsL").textContent = this.match.setsL
        document.getElementById("setsR").textContent = this.match.setsR
    }

    updateScoreboard(){
        document.getElementById('scoreboard').textContent = ""
        let orderedTeams = sort(this.t.teams)
        for(let team in orderedTeams){
            document.getElementById('scoreboard').insertAdjacentHTML("beforeend", "<p id='p"+team+"'>" + (Number(team)+1) +": " + this.t.teams[team].name + ": " + this.t.teams[team].points + "</p>") 
        }
        
    }

    updateTeams() {
        document.getElementById("nameL").textContent = this.match.teamL.name
        document.getElementById("nameR").textContent = this.match.teamR.name
    }

    updateTable(teams){

        // Tabulka uz neexistuje

        // this.columns = 1
        // this.rows = 1
        // document.getElementsByTagName("table")[0].innerHTML="<tr><td id='theOnlyOne'></td></tr>"
        // for(let i=0; i<teams.length; i++){
        //     document.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].insertAdjacentHTML("afterend", '<td><p>'+teams[i].name+'</p></td>')
        //     document.getElementsByTagName("table")[0].insertAdjacentHTML("beforeend", '<tr><td><p>'+teams[i].name+'</p></td></tr>')
        //     this.rows++
        //     this.columns++
        // }
            
        // for(let i = 1; i<this.rows-1; i++){ //generování prázdných políček
        //     for(let x = 1; x<this.columns-i; x++){
        //         document.getElementsByTagName("tr")[i].insertAdjacentHTML("beforeend", '<td><p></p></td>')
        //     }
        // }
    }

    updateAll(){
        this.updatePoints()
        this.updateScoreboard()
        this.updateTable()
        this.updateTeams()
    }

    updateAllExceptForScoreboard(){
        this.updatePoints()
        this.updateTable()
        this.updateTeams()
    }

    writeToTable(){
        let curRow
        let curColumn
        curRow = this.t.teams.indexOf(this.match.teamL) + 1
        curColumn = this.t.teams.length - 1 - t.teams.indexOf(this.match.teamR) + 1

        if (curColumn + curRow > t.teams.length) {
            let x = curColumn //we need the value before getting overwrited on the line below
            curColumn = (t.teams.length + 1) - curRow
            curRow = (t.teams.length + 1) - x
        }
        console.log(this.t.winners[this.t.winners.length-1])
        console.log(this.match.teamL.name)
        if(this.t.winners[this.t.winners.length-1].name == this.match.teamL.name){
            document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style = "background-color: #81def7"
        }
        else{
            document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style = "background-color: #f27474"
        }
        
    }
}

