import React, { useState } from "react";
import requests from "../api/requests";
import '../css/autocomplete.css'
export default function CityAutoComplete({start_city,token,callbackOnSelect}){
    const [input, setInput] = useState(start_city);
    const [suggestions_citys, setSuggestions_citys] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const onChange = function(e){
        const userInput = e.target.value;
        if(userInput && userInput.trim()!==''){
            const prom = token?
            requests.adminGetCityByName(true,userInput):
            requests.autocompleteCityName(userInput)
            prom.then(res=>{
                const citys = res.data;
                setSuggestions_citys(citys);
                setShowSuggestions(citys.length > 0)
            })
        }else{
            setShowSuggestions(false);
            setSuggestions_citys([]);
            callbackOnSelect(undefined)
        }
        setInput(userInput)
    };
    const onClick = (e) => {
        setSuggestions_citys([]);
        setInput(e.target.innerText);
        callbackOnSelect(e.target.innerText)
        setShowSuggestions(false);
      };

    const SuggestionsListComponent = ()=>{
        return suggestions_citys.length ? (
            <ul className="suggestions" style={{position:'absolute',background:'#ffffff',zIndex:2000}}>
                {suggestions_citys.map(suggestion => {
                    return(
                        <li key={suggestion.name} onClick={onClick}>
                            {suggestion.name}
                        </li>
                    )
                })}
            </ul>
        ):<></>
    }
    return (
        <div>
        <input
            type="text"
            value={input}
            placeholder="cities"
            onChange={onChange}/>
            {showSuggestions && input && <SuggestionsListComponent/>}
        </div>
    )
}

