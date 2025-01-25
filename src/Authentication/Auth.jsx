import React, { useState } from 'react';

import authCSS from './auth.module.css';
import formCSS from '../Styles/forms.module.css';

import logo from '../Images/logo_dark.png';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import TrBtn from '../Components/Translation-Button/TrBtn';

export default function Auth() {

    const {t, i18n} = useTranslation();

    const navigate = useNavigate();

    // ====== form-values ====== //

    const [inputValue, setInputValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const handleChange = (e, changeState) => {
        changeState(e.target.value);
    };

    // ====== display-password ====== //

    const [password, setPassword] = useState(false);

    const displayingPassword = (state , setState) => {

        setState(!state);

    }

    // ====== animation ====== //

    const eyeVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <div className={authCSS.container}>

            <div className={authCSS.tr_btn} style={i18n.language === 'en' ? {left: '20px'} : {right: '20px'}}>

                <TrBtn wbg={true} />

            </div>

            <div className={authCSS.form_cont}>

                <img className={authCSS.logo} src={logo} alt="dark logo" />

                <form className={authCSS.form} action="">

                    <div className={`${formCSS.input_cont}`}>

                        <div 
                            className={formCSS.loader} 
                            style={i18n.language === 'en' ? {right: '10px'} : {left: '10px'}}
                        ></div>

                        <label htmlFor="password">
                            <span className={formCSS.label}>{t('emailWord')} :</span>
                        </label>

                        <input 
                            type="text" id="email"
                            placeholder={t('enterYourEmailWord')}
                            style={i18n.language === 'en' ? {paddingRight: '40px'} : {paddingLeft: '40px'}}
                            value={inputValue} onChange={(e) => handleChange(e, setInputValue)}
                        />

                    </div>

                    <div className={`${formCSS.input_cont}`}>

                        <div 
                            onClick={() => displayingPassword(password , setPassword)} className={formCSS.eyes_cont}
                            style={i18n.language === 'en' ? {right: '0px'} : {left: '0px'}}
                        >
                            {password ?
                                <motion.span key={'h1'} variants={eyeVariants} initial="hidden" animate="visible">
                                    <RiEyeOffLine />
                                </motion.span> :
                                <motion.span key={'s1'} variants={eyeVariants} initial="hidden" animate="visible">
                                    <RiEyeLine />
                                </motion.span>
                            }
                        </div>

                        <label htmlFor="password">
                            <span className={formCSS.label}>{t('currentPasswordWord')} :</span>
                        </label>

                        <input 
                            type={password ? "text" : "password"} id="password"
                            placeholder={t('enterYourPasswordWord')}
                            style={i18n.language === 'en' ? {paddingRight: '40px'} : {paddingLeft: '40px'}}
                            value={passwordValue} onChange={(e) => handleChange(e, setPasswordValue)}
                        />

                    </div>

                    <div className={formCSS.forget_pass}>
                        <Link>{`${t('forgetPasswordWord')} ${i18n.language === 'en' ? '?' : '؟'}`}</Link>
                    </div>

                    <button onClick={() => navigate('/')} type='button' className={`${formCSS.submit} ${formCSS.submit_btn}`}>
                        {t('loginWord')}
                    </button>

                </form>

            </div>

        </div>

    </React.Fragment>

}
