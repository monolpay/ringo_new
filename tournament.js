class Tournament {
    teams = []
    ordered_matches = []
    scoreboard = []
    maxSets = -1
    maxPoints = -1
    matchesLeft = this.ordered_matches.length
    render
    constructor() {
       this.render = new Renderer(this)
    }

    order() {
        // create deep-copy of teams
        let using_teams = [];
        for (let i = 0; i < teams.length; i++) {
            using_teams.push(teams[i]);
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
                    ordered_matches.push([current_team_L, current_team_R]);
                } else {
                    ordered_matches.push([current_team_R, current_team_L]);
                }
            }

            // shift teams for next round
            //TADY MŮÝE BÝT PROBLÉM !!!!!!
            shift_teams(using_teams);
        }


    }

    shift_teams(teams) {
        // shift all except the first (no move at all) and the last (move individually)
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
        ordered_matches = [];
    }

    newTeam() {
        let newTeamName = document.getElementById("teamName").value
        const newTeam = Team(newTeamName)


        // tournament ordering section here

        if (addTeamToArray(newTeamName)) {
           render.updateTable(this.teams)
        }

        // initialize new order of matches
        order_tournament_clear();
        this.order();

        if (ordered_matches.length > 0) { //get current teams before the first game
            let teamL
            let teamR
            teamL, teamR = ordered_matches.shift();
        }

        match = Match(this, teamL, teamR)
        render.setMatch(match)

        render.updateTeams()
        document.getElementById("teamName").value = ""
        return false
    }

    addTeamToArray(name) {

        for (team in this.teams) {
            if (team.name == name) {

                alert("Tento tým již existuje")
                return false
            }
        }
        teams.push(name);
        return true

    }

    reset(){
        //TO DO
    }
}