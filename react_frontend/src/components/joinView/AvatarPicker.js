import React, { useEffect } from 'react';
import { useState } from "react";
import { getAvatarsPaths } from '../../util/getFilesPaths';
import '../../styles/join.css'
export function AvatarPicker(props) {
    const avatarsPaths = getAvatarsPaths();
    const [avatarIndex, setAvatarIndex] = useState(0);

    useEffect(()=>{
        props.onChange(generateAvatarUrl(avatarIndex))
    },[])

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
        console.log()
        return `${process.env.PUBLIC_URL}` + avatarsPaths[index];
    }

    return (
        <div className="avatar-picker-container">
            <div className="arrow-img center-item" onClick={() => { handleNextButtonClick(-1) }} >
                <img src={`${process.env.PUBLIC_URL}`+"./assets/img/arrow2.webp"} />
            </div>
            <div className="avatar-image-container">
                <img className='picked-avatar' src={generateAvatarUrl(avatarIndex)} />
            </div>
            <div className="arrow-img arrow-right center-item" onClick={() => { handleNextButtonClick(1) }}>
                <img src={`${process.env.PUBLIC_URL}`+"./assets/img/arrow2.webp"} />
            </div>
        </div>
    );
}

