import mongoose from 'mongoose'
import fs from 'fs'
import {divisionResultSchema} from "./models.js"

mongoose.connect('mongodb+srv://batmendbar:DOPl3dIiDwipcPhF@sandbox.3asrq.mongodb.net/competition_results?retryWrites=true&w=majority');

const DivisionResult = mongoose.model('divisionResult', divisionResultSchema)

try {
    let data = fs.readFileSync("./dun.csv", 'Utf8').split(/\r?\n/);
    let metadata = data[0].split(',')
    let column_headers = data[1].split(',')

    let dayOneProblemCount = 0;
    let dayTwoProblemCount = 0;

    let headerPosition = {
    }

    for (let i = 0; i < column_headers.length; i++) {
        let header = column_headers[i];
        if (header.startsWith("А_")) {
            headerPosition.scores = i;
            dayOneProblemCount++;
        }
        if (header.startsWith("Б_")) {
            headerPosition.scores = i;
            dayTwoProblemCount++;
        }
        if (header == "Байр") {
            headerPosition.rank = i;
        }
        if (header == "Нэр") {
            headerPosition.name = i;
        }
        if (header == "Сургууль") {
            headerPosition.school = i;
        }
        if (header == "Бүс") {
            headerPosition.region = i;
        }
        if (header == "Ангилал") {
            headerPosition.division = i;
        }
    }

    let division_result = {
        competitionName: metadata[0],
        year: metadata[1],
        division: metadata[2],
        dayOneProblemCount: dayOneProblemCount,
        dayTwoProblemCount: dayTwoProblemCount,
        performances: []
    }
    
    data.splice(0, 2)
    data.forEach(performance => {
        performance = performance.split(',');
        division_result.performances.push({
            rank: performance[headerPosition.rank],
            name: performance[headerPosition.name],
            school: performance[headerPosition.school],
            grade: performance[headerPosition.grade],
            region: performance[headerPosition.region],
            dayOneScores: performance.slice(headerPosition.scores - dayOneProblemCount - dayTwoProblemCount + 1, headerPosition.scores+1),
            dayTwoScores: [],
        });
    })
    const divisionResult = DivisionResult.create(division_result);
} catch (Err) {
  console.error(Err);
}





