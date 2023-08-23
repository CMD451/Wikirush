import React from 'react';
import { useEffect, useState } from "react";
import '../../styles/join.css'
import { AvatarPicker } from './AvatarPicker';
import { UsernameInput } from './UsernameInput';
import avatar from "../../assets/img/avatars/avatar.png"

export function JoinLobbyView(props) {

    const [username,setUsername] = useState("")
    const [avatarUrl,setAvatarUrl] = useState(avatar)


    function onAvatarChange(e){
        setAvatarUrl(e);
    }
    function onUsernameChange(e){
        setUsername(e);
    }
    useEffect(()=>{
        if("onChange" in props){
            props.onChange({"username":username,"avatarUrl":avatarUrl})
        }
    },[username,avatarUrl])
    return (
        <React.Fragment>
            <header className="flex-horizontal">
                <div className="header-img-container">
                </div>
            </header>
            <main className="flex-horizontal">
                <div className="container flex">
                    <div className="avatar-picker-container">
                        <AvatarPicker onChange={onAvatarChange}/>
                    </div>
                    <div className="input-container flex">
                        <UsernameInput onChange={onUsernameChange}/>
                        <button onClick={props.onJoin}>Join</button>
                    </div>
                </div>

            </main>
            <footer>
            </footer>
        </React.Fragment>
    );
}

