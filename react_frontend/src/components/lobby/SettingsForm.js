import React from 'react';
import { useEffect, useState } from "react";
import { ArticleSearch } from './ArticleSearch';
import { LanguageSelection } from './LanguageSelection';

export function SettingsForm(props) {
//set default settings from props.settings LobbyView -> SettingsPanel -> SettingsForm
    const [settings,setSettings] = useState(props.settigns)

   return (

        <React.Fragment>
            Language: <LanguageSelection onChange={(newLang) => {props.onChange(({...props.settigns,lang:newLang}))}    } />
            Start: <ArticleSearch settings={props.settings} onArticleChange={(article)=>{props.onChange({...props.settings,startArticle:article})}}/>
            End: <ArticleSearch settings={props.settings}  onArticleChange={(article)=>{props.onChange({...props.settings,endArticle:article})}}/>
        </React.Fragment>

    );
}

