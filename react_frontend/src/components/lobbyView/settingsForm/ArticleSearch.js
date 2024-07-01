
import React from 'react';
import { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import { searchForArticle } from '../../../lookup/lookup';
var debounce = require('debounce-promise')
export function ArticleSearch(props) {
    const [articleOptions, setArticleOptions] = useState([])
    const [value, setValue] = useState()


    async function onCurrentArticleChange(value, action) {
        if ((action['action'] == 'select-option') && ('onArticleChange' in props)) {
            //setValue(value)
            props.onArticleChange(value['label'].replaceAll(" ", "_"))
        }
    }
    async function loadOptions(input) {
        console.log(input)
        if (input.length >= 2)
            return await searchArticles(input)
    }

    //debounce to prevent making multiple unnecessary queries
    const loadOptionsDebounced = debounce(loadOptions, 600)

    async function searchArticles(articleName) {
        let lang = props.settings['lang']

        let response = await searchForArticle(articleName, lang)
        return response.body.query.search.map((element) => {
                        return {
                            value: element.pageid,
                            label: element.title
                        }
                    })
    }

    const styles = {
        option: styles => ({ ...styles, color: 'black' })
    }
    return (
        <div>
            <AsyncSelect
                isDisabled={props.isDisabled}
                value={{label:props.value,value:props.value}}
                cacheOptions
                onChange={onCurrentArticleChange}
                loadOptions={loadOptionsDebounced}
                styles={styles}
            />
        </div>
    );
}

