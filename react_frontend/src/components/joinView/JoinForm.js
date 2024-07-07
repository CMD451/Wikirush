import React from 'react';
import { useEffect, useRef,useState } from "react";
import '../../styles/join.css'
import '../../styles/base.css'
import { AvatarPicker } from './AvatarPicker';
import { UsernameInput } from './UsernameInput';


export function JoinForm(props) {

    const username = useRef("")
    const avatarUrl = useRef("")


    function onAvatarChange(e){
        avatarUrl.current = e
        notifyOfChange()
    }
    function onUsernameChange(e){
        username.current = e
        notifyOfChange()
    }
    function notifyOfChange(){
        if("onChange" in props){
            props.onChange({"username":username.current,"avatarUrl":avatarUrl.current})
        }
    }

    return (
        <React.Fragment>
            <header className="flex-horizontal">
                <div className="header-img-container">
                </div>
            </header>
            <main className="flex-horizontal">
                <div className="container flex">
                        <AvatarPicker onChange={onAvatarChange}/>
                    <div className="input-container flex">
                        <UsernameInput onChange={onUsernameChange}/>
                        <p className='error'>{props.error}</p>
                        <button onClick={props.onJoin}>Join</button>
                    </div>
                </div>

            </main>
            <footer>
            </footer>
        </React.Fragment>
    );
}

