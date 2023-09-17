import React from 'react';
import { useEffect, useState } from "react";
import { ArticleSearch } from './ArticleSearch';
import { LanguageSelection } from './LanguageSelection';
import { EndTimerInput } from './EndTimerInput';
export function SettingsForm(props) {
    //set default settings from props.settings LobbyView -> SettingsPanel -> SettingsForm
    return (

        <React.Fragment>
            Language: <LanguageSelection isDisabled={props.disabled} value={props.settings['lang']} onChange={(newLang) => { props.onChange(({ ...props.settigns, lang: newLang })) }} />
            Start: <ArticleSearch isDisabled={props.disabled} value={props.settings['startArticle']} settings={props.settings} onArticleChange={(article) => { props.onChange({ ...props.settings, startArticle: article }) }} />
            End: <ArticleSearch isDisabled={props.disabled} value={props.settings['endArticle']} settings={props.settings} onArticleChange={(article) => { props.onChange({ ...props.settings, endArticle: article }) }} />
            EndTimer: <EndTimerInput value={props.settings['endTimer']} isDisabled={props.disabled} onChange={(newEndTimer) => {props.onChange(({...props.settigns,endTimer:newEndTimer}))}}  />
        </React.Fragment>

    );
}

 