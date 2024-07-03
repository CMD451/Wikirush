import React from 'react';
import { useState } from "react";
import '../../styles/join.css'

export function UsernameInput(props) {
    const [error, setError] = useState("");
    const [username,setUsername] = useState("");

    function handleChange(event) {
        //validate

        //if valid
        setUsername(event.target.value)
        if('onChange' in props){
            props.onChange(event.target.value);
        }
    }
    return (
        <React.Fragment>
            <label htmlFor="username">Type your username!</label>
            <input name="username" className="input-username" type="text" value={username} onChange={handleChange}/>
        </React.Fragment>
            
    );
}

