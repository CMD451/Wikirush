import React from 'react';
import { useEffect, useState } from "react";


export function LanguageSelection(props) {
    const [value,setValue] = useState("en")
    function handleOnChange(e){
        setValue(e.target.value)
        if("onChange" in props){
            props.onChange(e.target.value)
        }
    }
    return (

        <React.Fragment>
            <select value={value} onChange={handleOnChange} >
                <option value="en">English</option>
                <option value="pl">Polish</option>
                <option value="de">German</option>
            </select>
        </React.Fragment>

    );
}

