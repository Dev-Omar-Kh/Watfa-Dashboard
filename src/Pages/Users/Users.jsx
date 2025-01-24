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
import WarningMsg from '../../Components/Warning_Msg/WarningMsg';

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

    // ====== users-type-data ====== //

    const usersType = ['allUsersWord', 'pendingWord', 'acceptedWord', 'declinedWord'];

    // ====== chose-filters ====== //

    const [chosenType, setChosenType] = useState('allUsersWord');

    const [usersDataFiltered, setUsersDataFiltered] = useState(UsersData);

    const chooseUsersStatus = (chosenStatus) => {

        setChosenType(chosenStatus);

        setDisplayFilteredUsers(false);

        if(chosenStatus !== 'allUsersWord'){

            setUsersDataFiltered(UsersData.filter(users => users.status === chosenStatus));

        }
        else{
            setUsersDataFiltered(UsersData);
        }

    }

    // ====== delete-user ====== //

    const [displayWarn, setDisplayWarn] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const deleteUserFS = (user) => {

        setDisplayWarn(true);
        setUserToDelete(user);

    }

    const acceptDeleteUser = (id) => {

        setUsersDataFiltered(usersDataFiltered.filter(users => users.id !== id));
        setDisplayWarn(false);

    }

    // ====== animation ====== //

    const listAnimation = {

        hidden: {opacity: 0, height: '0px'},
        visible: {opacity: 1, height: 'fit-content' , transition: {duration: 0.3}},
        exit: {opacity: 0, height: '0px' , transition: {duration: 0.3}},

    }

    return <React.Fragment>

        <AnimatePresence>

            {displayWarn && <WarningMsg data={userToDelete} deleteData={acceptDeleteUser} cancel={setDisplayWarn} />}

        </AnimatePresence>

        <div className={usersCSS.container}>

            <div className={usersCSS.title}>

                <h3>{t('users_word')}</h3>

                <div ref={ulRef} className={usersCSS.title_actions}>

                    <button className={usersCSS.time_btn} onClick={() => setDisplayFilteredUsers(!displayFilteredUsers)}>

                        <p>{t('filterWord')} :</p>
                        <span>{t(chosenType)}</span>

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

                                {usersType.map((type, idx) => <li 
                                    className={chosenType === type ? usersCSS.chosen_time : ''} key={idx}
                                    onClick={() => chooseUsersStatus(type)}
                                >
                                    {t(type)}
                                </li>)}

                            </motion.ul>

                        }

                    </AnimatePresence>

                </div>

            </div>

            <div className={tableCSS.table_cont}>

                <table className={`${tableCSS.table} ${i18n.language === 'en' ? tableCSS.table_en : tableCSS.table_ar}`}>

                    <thead>

                        <tr>

                            <th>{t('userNameWord')}</th>
                            <th>{t('emailWord')}</th>
                            <th>{t('phoneNumWord')}</th>
                            <th>{t('statusWord')}</th>
                            <th>{t('actionsWord')}</th>

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
                                        user.status === 'acceptedWord' ? tableCSS.accepted_span : 
                                        user.status === 'declinedWord' ? tableCSS.declined_span : tableCSS.pending_span
                                    }
                                `}>
                                    {t(user.status)}
                                </div>
                            </td>
                            <td>
                                <button 
                                    className={`${tableCSS.actions} ${tableCSS.delete}`}
                                    onClick={() => deleteUserFS(user)}
                                >
                                    <IoBanSharp />
                                </button>
                                <Link 
                                    to={`user_details/${user.id}`}
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
