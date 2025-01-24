import React, { useEffect, useRef, useState } from 'react';

import settingsCSS from './settings.module.css';
import formCSS from '../../Styles/forms.module.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

export default function Settings() {

    const {t, i18n} = useTranslation();

    // ====== edit-email ====== //

    const [enableEdit, setEnableEdit] = useState(false);
    const [inputValue, setInputValue] = useState('omar.er3434@gmail.com');
    const [passwordValue, setPasswordValue] = useState('');
    const [newPasswordValue, setNewPasswordValue] = useState('');
    const emailRef = useRef(null);

    useEffect(() => {

        if (enableEdit && emailRef.current) {
        emailRef.current.focus();
        }

    }, [enableEdit]);

    const startEdit = () => {

        setEnableEdit((prev) => !prev);

    };

    const handleChange = (e, changeState) => {
        changeState(e.target.value);
    };

    // ====== handle-showing-password ====== //

    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const displayingPassword = (state , setState) => {

        setState(!state);

    }

    // ====== animation ====== //

    const eyeVariants = {

        hidden : {opacity : 0},
        visible : {opacity : 1 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <div className={settingsCSS.container}>

            <div className={settingsCSS.title}>

                <h3>{t('accountSettingWord')}</h3>

            </div>

            <div className={settingsCSS.mail_sec}>

                <h3 className={settingsCSS.sub_title}>{t('emailAddressWord')}</h3>

                <form className={settingsCSS.form} action="">

                    <div className={`${formCSS.input_cont} ${settingsCSS.input_cont}`}>

                        <div 
                            className={formCSS.loader} 
                            style={i18n.language === 'en' ? {right: '10px'} : {left: '10px'}}
                        ></div>

                        <input 
                            type="text" id="email"
                            ref={emailRef} disabled={!enableEdit}
                            style={i18n.language === 'en' ? {paddingRight: '40px'} : {paddingLeft: '40px'}}
                            value={inputValue} onChange={(e) => handleChange(e, setInputValue)}
                        />

                    </div>

                    <button className={`${formCSS.submit_btn} ${settingsCSS.submit_btn}`} type='button' onClick={startEdit}>
                        {enableEdit ? t('saveChangeWord') : `${t('editEmailWord')} ${t('emailWord')}`}
                    </button>

                </form>

            </div>

            <div className={settingsCSS.pass_edit}>

                <h3 className={settingsCSS.sub_title}>{t('resetPasswordWord')}</h3>

                <form className={formCSS.form} action="">

                    <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

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
                            placeholder={`${t('enterTheWord')} ${t('currentPasswordWord')}`}
                            style={i18n.language === 'en' ? {paddingRight: '40px'} : {paddingLeft: '40px'}}
                            value={passwordValue} onChange={(e) => handleChange(e, setPasswordValue)}
                        />

                    </div>

                    <div className={`${formCSS.input_cont} ${formCSS.half_input_cont}`}>

                        <div onClick={() => 
                            displayingPassword(confirmPassword , setConfirmPassword)} className={formCSS.eyes_cont}
                            style={i18n.language === 'en' ? {right: '0px'} : {left: '0px'}}
                        >
                            {confirmPassword ?
                                <motion.span key={'h1'} variants={eyeVariants} initial="hidden" animate="visible">
                                    <RiEyeOffLine />
                                </motion.span> :
                                <motion.span key={'s1'} variants={eyeVariants} initial="hidden" animate="visible">
                                    <RiEyeLine />
                                </motion.span>
                            }
                        </div>

                        <label htmlFor="password">
                            <span className={formCSS.label}>{t('newPasswordWord')} :</span>
                        </label>

                        <input 
                            type={confirmPassword ? "text" : "password"}  id="newPassword"
                            placeholder={`${t('enterTheWord')} ${t('newPasswordWord')}`}
                            style={i18n.language === 'en' ? {paddingRight: '40px'} : {paddingLeft: '40px'}}
                            value={newPasswordValue} onChange={(e) => handleChange(e, setNewPasswordValue)}
                        />

                    </div>

                    <button className={`${formCSS.submit_btn} ${settingsCSS.submit_btn}`} type='button'>
                        {t('resetPasswordWord')}
                    </button>

                </form>

            </div>

        </div>

    </React.Fragment>

}
