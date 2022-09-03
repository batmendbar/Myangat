import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose'
const PORT = process.env.PORT || 3000
import {divisionResultSchema} from "./models.js"


const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app
.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.listen(PORT, () => console.log(`Listening on ${ PORT }`))


mongoose.connect('mongodb+srv://batmendbar:DOPl3dIiDwipcPhF@sandbox.3asrq.mongodb.net/competition_results?retryWrites=true&w=majority');

const DivisionResult = mongoose.model('divisionResult', divisionResultSchema)


app.get('/find_division_results/:competitionName/:year/:division/', (req, res) => {
  DivisionResult.findOne({
      "competitionName": req.params.competitionName,
      "year": req.params.year,
      "division": req.params.division
    }, 
    function(err, division_results) {
      res.render('pages/division_results', {
          division_results: division_results
      })
    })
})