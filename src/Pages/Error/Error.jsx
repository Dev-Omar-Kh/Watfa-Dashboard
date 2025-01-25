import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

import errorCSS from './error.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Error() {

    const {t} = useTranslation();
    const navigate = useNavigate();

    return <React.Fragment>

        <div className={errorCSS.container}>

            <BiErrorAlt />

            <p>{t('errorSentence')}</p>

            <button onClick={() => navigate(-1)}>{t('goBackWord')}</button>

        </div>

    </React.Fragment>

}
