import React from 'react';
import Search from '../Search_Bar/Search';
import { Link, NavLink } from 'react-router-dom';
import { IoMenu, IoNotificationsOutline } from 'react-icons/io5';
import { IoMdLogOut } from 'react-icons/io';

import headerCSS from './header.module.css';
import '../../Styles/active.css';

export default function Header({displayPhoneNav}) {

    return <React.Fragment>

        <div className={headerCSS.container}>

            <Search location={'header'} />

            <div className={headerCSS.actions}>

                <div onClick={() => displayPhoneNav(true)} className={headerCSS.burger}>

                    <IoMenu />

                </div>

                <NavLink to={'/notifications'} className={`${headerCSS.action} header_link`}>
                    <IoNotificationsOutline />
                </NavLink>

                <Link className={headerCSS.action}>
                    <IoMdLogOut />
                </Link>

            </div>

        </div>

    </React.Fragment>

}
