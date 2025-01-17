import React, { useEffect, useRef, useState } from 'react';

import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from "chart.js";

import analyticsCSS from './analytics.module.css';
import RatioCard from '../../Components/Ratio_Card/RatioCard';
import { useTranslation } from 'react-i18next';
import { MdOutlineFileDownload } from 'react-icons/md';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';

export default function Analytics() {

    const {t, i18n} = useTranslation();

    // ====== display-times-list ====== //

    const [displayAllTimes, setDisplayAllTimes] = useState(false);
    const ulRef = useRef(null);

    const handleClickOutside = (event) => {

        if (ulRef.current && !ulRef.current.contains(event.target)) {
            setDisplayAllTimes(false);
        }

    };

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    // ====== analytics-data ====== //

    const analyticsDataThisYear = [

        {id: 0, title: 'salesWord', num: '$ 48.8K', rate: '+3.4%'},
        {id: 1, title: 'returnWord', num: '$ 12.2K', rate: '-1.2%'},

    ];

    const analyticsDataThisWeek = [

        {id: 0, title: 'salesWord', num: '$ 16.3K', rate: '+2.1%'},
        {id: 1, title: 'returnWord', num: '$ 8.6K', rate: '-1.8%'},

    ];

    const analyticsDataThisDay = [

        {id: 0, title: 'salesWord', num: '$ 6.4K', rate: '+1.3%'},
        {id: 1, title: 'returnWord', num: '$ 2.2K', rate: '-1.1%'},

    ];

    // ====== sales-return-data ====== //

    const allLabels = {

        day: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
        week: [t("weekDaySun"), t("weekDayMon"), t("weekDayTue"), t("weekDayWed"), t("weekDayThu"), t("weekDayFri"), t("weekDaySat")],
        month: [
            t("janMonth"), t("febMonth"), t("marMonth"), t("aprMonth"), t("mayMonth"), t("junMonth"), 
            t("julMonth"), t("augMonth"), t("sepMonth"), t("octMonth"), t("novMonth"), t("decMonth")
        ]

    }

    const allDataset = {

        day: {
            sales: [500, 0, 800, 650, 470, 900, 245, 300],
            return: [0, 100, 40, 300, 0, 50, 193, 40],
        },

        week: {
            sales: [600, 350, 0, 100, 675, 0, 570],
            return: [20, 100, 60, 0, 140, 0, 110]
        },

        month: {
            sales: [150000, 80000, 175000, 315000, 750000, 140000, 416000, 876000, 77000, 741000, 584000, 967000],
            return: [3200, 1540, 50000, 23000, 14700, 3240, 14800, 15721, 14000, 87211, 32571, 54863]
        }

    }

    // ====== chose-time ====== //

    const [yearTime, setYearTime] = useState(true);
    const [weekTime, setWeekTime] = useState(false);
    const [dayTime, setDayTime] = useState(false);
    const [spanWord, setSpanWord] = useState('thisYearWord');

    const [analyticsData, setAnalyticsData] = useState(analyticsDataThisYear);

    const chooseChart = (chosenTime, spanTime, changedAnalyticsData) => {

        setYearTime(chosenTime === setYearTime);
        setWeekTime(chosenTime === setWeekTime);
        setDayTime(chosenTime === setDayTime);

        setSpanWord(spanTime);

        setDisplayAllTimes(false);

        setAnalyticsData(changedAnalyticsData);

    }

    // ====== animation ====== //

    const listAnimation = {

        hidden: {opacity: 0, height: '0px'},
        visible: {opacity: 1, height: 'fit-content' , transition: {duration: 0.3}},
        exit: {opacity: 0, height: '0px' , transition: {duration: 0.3}},

    }

    // ====== chart-setting ====== //

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
    
    const data = {

        labels: dayTime ? allLabels.day : weekTime ? allLabels.week : allLabels.month,

        datasets: [

            {
                label: dayTime ? t('lastDayWord') : weekTime ? t('lastWeekWord') : t('lastYearWord'),
                data: dayTime ? allDataset.day.return : weekTime ? allDataset.week.return : allDataset.month.return,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.3,
                pointBackgroundColor: "white",
                pointBorderColor: "rgba(255, 99, 132, 1)",
                fill: true,
            },

            {
                label: dayTime ? t('thisDayWord') : weekTime ? t('thisWeekWord') : t('thisYearWord'),
                data: dayTime ? allDataset.day.sales : weekTime ? allDataset.week.sales : allDataset.month.sales,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.3,
                pointBackgroundColor: "white",
                pointBorderColor: "rgba(54, 162, 235, 1)",
                fill: true,
            },

        ],

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        scales: {

            x: {
                beginAtZero: true,
                ticks: {
                    font: {
                        family: "Cairo, sans-serif",
                    },
                },
            },

            y: {
                beginAtZero: true,
                ticks: {
                    // stepSize: 200,
                    callback: function (value) {
                        return value;
                    },
                    font: {
                        family: "Cairo, sans-serif",
                    },
                },
            },

        },

        plugins: {

            legend: {
                position: "top",
                rtl: true,
                labels: {
                    font: {
                        family: "Cairo, sans-serif",
                    },
                },
            },
            
            tooltip: {
                rtl: true,
                bodyFont: {
                    family: "Cairo, serif",
                },
            },

            title: {
                display: false,
                text: "Sales & Return Data",
            },

            filler: {
                propagate: true,
            },

        },

    };

    return <React.Fragment>

        <div className={analyticsCSS.container}>

            <div className={analyticsCSS.time_list_cont}>

                <div ref={ulRef} className={analyticsCSS.time_list}>

                    <button className={analyticsCSS.time_btn} onClick={() => setDisplayAllTimes(!displayAllTimes)}>

                        <p>{t('showWord')} :</p>
                        <span>{t(spanWord)}</span>

                        {i18n.language === 'en' ? 
                            <div style={{rotate: displayAllTimes ? '90deg' : '0deg'}} className={analyticsCSS.arrowList}>
                                <IoIosArrowForward />
                            </div> :
                            <div style={{rotate: displayAllTimes ? '-90deg' : '0deg'}} className={analyticsCSS.arrowList}>
                                <IoIosArrowBack />
                            </div>
                        }

                    </button>

                    <AnimatePresence>

                        {displayAllTimes && 

                            <motion.ul
                                key={'times-list'}
                                className={analyticsCSS.times_list}
                                variants={listAnimation} initial='hidden' animate='visible' exit={'exit'}
                            >

                                <li 
                                    className={yearTime ? analyticsCSS.chosen_time : ''} 
                                    onClick={() => chooseChart(setYearTime, 'thisYearWord', analyticsDataThisYear)}
                                >
                                    {t('thisYearWord')}
                                </li>
                                <li 
                                    className={weekTime ? analyticsCSS.chosen_time : ''} 
                                    onClick={() => chooseChart(setWeekTime, 'thisWeekWord', analyticsDataThisWeek)}
                                >
                                    {t('thisWeekWord')}
                                </li>
                                <li 
                                    className={dayTime ? analyticsCSS.chosen_time : ''} 
                                    onClick={() => chooseChart(setDayTime, 'thisDayWord', analyticsDataThisDay)}
                                >
                                    {t('thisDayWord')}
                                </li>

                            </motion.ul>

                        }

                    </AnimatePresence>

                </div>

                <button className={analyticsCSS.report}>
                    <p>{t('downloadReport')}</p>
                    <MdOutlineFileDownload />
                </button>

            </div>

            <div className={analyticsCSS.summary}>

                {analyticsData.map(data => <RatioCard count={2} key={data.id} cardData={data} />)}

            </div>

            <div className={analyticsCSS.chart_cont}>

                <Line data={data} options={options} />

            </div>

        </div>

    </React.Fragment>

}
