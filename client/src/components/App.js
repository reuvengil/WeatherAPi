import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import requests from '../api/requests';
import SearchBar from './SearchBar';
import WeatherTable from './WeatherTable';


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name:'Tel Aviv',
      date:'2017-03-14',
      dataTable:[]
    }
    this.searchCallback = this.searchCallback.bind(this)
  }
  async searchCallback(name,date){
    let getWeatherData
    if(name === undefined){
      getWeatherData = requests.citiesByDate
    }else{
      getWeatherData = requests.getWeather
    }
    this.setState({
      dataTable:(await getWeatherData(name,date)).data
    })
  }

  async componentDidMount(){
    let getWeatherData
    if(this.state.name === undefined){
      getWeatherData = requests.citiesByDate
    }else{
      getWeatherData = requests.getWeather
    }
    this.setState({
      dataTable:(await getWeatherData(this.state.name,this.state.date)).data
    })
  }
  

  render() {
    return(<>
      <div className='d-flex justify-content-between'>
          <Button color="primary" href='/admin' variant="contained">Admin</Button>
      </div>
    <SearchBar name={this.state.name} date={this.state.date} searchCallback={this.searchCallback}/>
    <WeatherTable dataTable={this.state.dataTable}/>
    <div className='text-center mt-2'>
      <h5>The api database contain 162,016 cities and weather's dates between 2017-03-14 to 2017-03-29</h5>
    </div>
    </>)    
  }
}