class Match {
    tournament

    teamL
    teamR

    pointsL = 0
    pointsR = 0

    setsL = 0
    setsR = 0

    Side = Object.freeze({
        LEFT:0,
        RIGHT:1
    })

    constructor(tournament, teamL, teamR) {
        this.tournament = tournament
        this.teamL = teamL
        this.teamR = teamR


    }

    win(side) {
        /*
        curRow = teams.indexOf(teamL) + 1
        curColumn = teams.length - 1 - teams.indexOf(teamR) + 1

        if (curColumn + curRow > teams.length) {
            let x = curColumn //we need the value before getting overwrited on the line below
            curColumn = (teams.length + 1) - curRow
            curRow = (teams.length + 1) - x
        }

        console.log(teams, teamL, teamR, curColumn, curRow)

        if (side == "left") {
            scoreboard.push(teamL)
            document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style = "background-color: #81def7"
        }
        if (side == "right") {
            scoreboard.push(teamR)
            document.getElementsByTagName("tr")[curRow].getElementsByTagName("td")[curColumn].style = "background-color: #f27474"
        }



        /**
         * New functionality, should be in own function.
         * Also, the confirm is interrupting everything, so the subsequent steps are not done until it's confirmed - including coloring the table and displaying the scoreboard.
         *
        // get current team names
        if (ordered_matches.length > 0) {
            let curTeams = ordered_matches.shift();
            teamL = curTeams[0]
            teamR = curTeams[1]
            console.log("tento blok kodu funguje dobře:" + teamL, teamR)
        } else {
            ended = true
        }

        reset()

        document.getElementById("winners").textContent = scoreboard
        document.getElementById("nameL").textContent = teamL
        document.getElementById("nameR").textContent = teamR


        if (ended) {
            if (confirm("Hra skončila. Chcete započít nový turnaj?")) {
                reset()
            }
            else {
                alert("Dobrá. Děkujeme že jste použili toto úžasné RRRingo počítadlo bodů. Vaší dedikaci si opravdu vážíme. Užívejte ringa, života nebo jiných sportovních her. \n S pozdravem\n Vývojář")
            }
        }

        /**
         * OK
         *
        if (side == "left") {
            scoreboard.push(teamL)
        }
        if (side == "right") {
            scoreboard.push(teamR)
        }

        reset()
        /**
         * Document.get... should be in it's own function in the visual class.
         *
        document.getElementById("winners").textContent = scoreboard
        document.getElementById("nameL").textContent = teamL
        document.getElementById("nameR").textContent = teamR
        */
        
        this.tournament.matchEnded(side);
    }

    static points(button, tournament) {
        if (tournament.currMatch != this){
            return;
        }

        switch (button) {
            case Button.PLUSR:
                pointsR++
                break
            case Button.MINUSR:
                pointsR--
                break
            case Button.PLUSL:
                pointsL++
                break
            case Button.MINUSL:
                pointsL--
                break
            case Button.BOTH:
                pointsL++
                pointsR++
                break
        }

        if (button == Button.BOTH) {
            return;
        }

        this.checkPoints();

        if (this.shouldEndSet()) {
            this.resolveSetEnd();
        }
    }

    checkPoints() {
        if (pointsL < 0) {
            pointsL = 0;
        }

        if (pointsR < 0) {
            pointsR = 0;
        }
    }

    shouldEndSet() {
        if (maxPoints <= 0) {
            return false;
        }

        if (this.pointsL == this.pointsR) {
            return false;
        }

        if (this.pointsL >= maxPoints || this.pointsR >= maxPoints) {
            return true;
        }

    }

    resolveSetEnd() {
        if (this.pointsL > this.pointsR) {
            this.setsL++;
        } else {
            this.setsR++;
        }
        this.resolveMatchEnd();
    }

    resolveMatchEnd() {
        if (this.setsL > this.setsR) {
            this.win(this.Side.LEFT);
        } else {
            this.win(this.Side.RIGHT);
        }
    }
}