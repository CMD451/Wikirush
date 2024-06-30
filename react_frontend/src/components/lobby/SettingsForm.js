import React from 'react';
import { useEffect, useState } from "react";
import { ArticleSearch } from './ArticleSearch';
import { LanguageSelection } from './LanguageSelection';
import { EndTimerInput } from './EndTimerInput';
export function SettingsForm(props) {
    return (

        <React.Fragment>
            <div>
                Language: <LanguageSelection isDisabled={props.disabled} value={props.settings['lang']} onChange={(newLang) => { props.onChange(({ ...props.settigns, lang: newLang })) }} />
            </div>
            <div>
                Start: <ArticleSearch isDisabled={props.disabled} value={props.settings['startArticle']} settings={props.settings} onArticleChange={(article) => { props.onChange({ ...props.settings, startArticle: article }) }} />
            </div>
            <div>
                Goal: <ArticleSearch isDisabled={props.disabled} value={props.settings['endArticle']} settings={props.settings} onArticleChange={(article) => { props.onChange({ ...props.settings, endArticle: article }) }} />
            </div>
            <div>
                End Timer: <EndTimerInput value={props.settings['endTimer']} isDisabled={props.disabled} onChange={(newEndTimer) => {props.onChange(({...props.settigns,endTimer:newEndTimer}))}}  />
            </div>
        </React.Fragment>

    );
}

 