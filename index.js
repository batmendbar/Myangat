const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://batmendbar:DOPl3dIiDwipcPhF@sandbox.3asrq.mongodb.net/competition_results?retryWrites=true&w=majority');

const performanceSchema = {
  name: String, 
  grade: String, 
  school: String,
  region: String,
  dayOneScores: [Number],
  dayTwoScores: [Number]
}

const divisionResultSchema = {
  competitionName: String, 
  year: String, 
  division: String,
  firstDayProblemCount: Number, 
  secondDayProblemCount: Number,
  performances: [performanceSchema]
}

// const competitionSchema = {
//   competitionName: String,
//   instances: []
// }

const app = express()

app
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.listen(PORT, () => console.log(`Listening on ${ PORT }`))

const DivisionResult = mongoose.model('divisionResult', divisionResultSchema)

// app.get('/', (req, res) => {
//   Competition.find({}, function(err, classes) {
//     res.render('pages/competitions', {
//         class_list: classes
//     })
//   })
// })

app.get('/find_division_results/:competitionName/:year/:division/', (req, res) => {
  DivisionResult.findOne({
      // "competitionName": req.params.competitionName,
      // "year": req.params.year,
      // "division": req.params.division
    }, 
    function(err, division_results) {
      console.log(division_results);
      res.render('pages/division_results', {
          division_results: division_results
      })
    })
})