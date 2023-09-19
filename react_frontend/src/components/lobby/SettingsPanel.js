import React from 'react';
import { useEffect, useState } from "react";
import { SettingsForm } from './SettingsForm';

export function SettingsPanel(props) {
    function onInviteButtonClick(e){
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href)
    }
    return (
        <div className="main-container box-shadow">
            <div className="settings-container">
                    <div className="start-options">
                        <div className="buttons-container">
                            <button disabled={!props.isOwner} onClick={props.OnStartButtonClick}>Start</button>
                            <button onClick={onInviteButtonClick}>Copy Invite</button>
                        </div>
                    </div>
                    <div className="settings">
                        <SettingsForm settings={props.settings} onChange={props.onChange} disabled={!props.isOwner}/> 
                    </div>
                </div>
        </div>
    );
}

