class Match {
    tournament

    teamL
    teamR

    pointsL = 0
    pointsR = 0

    setsL = 0
    setsR = 0

    render

    Side = Object.freeze({
        LEFT:0,
        RIGHT:1
    })

    constructor(tournament, teamL, teamR, render) {
        this.tournament = tournament
        this.teamL = teamL
        this.teamR = teamR
        this.render = render
        this. pointsL = 0
        this.pointsR = 0

    }

    win(side) {
        this.tournament.matchEnded(side);
    }

    static points(button, tournament) {
        const match = tournament.currMatch
        switch (button) {
            case Button.PLUSR:
                match.pointsR++
                break
            case Button.MINUSR:
                match.pointsR--
                break
            case Button.PLUSL:
                match.pointsL++
                break
            case Button.MINUSL:
                match.pointsL--
                break
            case Button.BOTH:
                match.pointsL++
                match.pointsR++
                break
        }

        if (button == Button.BOTH) {
            return;
        }

        match.checkPoints();
        match.render.updatePoints()
        if (match.shouldEndSet()) {
            match.resolveSetEnd();
        }
    }

    checkPoints() {
        if (this.pointsL < 0) {
            this.pointsL = 0;
        }

        if (this.pointsR < 0) {
            this.pointsR = 0;
        }
    }

    

    shouldEndSet() {
        const maxPoints = this.tournament.maxPoints
        if (this.tournament.maxPoints <= 0) {
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
    this.render.updatePoints()
    }

    resetPoints(){

    }
}