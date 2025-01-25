import React, { useCallback, useEffect, useRef, useState } from 'react';

import { IoIosArrowBack, IoIosArrowForward, IoIosGlobe } from 'react-icons/io';

import trBtnCSS from './tr_btn.module.css';
import { AnimatePresence, motion } from 'framer-motion';
// import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';

export default function TrBtn({wbg , phone}) {

    // ====== display-langs ====== //

    const [displayLangs, setDisplayLangs] = useState(false);

    const toggleLangsList = () => {

        setDisplayLangs(prev => !prev);

    }

    const langListRef = useRef(null);

    const handleClickOutside = useCallback((event) => {

        if (langListRef.current && !langListRef.current.contains(event.target)) {
            setDisplayLangs(false);
        }

    }, []);

    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [handleClickOutside]);

    // ====== change-language ====== //

    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {

        setDisplayLangs(false);

        setTimeout(() => {
            i18n.changeLanguage(lang);
            localStorage.setItem('language', lang);
        }, 300);

    };

    // ====== chang-button-color ====== //

    const greenBg = {

        color: 'var(--seconde-color)',
        backgroundColor: 'var(--first-color)'

    }

    const whiteBg = {

        color: 'var(--first-color)',
        backgroundColor: 'var(--seconde-color)'

    }

    // ====== animation ====== //

    const displayList = {

        hidden: {opacity: 0 , height: 0},
        visible: {opacity: 1 , height: 'auto' , transition: {duration: 0.15}}

    }

    return <React.Fragment>

        <div ref={langListRef} className={trBtnCSS.container}>

            <button onClick={toggleLangsList} className={`${trBtnCSS.tr_btn}`} style={wbg ? whiteBg : greenBg}>
                <IoIosGlobe />
                {i18n.language === 'en' ? 
                    <IoIosArrowForward 
                        className={`
                            ${displayLangs ? trBtnCSS.rotate_positive : ''}
                            ${displayLangs && phone ? trBtnCSS.rotate_negative_ph : ''}
                        `} 
                    /> :
                    <IoIosArrowBack 
                        className={`
                            ${displayLangs ? trBtnCSS.rotate_negative : ''}
                            ${displayLangs && phone ? trBtnCSS.rotate_positive_ph : ''}
                        `} 
                    />
                }
            </button>

            <AnimatePresence>

                {displayLangs && <motion.ul 
                    className={`
                        ${trBtnCSS.tr_list}
                        ${i18n.language === 'ar' ? trBtnCSS.right_position : trBtnCSS.left_position}
                        ${phone ? trBtnCSS.to_top : ''}
                    `}
                    variants={displayList} initial='hidden' animate='visible' exit={'hidden'}
                >

                    <li className={i18n.language === 'ar' ? trBtnCSS.tr_list_li_active : ''} onClick={() => changeLanguage('ar')}>
                        <span>{t('arabicWord')}</span>
                    </li>
                    <li className={i18n.language === 'en' ? trBtnCSS.tr_list_li_active : ''} onClick={() => changeLanguage('en')}>
                        <span>{t('englishWord')}</span>
                    </li>

                </motion.ul>}

            </AnimatePresence>

        </div>

    </React.Fragment>

}
