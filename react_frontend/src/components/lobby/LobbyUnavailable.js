import React from 'react';
import { useEffect, useState } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';

export function LobbyUnavailable(props) {
    return (
        <div>
            <h1>Lobby has already started.</h1>
        </div>
    );
}

