const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://batmendbar:DOPl3dIiDwipcPhF@sandbox.3asrq.mongodb.net/sample_airbnb?retryWrites=true&w=majority');

const airbnbSchema = {
  listing_url: String
}

const Airbnb = mongoose.model('Airbnb', airbnbSchema)

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    Airbnb.find({}, function(err, airbnbs) {
      console.log(airbnbs)
      res.render('pages/index', {
          airbnb_list: airbnbs
      })
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))