import {React,Component} from 'react';
import CityAutoComplete from './CityAutoComplete';
import CityDatePicker from "./DataPicker";
export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:props.name,
            date:props.date
        }
        this.searchCallback = props.searchCallback
    }
    render(){
        return(
            <div className='d-flex justify-content-between p-2' style={{width:'50%',margin:'auto'}}>
                <CityDatePicker start_date={this.state.date} callbackOnSelect={(date)=>{
                   this.setState({date:date})
                   this.searchCallback(this.state.name,date)
               }}/>
                <CityAutoComplete start_city={this.state.name} token={false} callbackOnSelect={(name)=>{
                    this.setState({name:name})
                    this.searchCallback(name,this.state.date) 
                }}/> 
            </div>
        )
    }
}

// const Example = () => {
//     const [startDate, setStartDate] = useState(new Date());
//     return (
//       <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//     );
//   };