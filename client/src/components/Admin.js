import { Button } from "@material-ui/core"
import React, { Component } from "react"
import requests from "../api/requests"
import AdminTable from "./AdminTable"
import CityAutoComplete from "./CityAutoComplete"
import WeatherTable from "./WeatherTable"

export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = { name: '',dataTable:[] }
        this.callbackOnSelect = this.callbackOnSelect.bind(this)
        this.triggerHandler = this.triggerHandler.bind(this)
    }
    async callbackOnSelect(name){
        if(name === undefined){
            this.setState({ 
                name: name,
                dataTable:(await requests.adminGetAllCities(true)).data
            })
        }else{
            this.setState({ 
                name: name,
                dataTable:(await requests.adminGetCityByName(true,name)).data
            })
        }
    }
    async triggerHandler(name){
        
        if(this.state.name != undefined || this.state.name.trim() != ''){
            this.setState({ 
                name: name,
                dataTable:(await requests.adminGetAllCities(true)).data
            })
        }else if(this.state.dataTable.length === 1){
            this.setState({ 
                name: name,
                dataTable:(await requests.adminGetCityByName(true,name)).data
            })
        }
        this.forceUpdate()
    }
    async componentDidMount(){
        
        this.setState({dataTable:(await requests.adminGetAllCities(true)).data})
    }

    render() {
        return (<>
            <div className='d-flex justify-content-between'>
                <Button color="primary" href='/' variant="contained">Home</Button>
            </div>
            <div className='d-flex justify-content-between p-2' style={{ width: '50%', margin: 'auto' }}>
                <CityAutoComplete start_city={this.state.name} token={true} callbackOnSelect={this.callbackOnSelect} />
            </div>
            <AdminTable dataTable={this.state.dataTable} admin={this.triggerHandler}/>
        </>)
    }
}
