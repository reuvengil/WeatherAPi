import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const CityDatePicker = ({callbackOnSelect,start_date}) => {
  const [startDate, setStartDate] = useState(new Date(start_date));
  return (<div style={{zIndex:2000}}>
    <DatePicker selected={startDate} onChange={(date) => {setStartDate(date);callbackOnSelect(date.toJSON().slice(0,10).trim())}} />
    </div>);
};
export default CityDatePicker