import React from 'react';
import { useEffect, useState } from "react";
import { SettingsForm } from './SettingsForm';

export function SettingsPanel(props) {
    function onInviteButtonClick(e){
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href)
    }
    return (
        <div className="player-list-container flex-horizontal box-shadow">
            <div className="settings-container flex">
                    <div className="start-options flex-horizontal">
                        <div className="buttons-container">
                            <button disabled={!props.isOwner} onClick={props.OnStartButtonClick}>Start</button>
                            <button onClick={onInviteButtonClick}>Copy Invite</button>
                        </div>
                    </div>
                    <div className="settings box-shadow">
                        <SettingsForm settings={props.settings} onChange={props.onChange} disabled={!props.isOwner}/> 
                    </div>
                </div>
        </div>
    );
}

