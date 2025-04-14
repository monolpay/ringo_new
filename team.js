class Team {
    points = 0 //total number of sets won
    name

    constructor(name){
        this.name = name
    }

    addPoints(points) {
        this.points += points
    }
}
