import React from 'react';
import { motion } from 'framer-motion';
import { PiSealWarningBold } from 'react-icons/pi';

import warnCSS from './warning.module.css';
import { useTranslation } from 'react-i18next';

export default function WarningMsg({data, deleteData, cancel}) {

    const {t, i18n} = useTranslation();

    // ====== framer-motion ====== //

    const parentVariants = {

        hidden : {opacity : 0},
        visible: {opacity : 1 , transition : {duration : 0.3 , when : 'beforeChildren'}},
        exit : {opacity : 0 , transition : {duration : 0.3}}

    }

    const childVariants = {

        hidden : {opacity : 0 , y : 20},
        visible : {opacity : 1 , y : 0 , transition : {duration : 0.3}},
        exit : {opacity : 0 , y : 20 , transition : {duration : 0.3}}

    }

    return <React.Fragment>

        <motion.div variants={parentVariants} initial='hidden' animate='visible' exit={'exit'} className={warnCSS.container}>

            <motion.div variants={childVariants} className={warnCSS.warn_msg}>

                <div className={warnCSS.title}>
                    <PiSealWarningBold className={warnCSS.title_icon} />
                    <p>{t('warningWord')}</p>
                </div>

                <div className={warnCSS.msg_text}>

                    <p>
                        {t('deleteUserWarning')} " <span>{data.userName}</span> " {i18n.language === 'en' ? '?' : '؟'}
                    </p>

                </div>

                <div className={warnCSS.actions}>

                    <motion.button 
                        onClick={() => cancel(false)}
                        whileTap={{scale : 0.90}} className={warnCSS.cancel}
                    >{t('cancelWord')}
                    </motion.button>

                    <motion.button 
                        onClick={() => deleteData(data.id)}
                        whileTap={{scale : 0.90}} className={warnCSS.delete}
                    >{t('deleteWord')}
                    </motion.button>

                </div>

            </motion.div>

        </motion.div>

    </React.Fragment>

}
