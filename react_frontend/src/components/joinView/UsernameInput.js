import React from 'react';
import { useEffect, useState } from "react";
import '../../styles/join.css'

export function UsernameInput(props) {
    const [error, setError] = useState("");
    const [username,setUsername] = useState("");

    function handleChange(event) {
        //validate

        //if valid
        setUsername(event.target.value)
        if('onChange' in props){
            console.log(event.target.value)
            props.onChange(event.target.value);
        }
    }
    return (
        <React.Fragment>
            <label for="username">Type your username!</label>
            <input name="username" className="input-username" type="text" value={username} onChange={handleChange}/>
        </React.Fragment>
            
    );
}

