class Tournament {
    teams = []
    ordered_matches = []
    scoreboard = []
    maxSets = -1
    maxPoints = -1
    matchesLeft = this.ordered_matches.length
    render
    currMatch
    constructor() {
        this.render = new Renderer(this)
    }

    order() {
        // create deep-copy of teams
        let using_teams = [];
        for (let i = 0; i < this.teams.length; i++) {
            using_teams.push(this.teams[i]);
        }

        // guard odd number of teams
        if (using_teams.length % 2 != 0) {
            using_teams.push("break");
        }

        // all rounds
        for (let i = 0; i < using_teams.length - 1; i++) {

            // games in each round
            for (let j = 0; j < (using_teams.length / 2); j++) {

                // get current teams
                const current_team_L = using_teams[j];
                const current_team_R = using_teams[using_teams.length - 1 - j];

                // check if not dummy team
                if (current_team_L == "break" || current_team_R == "break") {
                    continue;
                }

                // alternate between L/R each round => more fair
                if (i % 2 == 0) {
                    this.ordered_matches.push(new Match(this,current_team_L,current_team_R, this.render));
                } else {
                    this.ordered_matches.push(new Match(this,current_team_R,current_team_L, this.render));
                }
            }

            // shift teams for next round
            this.shift_teams(using_teams);
        }


    }

    shift_teams(teams) {
        // shift all except the first (no move at all) and the last (move individually)
        if (teams.length <= 2){
            return;
        }
        let temp = teams[1];
        for (let i = 2; i < teams.length; i++) {
            let temp2 = teams[i];
            teams[i] = temp;
            temp = temp2;
        }
        // shift the last one
        teams[1] = temp;
    }

    order_tournament_clear() {
        this.ordered_matches = [];
    }

    newTeam() {
        let newTeamName = document.getElementById("teamName").value


        // tournament ordering section here

        if (this.addTeamToArray(newTeamName)) {
            this.render.updateTable(this.teams)
        }

        // initialize new order of matches
        this.order_tournament_clear();
        this.order();

        if (this.ordered_matches.length > 0) { //get current teams before the first game

            this.currMatch = this.ordered_matches.shift()
            this.render.setMatch(this.currMatch)
            this.render.updateTeams()
        }


        

        
        document.getElementById("teamName").value = ""
        return false
    }

    addTeamToArray(name) {

        for (const team in this.teams) {
            if (team.name == name) {

                alert("Tento tým již existuje")
                return false
            }
        }
        this.teams.push(new Team(name));
        return true

    }

    matchEnded(side){
        if (side == this.currMatch.Side.LEFT){
            this.scoreboard.push(this.currMatch.teamL)
        }else {
            this.scoreboard.push(this.currMatch.teamR)
        }
        // should be in own function, its duplicate
        this.currMatch = this.ordered_matches.shift()
        this.render.setMatch(this.currMatch)
        this.render.updateTeams()
    }

    reset(){
        //TO DO
    }
}