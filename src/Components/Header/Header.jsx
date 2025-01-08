import React from 'react';

import headerCSS from './header.module.css';
import Search from '../Search_Bar/Search';
import { Link } from 'react-router-dom';
import { IoMenu, IoNotificationsOutline, IoPerson } from 'react-icons/io5';

export default function Header({displayPhoneNav}) {

    return <React.Fragment>

        <div className={headerCSS.container}>

            <Search />

            <div className={headerCSS.actions}>

                <div onClick={() => displayPhoneNav(true)} className={headerCSS.burger}>

                    <IoMenu />

                </div>

                <Link className={headerCSS.action}>
                    <IoNotificationsOutline />
                </Link>

                <Link className={headerCSS.action}>
                    <IoPerson />
                </Link>

            </div>

        </div>

    </React.Fragment>

}
