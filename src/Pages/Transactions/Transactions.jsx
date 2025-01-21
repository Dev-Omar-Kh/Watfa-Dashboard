import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import RatioCard from '../../Components/Ratio_Card/RatioCard';

import transactionsCSS from './transactions.module.css';
import tableCSS from '../../Styles/tables.module.css';
// import TransactionsData from './TransactionsData.jsx';

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


    const chooseTime = (chosenTime) => {

        setChosenTime(chosenTime);

        setDisplayFilteredUsers1(false);

        setDataOfTransaction(
            TransactionsData.filter(trans => 
                `${trans.date.split(' ')[1]} ${trans.date.split(' ')[2]}` === `${chosenTime.split(' ')[0]} ${chosenTime.split(' ')[1]}`
            )
        );

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
            setDataOfTransaction(TransactionsData.filter(trans => 
                `${trans.date.split(' ')[1]} ${trans.date.split(' ')[2]}` === `${chosenTime.split(' ')[0]} ${chosenTime.split(' ')[1]}`
            ).filter(trans => trans.status === chosenStatus));
        }
        else{
            setDataOfTransaction(TransactionsData.filter(trans => 
                `${trans.date.split(' ')[1]} ${trans.date.split(' ')[2]}` === `${chosenTime.split(' ')[0]} ${chosenTime.split(' ')[1]}`
            ));
        }

    }

    // ====== transactions-data ====== //

    const TransactionsData = useMemo(() => {

        const statuses = [
            "pendingTransactionsWord",
            "paidTransactionsWord",
            "returnedTransactionsWord",
        ];

        const clientNames = [
            "Yara Ali", "Omar Khaled", "Ahmed Hassan", "Laila Ahmed", "Hana Mohamed", "Mariam Khaled", "Sara Mohamed", "Hamza Saied",
            "Mohamed Samer", "Sarah Ibrahim", "Khaled Youssef", "Mona Adel", "Hesham Fathy",
        ];

        const startDate = new Date("2023-01-01");
        const endDate = new Date();

        const getRandomDate = (start, end) => {

            const date = new Date(
                start.getTime() + Math.random() * (end.getTime() - start.getTime())
            );

            const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
            const month = date.toLocaleDateString("en-GB", { month: "short" }).toLowerCase();
            const year = date.getFullYear();

            return `${day} ${month}Month ${year}`;

        };

        const getRandomTransactionID = () => {

            const generateRandomLetters = (length) => {
                const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
            };

            const randomLetters = generateRandomLetters(4);
            const randomNumber = Math.floor(Math.random() * 100000000);
            return `${randomLetters}${randomNumber}`;

        };

        const transactions = Array.from({ length: 500 }, (_, index) => ({
            id: index + 1,
            clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
            date: getRandomDate(startDate, endDate),
            transactionID: getRandomTransactionID(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
        }));

        transactions.sort((a, b) => {

            const dateA = new Date(
                a.date.split(' ')[2], new Date(Date.parse(a.date.split(' ')[1] + " 1, 2000")).getMonth(), a.date.split(' ')[0]
            );

            const dateB = new Date(
                b.date.split(' ')[2], new Date(Date.parse(b.date.split(' ')[1] + " 1, 2000")).getMonth(), b.date.split(' ')[0]
            );

            return dateB - dateA;

        });

        return transactions;

    }, []);

    const [dataOfTransaction, setDataOfTransaction] = useState(
        TransactionsData.filter(trans => 
            `${trans.date.split(' ')[1]} ${trans.date.split(' ')[2]}` === `${chosenTime.split(' ')[0]} ${chosenTime.split(' ')[1]}`
        )
    );

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
                        <span>{t(`${t(chosenTime.split(' ')[0])} ${chosenTime.split(' ')[1]}`)}</span>

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
                                    onClick={() => chooseTime(time)}
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

            <div className={tableCSS.table_cont}>

                <table className={`${tableCSS.table} ${i18n.language === 'en' ? tableCSS.table_en : tableCSS.table_ar}`}>

                    <thead>

                        <tr>

                            <th>{t('userNameWord')}</th>
                            <th>{t('dateWord')}</th>
                            <th>{t('transactionIdWord')}</th>
                            <th>{t('statusWord')}</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dataOfTransaction.map( trans => <tr key={trans.id}>

                            <td>{trans.clientName}</td>
                            <td>{`${trans.date.split(' ')[0]} ${t(trans.date.split(' ')[1])} ${trans.date.split(' ')[2]}`}</td>
                            <td>{trans.transactionID}</td>
                            <td>
                                <div className={`
                                    ${tableCSS.status_span} 
                                    ${
                                        trans.status === 'paidTransactionsWord' ? tableCSS.accepted_span : 
                                        trans.status === 'returnedTransactionsWord' ? tableCSS.declined_span : tableCSS.pending_span
                                    }
                                `}>
                                    {t(trans.status)}
                                </div>
                            </td>

                        </tr>)}

                    </tbody>

                </table>

            </div>

        </div>

    </React.Fragment>

}
