import React from 'react';

import { IoSearchOutline } from 'react-icons/io5';

import searchCSS from './search.module.css';
import { useTranslation } from 'react-i18next';

export default function Search() {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className={searchCSS.container}>

            <input className={searchCSS.search_input} type="text" placeholder={t('searchWord')} />

            <button className={searchCSS.submit_btn}><IoSearchOutline /></button>

        </div>

    </React.Fragment>

}
