import React from 'react';
import { useEffect, useState } from "react";
import { getAvatarsPaths } from '../../util/getFilesPaths';
import arrow from '../../assets/img/arrow2.webp';
import '../../styles/join.css'
export function AvatarPicker(props) {
    const avatarsPaths = getAvatarsPaths();
    const [avatarIndex, setAvatarIndex] = useState(0);

    function handleNextButtonClick(change) {
        let newIndex = avatarIndex + change
        if (newIndex >= avatarsPaths.length) {
            newIndex = 0;
        }
        else if (newIndex < 0) {
            newIndex = avatarsPaths.length - 1
        }
        setAvatarIndex(newIndex)
        if('onChange' in props){
            props.onChange(generateAvatarUrl(newIndex));
        }
 
    }

    function generateAvatarUrl(index){
        return `${process.env.PUBLIC_URL}` + avatarsPaths[index];
    }

    return (
        <div className="avatar-picker-container">
            <div className="arrow-img center-item" onClick={() => { handleNextButtonClick(-1) }} >
                <img src={arrow} />
            </div>
            <div className="avatar-image-container">
                <img src={generateAvatarUrl(avatarIndex)} />
            </div>
            <div className="arrow-img arrow-right center-item" onClick={() => { handleNextButtonClick(1) }}>
                <img src={arrow} />
            </div>
        </div>
    );
}

