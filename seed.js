const mongoose = require('mongoose');
const fs = require('fs');
const readline = require("readline");
const stream = fs.createReadStream("./Нийслэл_2018_Шалгасан_Боловсруулсан.csv");
const rl = readline.createInterface({ input: stream });

let competition = {
    competitionName: "Нийслэлийн Математикийн Олимпиад",
    yearHeld: 2018,
    division: "5-р анги",
    firstDayProblemCount: 4, 
    secondDayProblemCount: 0,
    performances: []
}

rl.on("line", (row) => {
    let performance = row.split(",");
    console.log(performance.slice(3, 7))
    competition.performances.push({
        rank: performance[0],
        name: performance[1],
        school: performance[2],
        grade: "Unknown",
        region: "Unknown",
        firstDayScores: performance.slice(3, 7),
        secondDayScores: []
    })
});

rl.on("close", () => {
    const user = Class.create(competition, function (err, small) {
        if (err) return handleError(err);
    });
});


mongoose.connect('mongodb+srv://batmendbar:DOPl3dIiDwipcPhF@sandbox.3asrq.mongodb.net/competition_results?retryWrites=true&w=majority');


const performanceSchema = {
    rank: Number, 
    name: String,
    school: String,
    grade: String,  
    region: String,  
    firstDayScores: [Number],
    secondDayScores: [Number]
  }
  
const competitionDivisionSchema = {
    competitionName: String,
    yearHeld: Number,
    division: String,
    firstDayProblemCount: Number,
    secondDayProblemCount: Number,
    performances: [performanceSchema]
}

const Class = mongoose.model('class', competitionDivisionSchema)



