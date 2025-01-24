import React from 'react';

import { IoSearchOutline } from 'react-icons/io5';

import searchCSS from './search.module.css';
import { useTranslation } from 'react-i18next';

export default function Search({location}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <div 
            style={location === 'header' ? {width: '340px'} : {}} 
            className={`${searchCSS.container} ${location === 'header' ? searchCSS.search_input_header : {}}`} 
        >

            <input 
                className={searchCSS.search_input} 
                type="text" placeholder={t('searchWord')} 
                style={i18n.language === 'en' ? {paddingRight: '0'} : {paddingLeft: '0'}}
            />

            <button className={searchCSS.submit_btn}><IoSearchOutline /></button>

        </div>

    </React.Fragment>

}
