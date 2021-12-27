const router = require('express').Router();
const WeatherDB = require('../db/weatherDB')

// ?name={name}&date={yyyy-mm-dd}
router.get('/',async (req, res) => {
    let {name,date} = req.query
    let date_reg = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/
    if((date == undefined || date.match(date_reg) != null)){
        let weatherDB = new WeatherDB()
        weatherDB.getWeather(name,date,(rows)=>{
            res.json(rows)    
        })
    }else{
        res.json([])
    }
})

router.post('/admin/:token/:name',(req, res) => {
    let weatherDB = new WeatherDB()
    weatherDB.adminSetCityAccessibility(req.params.name,()=>{
        res.json('good')
    })
})
router.get('/admin/:token',(req, res) => {
    if(req.params.token){
        let weatherDB = new WeatherDB()
        weatherDB.adminGetAllCities((rows)=>{
            res.json(rows)
        })
    }
})
router.get('/admin/:token/:name',(req, res) => {
    if(req.params.token){
        let weatherDB = new WeatherDB()
        weatherDB.adminGetByName(req.params.name,(rows)=>{
            res.json(rows)
        })
    }
})

router.get('/autocomplete/:name',async (req, res) => {
    let weatherDB = new WeatherDB()
    weatherDB.autocompleteCityName(req.params.name,(rows)=>{
        res.json(rows)
    })
    
})
module.exports = router;