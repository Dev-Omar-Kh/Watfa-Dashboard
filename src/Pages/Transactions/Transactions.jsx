import React, { useEffect, useMemo, useRef, useState } from 'react';

import transactionsCSS from './transactions.module.css';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import RatioCard from '../../Components/Ratio_Card/RatioCard';

export default function Transactions() {

    const {t, i18n} = useTranslation();

    // ====== display-times-list ====== //

    const [displayFilteredUsers1, setDisplayFilteredUsers1] = useState(false);
    const [displayFilteredUsers2, setDisplayFilteredUsers2] = useState(false);
    
    const ulRef1 = useRef(null);
    const ulRef2 = useRef(null);

    const handleClickOutside = (event, refNum, displayListNum) => {

        if (refNum.current && !refNum.current.contains(event.target)) {
            displayListNum(false);
        }

    };

    useEffect(() => {

        const handleClickOutsideEvent1 = (event) => handleClickOutside(event, ulRef1, setDisplayFilteredUsers1);
        const handleClickOutsideEvent2 = (event) => handleClickOutside(event, ulRef2, setDisplayFilteredUsers2);

        document.addEventListener('mousedown', handleClickOutsideEvent1);
        document.addEventListener('mousedown', handleClickOutsideEvent2);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideEvent1);
            document.removeEventListener('mousedown', handleClickOutsideEvent2);
        };

    }, []);

    // ====== chose-time ====== //

    const startYear = 2023;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const result = useMemo(() => {

        const months = [
            "janMonth", "febMonth", "marMonth", "aprMonth", "mayMonth", "junMonth",
            "julMonth", "augMonth", "sepMonth", "octMonth", "novMonth", "decMonth"
        ];

        const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

        return years.flatMap(year => months
            .map((month, index) => ({ month, year, index }))
            .filter(({ year: y, index }) => y < currentYear || (y === currentYear && index <= currentMonth))
            .map(({ month, year }) => `${month} ${year}`)
        );

    }, [currentYear, currentMonth]);

    const enhancedResult = useMemo(() => {

        return result.map(item => ({

            date: item,

            data: [
                { title: "totalRevenueWord", num: `$ ${Math.floor(Math.random() * 18000) + 8710}` },
                { title: "invoicesWord", num: Math.floor(Math.random() * 64) + 100 },
                { title: "returnsWord", num: `$ ${Math.floor(Math.random() * 7400) + 468}` }
            ]

        }));

    }, [result]);

    const [chosenTime, setChosenTime] = useState(result[0]);
    const [spanWord1, setSpanWord1] = useState(result[0]);


    const chooseChart = (chosenTime, changedAnalyticsData) => {

        setChosenTime(chosenTime);

        setSpanWord1(chosenTime);

        setDisplayFilteredUsers1(false);

        // setAnalyticsData(changedAnalyticsData);

    }

    // ====== chose-filters ====== //

    const StatusType = ['allTransactionsWord', 'pendingTransactionsWord', 'paidTransactionsWord', 'returnedTransactionsWord'];

    const [statusChosen, setStatusChosen] = useState('allTransactionsWord');

    const [spanWord2, setSpanWord2] = useState('allTransactionsWord');

    const chooseUsersStatus = (chosenStatus) => {

        setStatusChosen(chosenStatus)

        setSpanWord2(chosenStatus);

        setDisplayFilteredUsers2(false);

        if(chosenStatus !== 'allTransactionsWord'){
            // setUsersDataFiltered(UsersData.filter(users => users.status === DataFilter));
        }
        else{
            // setUsersDataFiltered(UsersData);
        }

    }

    // ====== animation ====== //

    const listAnimation = {

        hidden: {opacity: 0, height: '0px'},
        visible: {opacity: 1, height: 'fit-content' , transition: {duration: 0.3}},
        exit: {opacity: 0, height: '0px' , transition: {duration: 0.3}},

    }

    return <React.Fragment>

        <div className={transactionsCSS.container}>

            <div className={transactionsCSS.title}>

                <h3>{t('transactions_word')}</h3>

                <div ref={ulRef1} className={transactionsCSS.title_actions}>

                    <button className={transactionsCSS.time_btn} onClick={() => setDisplayFilteredUsers1(!displayFilteredUsers1)}>

                        <p>{t('showWord')} :</p>
                        <span>{t(`${t(spanWord1.split(' ')[0])} ${spanWord1.split(' ')[1]}`)}</span>

                        {i18n.language === 'en' ? 
                            <div style={{rotate: displayFilteredUsers1 ? '90deg' : '0deg'}} className={transactionsCSS.arrowList}>
                                <IoIosArrowForward />
                            </div> :
                            <div style={{rotate: displayFilteredUsers1 ? '-90deg' : '0deg'}} className={transactionsCSS.arrowList}>
                                <IoIosArrowBack />
                            </div>
                        }

                    </button>

                    <AnimatePresence>

                        {displayFilteredUsers1 && 

                            <motion.ul
                                key={'times-list'}
                                className={transactionsCSS.times_list}
                                variants={listAnimation} initial='hidden' animate='visible' exit={'exit'}
                            >

                                {result.map((time, idx) => <li 
                                    key={idx}
                                    className={time === chosenTime ? transactionsCSS.chosen_time : ''} 
                                    onClick={() => chooseChart(time)}
                                >
                                    {`${t(time.split(' ')[0])} ${time.split(' ')[1]}`}
                                </li>)}

                            </motion.ul>

                        }

                    </AnimatePresence>

                </div>

            </div>

            <div className={transactionsCSS.summary}>

                {
                    enhancedResult.find(result => result.date === chosenTime)
                    .data.map((data, idx) => <RatioCard count={3} key={idx} cardData={data} />)
                }

            </div>

            <div className={transactionsCSS.filter_cont}>

                <div ref={ulRef2} className={transactionsCSS.title_actions} style={{zIndex: 9}}>

                    <button className={transactionsCSS.time_btn} onClick={() => setDisplayFilteredUsers2(!displayFilteredUsers2)}>

                        <p>{t('filterWord')} :</p>
                        <span>{t(spanWord2)}</span>

                        {i18n.language === 'en' ? 
                            <div style={{rotate: displayFilteredUsers2 ? '90deg' : '0deg'}} className={transactionsCSS.arrowList}>
                                <IoIosArrowForward />
                            </div> :
                            <div style={{rotate: displayFilteredUsers2 ? '-90deg' : '0deg'}} className={transactionsCSS.arrowList}>
                                <IoIosArrowBack />
                            </div>
                        }

                    </button>

                    <AnimatePresence>

                        {displayFilteredUsers2 && 

                            <motion.ul
                                key={'times-list'}
                                className={transactionsCSS.times_list}
                                variants={listAnimation} initial='hidden' animate='visible' exit={'exit'}
                            >

                                {StatusType.map((status, idx) => <li
                                    key={idx}
                                    className={status === statusChosen ? transactionsCSS.chosen_time : ''} 
                                    onClick={() => chooseUsersStatus(status)}
                                >
                                    {t(status)}
                                </li>)}

                            </motion.ul>

                        }

                    </AnimatePresence>

                </div>

            </div>

        </div>

    </React.Fragment>

}
