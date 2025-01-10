import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import LayoutCSS from './layout.module.css';
import SideBar from '../Components/Side_Bar/SideBar';
import { useTranslation } from 'react-i18next';
import Header from '../Components/Header/Header';

export default function Layout() {

    const {i18n} = useTranslation();

    const [displayPhoneNav, setDisplayPhoneNav] = useState(false);

    return <React.Fragment>

        <div className={LayoutCSS.container}>

            <div 
                className={`
                    ${LayoutCSS.side_bar} 
                    ${i18n.language === 'en' ? LayoutCSS.side_bar_hidden_en : LayoutCSS.side_bar_hidden_ar}
                    ${displayPhoneNav ? 
                        i18n.language === 'en' ? LayoutCSS.display_side_bar_en : LayoutCSS.display_side_bar_ar : ''
                    }`
                }
            >

                <SideBar displayNav={setDisplayPhoneNav} />

            </div>

            <div className={LayoutCSS.main_side}>

                <div className={LayoutCSS.header}>

                    <Header displayPhoneNav={setDisplayPhoneNav} />

                </div>

                <div className={LayoutCSS.pages}>

                    <Outlet />

                </div>

            </div>

        </div>

    </React.Fragment>

}
