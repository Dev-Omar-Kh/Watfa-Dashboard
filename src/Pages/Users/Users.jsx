import React from 'react';

import usersCSS from './users.module.css';
import { useTranslation } from 'react-i18next';

export default function Users() {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className={usersCSS.container}>

            <div className={usersCSS.title}>

                <h3>{t('users_word')}</h3>

                <div className={usersCSS.title_actions}></div>

            </div>

        </div>

    </React.Fragment>

}
