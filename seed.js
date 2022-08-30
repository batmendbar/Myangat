const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://batmendbar:DOPl3dIiDwipcPhF@sandbox.3asrq.mongodb.net/competition_results?retryWrites=true&w=majority');

let competition = {
    competitionName: "Улсын Математикийн Олимпиад",
    yearHeld: 2021,
    division: "Ахлах Ангилал",
    firstDayProblemCount: 3, 
    secondDayProblemCount: 3,
    performances: [
        {
            rank: 1,
            name: "Энэрэлт",
            school: "Сант",
            grade: 10,
            region: "Сүхбаатар Дүүрэг",
            firstDayScores: [7, 7, 0],
            secondDayScores: [7, 5, 2]
        }
    ]
}

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

const user = await Class.create(competition, function (err, small) {
    if (err) return handleError(err);
});

