export const performanceSchema = {
    rank: String,
    name: String, 
    grade: String, 
    school: String,
    region: String,
    dayOneScores: [Number],
    dayTwoScores: [Number]
}

export const divisionResultSchema = {
    competitionName: String, 
    year: String, 
    division: String,
    dayOneProblemCount: Number, 
    dayTwoProblemCount: Number,
    performances: [performanceSchema]
}