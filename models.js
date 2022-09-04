const performanceSchema = {
    rank: String,
    name: String, 
    grade: String, 
    school: String,
    region: String,
    dayOneScores: [Number],
    dayTwoScores: [Number],
    totalScore: Number,
    award: String,
}

export const divisionResultSchema = {
    competitionName: String, 
    year: String, 
    division: String,
    dayOneProblemCount: Number, 
    dayTwoProblemCount: Number,
    performances: [performanceSchema]
}

const competitionInstanceSchema = {
    year: Number,
    date: String,
    divisions: [String]
}

export const competitionSchema = {
    competitionName: String,
    instances: [competitionInstanceSchema]
}