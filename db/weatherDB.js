const sqlite3 = require('sqlite3').verbose();

class WeatherDB {

    constructor() {
        this.filename = './db/weather.db'
        this.querys = {
            search: 'SELECT dates.* FROM dates INNER JOIN cities ON cities.name = dates.city_name'
        }
    }
    adminSetCityAccessibility(city_name,callback){
        let db = new sqlite3.Database(this.filename, (err) => {
            if (err) return console.log(err);
            
            let query = `UPDATE cities SET accessible = not accessible WHERE lower(name) = "${city_name.toLowerCase()}"`
            db.all(query, [], (err) => {
                if (err) return console.error(err);
                callback()
            })
            db.close((err) => {if(err) console.log(err)})
        })
    }
    adminGetAllCities(callback){
        let db = new sqlite3.Database(this.filename, (err) => {
            if (err) return console.log(err);
            
            // autocomplete query - get cities name that starting with city_name
            let query = `SELECT name,accessible FROM cities LIMIT 50`

            db.all(query, [], (err, rows) => {
                if (err) return console.error(err);
                callback(rows)
            })
            db.close((err) => {if(err) console.log(err)})
        })
    }
    adminGetByName(city_name,callback){
        let db = new sqlite3.Database(this.filename, (err) => {
            if (err) return console.log(err);
            
            // autocomplete query - get cities name that starting with city_name
            let query = `SELECT name,accessible FROM cities WHERE lower(cities.name) LIKE "${city_name.toLowerCase()}%" LIMIT 5`

            db.all(query, [], (err, rows) => {
                if (err) return console.error(err);
                callback(rows)
            })
            db.close((err) => {if(err) console.log(err)})
        })
    }
    autocompleteCityName(city_name,callback){
        let db = new sqlite3.Database(this.filename, (err) => {
            if (err) return console.log(err);
            
            // autocomplete query - get cities name that starting with city_name
            let query = `SELECT cities.name FROM cities WHERE lower(cities.name) LIKE "${city_name.toLowerCase()}%" AND cities.accessible = 1 LIMIT 5`

            db.all(query, [], (err, rows) => {
                if (err) return console.error(err);
                callback(rows)
            })
            db.close((err) => {if(err) console.log(err)})
        })
    }
    getWeather(city_name, date, callback) {
        let db = new sqlite3.Database(this.filename, (err) => {
            if (err) return console.log(err);
            let query = ''
            if (city_name != undefined && date != undefined) {
                query = `SELECT dates.* FROM dates INNER JOIN cities ON cities.name = dates.city_name AND cities.accessible = 1 WHERE dates.date = "${date}" AND lower(dates.city_name) = "${city_name}"`
            } else if (city_name != undefined) {
                // get list of 20 weather ad the selected city
                query = `SELECT dates.* FROM dates INNER JOIN cities ON cities.name = dates.city_name AND cities.accessible = 1 WHERE lower(dates.city_name) = "${city_name}" LIMIT 20`
            } else if(date != undefined){
                // get list of 20 weather ad the selected date
                query = `SELECT dates.* FROM dates INNER JOIN cities ON cities.accessible = 1 WHERE dates.date ="${date}" LIMIT 20`
            }
            if(query == ''){
                db.close((err) => console.log(err))    
                return callback([])
            }
            db.all(query, [], (err, rows) => {
                if (err) return console.error(err);
                callback(rows)
            })

            db.close((err) => {if(err) console.log(err)})
        })
    }
}




var db = new sqlite3.Database('weather.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
});
module.exports = WeatherDB