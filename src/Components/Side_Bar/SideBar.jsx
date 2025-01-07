import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LuChartSpline, LuUsersRound } from 'react-icons/lu';
import { FaArrowsTurnToDots } from 'react-icons/fa6';
import { IoCloseCircleOutline, IoSettingsOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';

import sideBarCSS from './side_bar.module.css';
import './active.css';

import { RxDashboard } from 'react-icons/rx';

import logo from '../../Images/logo.png';
import minLogo from '../../Images/icon.png'

export default function SideBar({displayNav}) {

    const {t} = useTranslation();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    useEffect(() => {

        const logoImg = document.getElementById('logoImg');

        if(logoImg){

            if(windowWidth <= 1024 && windowWidth >= 780) {
                logoImg.src = minLogo;
            } 
            else{
                logoImg.src = logo;
            }

        }

    }, [windowWidth]);

    return <React.Fragment>

        <div className={sideBarCSS.container}>

            <div className={sideBarCSS.logo}>

                <Link>
                    <img id='logoImg' src={logo} alt="Watfa_logo" />
                </Link>

                <button className={sideBarCSS.close_nav} onClick={() => displayNav(false)}>
                    <IoCloseCircleOutline />
                </button>

            </div>

            <nav className={sideBarCSS.nav_side}>

                <ul>

                    <li>
                        <NavLink className='side_bar_link' to={'/'}>
                            <RxDashboard />
                            <p>{t('dashboard_word')}</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className='side_bar_link' to={'/analytics'}>
                            <LuChartSpline />
                            <p>{t('analytics_word')}</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className='side_bar_link' to={'/users'}>
                            <LuUsersRound />
                            <p>{t('users_word')}</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className='side_bar_link' to={'/transactions'}>
                            <FaArrowsTurnToDots />
                            <p>{t('transactions_word')}</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink className='side_bar_link' to={'/setting'}>
                            <IoSettingsOutline />
                            <p>{t('setting_word')}</p>
                        </NavLink>
                    </li>

                </ul>

            </nav>

        </div>

    </React.Fragment>

}
