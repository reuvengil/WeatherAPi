import React, { Component, forwardRef } from "react";
import MaterialTable from 'material-table'
import { Button } from "@material-ui/core";
import requests from "../api/requests";

const tableIcons = {Add: forwardRef((props, ref) => <Button color="primary" variant="contained">*</Button>)}
export default class AdminTable extends Component{
    constructor(props) {
        super(props);
        this.columns = [
            {title:"City Name",field:"name"},
            {title:"Accessible",field:"accessible"},
        ]
    }
    

    render(){
        return(
            <MaterialTable 
            title="Admin Table" 
            columns={this.columns} 
            data={this.props.dataTable} 
            options={{draggable:false}}
            icons={tableIcons}
            localization={{
                header: {
                    actions: 'Toggle'
                },

            }}
            actions={[
                {
                  icon: tableIcons.Add,
                  tooltip: 'Toggle Accessible',
                  onClick: (event, rowData) => {
                        requests.adminToggleAccessibility(true,rowData.name).then(()=>{
                            this.props.admin(rowData.name)
                        })
                  }
                }
              ]}/>
        )
    }
}


