let teams = [];

let ordered_matches = [];


/**
 * Determines an order for games and returns them in array.
 * Using Round-Robin algorithm.
 * More info on R-R: https://en.wikipedia.org/wiki/Round-robin_tournament
 * @returns {Array.<[TeamL, TeamR]>} Array of tuples of two teams.
 */
function order_tournament()
{
    // guard odd number of teams
    if (teams.length % 2 != 0){
        teams.push("break");
    }

    // create deep-copy of teams
    let using_teams = [];
    for (let i = 0; i < teams.length; i++){
        using_teams.push(teams[i]);
    }
    
    // all rounds
    for(let i = 0; i < using_teams.length - 1; i++){

        // games in each round
        for(let j = 0; j < (using_teams.length / 2); j++){

            // get current teams
            const current_team_L = using_teams[j];
            const current_team_R = using_teams[using_teams.length - 1 - j];

            // check if not dummy team
            if (current_team_L == "break" || current_team_R == "break"){
                continue;
            }

            // alternate between L/R each round => more fair
            if (i % 2 == 0){
                ordered_matches.push([current_team_L, current_team_R]);
            } else{
                ordered_matches.push([current_team_R, current_team_L]);
            }
        }
        console.log(using_teams);
        shift_teams(using_teams);
    }

}

/**
 * 
 * @param {String} name 
 */
function addTeamToArray(name)
{
    teams.push(name);
}

/**
 * Shift teams in the array according to the Round-Robin algorithm.
 * @param {Array.<String>} teams List of teams you want to shift.
 */
function shift_teams(teams)
{
    // shift all except the first (no move at all) and the last (move individually)
    let temp = teams[1];
    for (let i = 2; i < teams.length; i++){
        let temp2 = teams[i];
        teams[i] = temp;
        temp = temp2;
    }
    // shift the last one
    teams[1] = temp;
}

/**
 * Order tournament for less teams than 4.
 */
function simple_order_tournament()
{
    // TO DO
}