import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Search from '../../Components/Search_Bar/Search';
import NotificationData from './NotificationData';

import noteCSS from './note.module.css';

export default function Notification() {

    const {t, i18n} = useTranslation();

    // ====== count-notesCont-height ====== //

    const [notesContHeight, setNotesContHeight] = useState('0')

    useEffect(() => {


        const titleHeight = document.getElementById('title').offsetHeight;
        const searchBarHeight = document.getElementById('searchBar').offsetHeight;

        setNotesContHeight(titleHeight + searchBarHeight + 200);

    } , []);

    console.log(`calc(100svh - ${notesContHeight}px)`);

    return <React.Fragment>

        <div className={noteCSS.container}>

            <div id='title' className={noteCSS.title}>

                <Link to={'/'}>
                    {i18n.language === 'en' ? <IoIosArrowBack /> : <IoIosArrowForward />}
                </Link>

                <h3>{t('notificationWord')}</h3>

            </div>

            <div id='searchBar' className={noteCSS.search_bar}>
                <Search />
            </div>

            <div style={{height: `calc(100svh - ${notesContHeight}px)`}} className={noteCSS.notes_cont}>

                <div className={noteCSS.notes_scroll}>

                    {NotificationData.map((note) => <Link 
                        to={`note/${note.id}`}
                        key={note.id} className={noteCSS.note_box}
                        style={{backgroundColor: note.msgRead ? 'transparent' : 'var(--third-color)'}}
                    >

                        <div className={noteCSS.right_side_note}>

                            <span style={{backgroundColor: note.msgRead ? 'transparent' : 'var(--first-color)'}}></span>

                            <img src={note.userImg} alt="" />

                            <div className={noteCSS.note_data}>

                                <h3>{t(note.noteType)}</h3>

                                <p>{`${note.msg.split(' ').slice(0, 5).join(' ')} ...`}</p>

                            </div>

                        </div>

                        <div className={noteCSS.left_side_note}>

                            <p>{`${note.sentTime.split(' ')[0]} ${t(note.sentTime.split(' ')[1])}`}</p>

                        </div>

                    </Link>)}

                </div>

            </div>

        </div>

    </React.Fragment>

}
