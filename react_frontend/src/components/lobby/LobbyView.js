import React from 'react';
import { useEffect, useState } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';
import { UserContext } from '../Hub.js/Hub';



export function LobbyView(props) {
    const { user, setUser } = React.useContext(UserContext);
    return (
        <React.Fragment>
           <p>Joined as: {user['username']}</p>
           <p>Lobby uri: {props.uri}</p>
        </React.Fragment>
    );
}

