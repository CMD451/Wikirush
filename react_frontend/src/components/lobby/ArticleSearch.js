import React from 'react';
import { useEffect, useState } from "react";
import { JoinLobbyView } from '../joinView/JoinLobbyView';


import Select from 'react-select'
import Async, { useAsync } from 'react-select/async';
import AsyncSelect from 'react-select/async';


import { searchForArticle } from '../../lookup/lookup';
export function ArticleSearch(props) {
    const [articleOptions,setArticleOptions] = useState([])
    const [value,setValue] = useState()
   

    async function onCurrentArticleChange(value,action){
        if((action['action'] == 'select-option')&&('onArticleChange' in props)){
            //setValue(value)
            props.onArticleChange(value['label'].replaceAll(" ","_"))
            }
        }
    async function loadOptions(input){
        if(input.length >= 2)
            await searchArticles(input)
            return articleOptions
    }

    async function searchArticles(articleName){
        let lang = props.settings['lang']
        searchForArticle(articleName,lang)
        .then((response)=>{
            setArticleOptions(response.body.query.search.map((element)=>{
                return {
                    value:element.pageid,
                    label:element.title
                }
            }))
        })
    }

    const styles = {
        option : styles => ({...styles,color:'black'})
    }
    return (
       
        <div>
            Artykuł:
            <AsyncSelect
                value={value}
                cacheOptions
                onChange={onCurrentArticleChange}
                loadOptions={loadOptions}
                styles={styles}
            />
        </div>
    );
}

