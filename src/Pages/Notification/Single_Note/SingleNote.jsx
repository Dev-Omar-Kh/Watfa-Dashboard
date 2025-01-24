import React from 'react';

import singleNoteCSS from './single_note.module.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import NotificationData from '../NotificationData';

export default function SingleNote() {

    const {t, i18n} = useTranslation();

    // ====== get-note-by-id ====== //

    const {id} = useParams();

    const noteData = NotificationData.find(note => note.id === Number(id));

    return <React.Fragment>

        <div className={singleNoteCSS.container}>

            <div id='title' className={singleNoteCSS.title}>

                <Link to={'/notifications'}>
                    {i18n.language === 'en' ? <IoIosArrowBack /> : <IoIosArrowForward />}
                </Link>

                <h3>{t('singleNotificationWord')}</h3>

            </div>

            <div className={singleNoteCSS.note_cont}>

                <div className={singleNoteCSS.user_data}>

                    <img src={noteData.userImg} alt="" />

                    <div className={singleNoteCSS.user_name}>

                        <h3>{t('userNameWord')}</h3>
                        <p>{noteData.userName}</p>

                    </div>

                </div>

                <div className={singleNoteCSS.note_msg}>

                    <div className={singleNoteCSS.msg_cont}>
                        <p>{noteData.msg}</p>
                    </div>

                </div>

            </div>

        </div>

    </React.Fragment>

}
