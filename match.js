class Match {
    teamL
    teamR

    pointsL = 0
    pointsR = 0

    setsL = 0
    setsR = 0

    constructor(teamL, teamR) {
        this.teamL = teamL
        this.teamR = teamR

    }

    win(side) {
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
         */
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
         */
        if (side == "left") {
            scoreboard.push(teamL)
        }
        if (side == "right") {
            scoreboard.push(teamR)
        }

        reset()
        /**
         * Document.get... should be in it's own function in the visual class.
         */
        document.getElementById("winners").textContent = scoreboard
        document.getElementById("nameL").textContent = teamL
        document.getElementById("nameR").textContent = teamR

    }

    points(button) {
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

        

        if (pointsL < 0) {
            pointsL = 0
        }

        if (pointsR < 0) {
            pointsR = 0
        }

        if (maxPoints > 0) {
            if (pointsL >= maxPoints && pointsR != pointsL) {
                setsL++
                pointsL = 0
                pointsR = 0
            }

            if (pointsR >= maxPoints && pointsR != pointsL) {
                setsR++
                pointsR = 0
                pointsL = 0
            }
        }
        if (setsL >= maxSets) {
            win("left")
        }

        if (setsR >= maxSets) {
            win("right")
        }
    }
}