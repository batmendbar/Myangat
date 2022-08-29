const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');

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

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    Class.find({}, function(err, classes) {
      console.log(classes)
      res.render('pages/index', {
          class_list: classes
      })
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))