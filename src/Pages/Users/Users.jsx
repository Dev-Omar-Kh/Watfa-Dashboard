import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { IoBanSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { HiOutlineClipboardList } from 'react-icons/hi';

import UsersData from './UsersData';

import usersCSS from './users.module.css';
import tableCSS from '../../Styles/tables.module.css';

export default function Users() {

    const {t, i18n} = useTranslation();

    // ====== display-times-list ====== //
    
        const [displayFilteredUsers, setDisplayFilteredUsers] = useState(false);
        const ulRef = useRef(null);
    
        const handleClickOutside = (event) => {
    
            if (ulRef.current && !ulRef.current.contains(event.target)) {
                setDisplayFilteredUsers(false);
            }
    
        };
    
        useEffect(() => {
    
            document.addEventListener('mousedown', handleClickOutside);
    
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
    
        }, []);

    // ====== chose-filters ====== //

    const [allUsers, setAllUsers] = useState(true);
    const [pendingUsers, setPendingUsers] = useState(false);
    const [acceptedUsers, setAcceptedUsers] = useState(false);
    const [declinedUsers, setDeclinedUsers] = useState(false);

    const [spanWord, setSpanWord] = useState('allUsersWord');

    const [usersDataFiltered, setUsersDataFiltered] = useState(UsersData);

    const chooseUsersStatus = (chosenStatus, spanStatus, DataFilter) => {

        setAllUsers(chosenStatus === setAllUsers);
        setPendingUsers(chosenStatus === setPendingUsers);
        setAcceptedUsers(chosenStatus === setAcceptedUsers);
        setDeclinedUsers(chosenStatus === setDeclinedUsers);

        setSpanWord(spanStatus);

        setDisplayFilteredUsers(false);

        if(DataFilter !== 'all'){

            setUsersDataFiltered(UsersData.filter(users => users.status === DataFilter));

        }
        else{
            setUsersDataFiltered(UsersData);
        }

    }

    // ====== animation ====== //

    const listAnimation = {

        hidden: {opacity: 0, height: '0px'},
        visible: {opacity: 1, height: 'fit-content' , transition: {duration: 0.3}},
        exit: {opacity: 0, height: '0px' , transition: {duration: 0.3}},

    }

    return <React.Fragment>

        <div className={usersCSS.container}>

            <div className={usersCSS.title}>

                <h3>{t('users_word')}</h3>

                <div ref={ulRef} className={usersCSS.title_actions}>

                    <button className={usersCSS.time_btn} onClick={() => setDisplayFilteredUsers(!displayFilteredUsers)}>

                        <p>{t('filterWord')} :</p>
                        <span>{t(spanWord)}</span>

                        {i18n.language === 'en' ? 
                            <div style={{rotate: displayFilteredUsers ? '90deg' : '0deg'}} className={usersCSS.arrowList}>
                                <IoIosArrowForward />
                            </div> :
                            <div style={{rotate: displayFilteredUsers ? '-90deg' : '0deg'}} className={usersCSS.arrowList}>
                                <IoIosArrowBack />
                            </div>
                        }

                    </button>

                    <AnimatePresence>

                        {displayFilteredUsers && 

                            <motion.ul
                                key={'times-list'}
                                className={usersCSS.times_list}
                                variants={listAnimation} initial='hidden' animate='visible' exit={'exit'}
                            >

                                <li 
                                    className={allUsers ? usersCSS.chosen_time : ''} 
                                    onClick={() => chooseUsersStatus(setAllUsers, 'allUsersWord', 'all')}
                                >
                                    {t('allUsersWord')}
                                </li>

                                <li 
                                    className={pendingUsers ? usersCSS.chosen_time : ''} 
                                    onClick={() => chooseUsersStatus(setPendingUsers, 'pendingUsersWord', 'pending')}
                                >
                                    {t('pendingUsersWord')}
                                </li>

                                <li 
                                    className={acceptedUsers ? usersCSS.chosen_time : ''} 
                                    onClick={() => chooseUsersStatus(setAcceptedUsers, 'acceptedUsersWord', 'accepted')}
                                >
                                    {t('acceptedUsersWord')}
                                </li>

                                <li 
                                    className={declinedUsers ? usersCSS.chosen_time : ''} 
                                    onClick={() => chooseUsersStatus(setDeclinedUsers, 'declinedUsersWord', 'declined')}
                                >
                                    {t('declinedUsersWord')}
                                </li>

                            </motion.ul>

                        }

                    </AnimatePresence>

                </div>

            </div>

            <div className={tableCSS.table_cont}>

                <table className={tableCSS.table}>

                    <thead>

                        <tr>

                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Phone</th>
                            <th>User Role</th>
                            <th>User Ban</th>

                        </tr>

                    </thead>

                    <tbody>

                        {usersDataFiltered.map( user => <tr key={user.id}>

                            <td>{user.userName}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.userPhone}</td>
                            <td>
                                <div className={`
                                    ${tableCSS.status_span} 
                                    ${
                                        user.status === 'accepted' ? tableCSS.accepted_span : 
                                        user.status === 'declined' ? tableCSS.declined_span : tableCSS.pending_span
                                    }
                                `}>
                                    {user.status}
                                </div>
                            </td>
                            <td>
                                <button 
                                    className={`${tableCSS.actions} ${tableCSS.delete}`}
                                >
                                    <IoBanSharp />
                                </button>
                                <Link 
                                    // to={`update/${user._id}`}
                                    className={`${tableCSS.actions} ${tableCSS.update}`}
                                >
                                    <HiOutlineClipboardList className={tableCSS.action_icon} />
                                </Link>
                            </td>

                        </tr>)}

                    </tbody>

                </table>

            </div>

        </div>

    </React.Fragment>

}
