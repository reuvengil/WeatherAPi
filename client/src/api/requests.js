import axios from 'axios'

const requests = {
    getWeather:async function(name,date){
        if(name === undefined) name=''
        return await axios.get(`http://localhost:5000/api/search/?name=${name.toLowerCase()}&date=${date}`)
    },
    autocompleteCityName:async function(name){
        if(name === undefined) return
        return await axios.get(`http://localhost:5000/api/search/autocomplete/${name}`)
    },
    citiesByDate:async function(name,date){
        return await axios.get(`http://localhost:5000/api/search?date=${date}`)
    },
    adminGetAllCities:async function(token){
        return await axios.get(`http://localhost:5000/api/search/admin/${token}`)
    },
    adminGetCityByName: async function(token,name){
        return await axios.get(`http://localhost:5000/api/search/admin/${token}/${name}`)
    },
    adminToggleAccessibility:async function(token,name){
        return await axios.post(`http://localhost:5000/api/search/admin/${token}/${name}`)
    },
}

export default requests;