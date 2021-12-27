import React, { Component } from "react";
import MaterialTable from 'material-table'

export default class WeatherTable extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {title:"City Name",field:"city_name"},
            {title:"Day",field:"day"},
            {title:"Date",field:"date"},
            {title:"Weather",field:"weather"},
            {title:"Description",field:"description"},
            {title:"Pressure",field:"pressure"},
            {title:"Humidity",field:"humidity"},
            {title:"Wind(KM/H)",field:"wind_speed"},
            {title:"Temp Deg",field:"deg"},
            {title:"Clouds",field:"clouds"}
        ]
    }
    

    render(){
        return(
            <MaterialTable title="Weather" columns={this.columns} data={this.props.dataTable} options={{draggable:false}}/>
        )
    }
}


