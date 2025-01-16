import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LuChartSpline, LuUsersRound } from 'react-icons/lu';
import { FaArrowsTurnToDots } from 'react-icons/fa6';
import { IoCloseCircleOutline, IoNotificationsOutline, IoPerson, IoSettingsOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import {motion} from 'framer-motion';

import sideBarCSS from './side_bar.module.css';
import './active.css';

import { RxDashboard } from 'react-icons/rx';

import logo from '../../Images/logo.png';
import minLogo from '../../Images/icon.png'
import { IoIosArrowBack, IoIosArrowForward, IoIosGlobe } from 'react-icons/io';
import { AnimatePresence } from 'framer-motion';
import { BsPatchCheck } from 'react-icons/bs';

export default function SideBar({displayNav}) {

    const {i18n, t} = useTranslation();

    // ====== nav-phone ====== //

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

    // ====== droplist ====== //

    const [displayList, setDisplayList] = useState(false);

    // ====== change-language ====== //

    const changeLanguage = (lang) => {

        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        setDisplayList(false);

    };

    // ====== framer-motion ====== //

    const showListVariants = {

        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },

    }

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

                <ul className={sideBarCSS.nav_bar_ul}>

                    <li>
                        <NavLink onClick={() => displayNav(false)} className='side_bar_link' to={'/'}>
                            <RxDashboard />
                            <p>{t('dashboard_word')}</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => displayNav(false)} className='side_bar_link' to={'/analytics'}>
                            <LuChartSpline />
                            <p>{t('analytics_word')}</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => displayNav(false)} className='side_bar_link' to={'/users'}>
                            <LuUsersRound />
                            <p>{t('users_word')}</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => displayNav(false)} className='side_bar_link' to={'/transactions'}>
                            <FaArrowsTurnToDots />
                            <p>{t('transactions_word')}</p>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink onClick={() => displayNav(false)} className='side_bar_link' to={'/setting'}>
                            <IoSettingsOutline />
                            <p>{t('setting_word')}</p>
                        </NavLink>
                    </li>

                    <li className={sideBarCSS.actions_phone}>
                        <NavLink onClick={() => displayNav(false)} className='side_bar_link' to={'/profile'}>
                            <IoPerson />
                            <p>{t('profileWord')}</p>
                        </NavLink>
                    </li>

                    <li className={sideBarCSS.actions_phone}>
                        <NavLink onClick={() => displayNav(false)} className='side_bar_link' to={'/notifications'}>
                            <IoNotificationsOutline />
                            <p>{t('notificationWord')}</p>
                        </NavLink>
                    </li>

                    <>

                        <button 
                            onClick={() => setDisplayList(prev => !prev)} 
                            className={sideBarCSS.nav_btn} 
                            // style={{color: displayList ? 'var(--f-white-color)' : ''}}
                        >
                            <div className={sideBarCSS.btn_l_side}>
                                <IoIosGlobe />
                                <p>{t('LanguageWord')}</p>
                            </div>
                            {i18n.language === 'en' ? 
                                <div style={{rotate: displayList ? '90deg' : '0deg'}} className={sideBarCSS.arrowList}>
                                    <IoIosArrowForward />
                                </div> :
                                <div style={{rotate: displayList ? '-90deg' : '0deg'}} className={sideBarCSS.arrowList}>
                                    <IoIosArrowBack />
                                </div>
                            }
                        </button>

                        <AnimatePresence>

                            {displayList && <motion.ul 
                                variants={showListVariants} initial='hidden' animate='visible' exit={'hidden'} 
                                className={sideBarCSS.link_det}
                            >

                                <li onClick={() => changeLanguage('ar')}>
                                    <p>{t('arabicWord')}</p>
                                    {i18n.language === 'ar' && <BsPatchCheck />}
                                </li>

                                <li onClick={() => changeLanguage('en')}>
                                    <p>{t('englishWord')}</p>
                                    {i18n.language === 'en' && <BsPatchCheck />}
                                </li>

                            </motion.ul>}

                        </AnimatePresence>

                    </>

                </ul>

            </nav>

        </div>

    </React.Fragment>

}
