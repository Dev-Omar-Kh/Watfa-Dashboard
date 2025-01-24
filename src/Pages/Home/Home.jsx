import React, { useState } from 'react';
import RatioCard from '../../Components/Ratio_Card/RatioCard';

import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from "chart.js";

import homeCSS from './home.module.css';
import { useTranslation } from 'react-i18next';

export default function Home() {

    const {t} = useTranslation();

    // ====== cards-data ====== //

    const homeData = [

        {id: 0, title: 'totalClientsWord', num: '230'},
        {id: 1, title: 'totalOrdersWord', num: '180'},
        {id: 2, title: 'revenueWord', num: '140'},
        {id: 3, title: 'overduePaymentsWord', num: '80'},

    ];

    // ====== custom-charts ====== //

    const [chosenTime, setChosenTime] = useState('weeklyWord')

    const chooseChart = (chartType) => {

        setChosenTime(chartType);

    }

    // ====== charts-data ====== //

    const timeValues = ['todayWord', 'weeklyWord', 'yearlyWord'];

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
            lastDay: [150, 0, 270, 460, 870, 1000, 640, 300],
            thisDay: [15, 100, 520, 780, 1000, 300, 800, 460],
        },

        week: {
            lastWeek: [500, 1000, 600, 650, 750, 0, 350],
            thisWeek: [300, 600, 1000, 950, 500, 0, 1000]
        },

        month: {
            lastMonth: [150000, 80000, 175000, 315000, 750000, 140000, 416000, 876000, 77000, 741000, 584000, 967000],
            thisMonth: [320000, 130000, 95000, 224000, 178000, 395000, 246000, 267000, 364000, 315000, 86000, 768000]
        }

    }

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

    const data = {

        labels: chosenTime === 'todayWord' ? allLabels.day : chosenTime === 'weeklyWord' ? allLabels.week : allLabels.month,

        datasets: [

            {
                label: chosenTime === 'todayWord' ? t('lastDayWord') : 
                    chosenTime === 'weeklyWord' ? t('lastWeekWord') : t('lastYearWord')
                ,
                data: chosenTime === 'todayWord' ? allDataset.day.lastDay : 
                    chosenTime === 'weeklyWord' ? allDataset.week.lastWeek : allDataset.month.lastMonth
                ,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.3,
                pointBackgroundColor: "white",
                pointBorderColor: "rgba(255, 99, 132, 1)",
                fill: true,
            },

            {
                label: chosenTime === 'todayWord' ? t('thisDayWord') : 
                    chosenTime === 'weeklyWord' ? t('thisWeekWord') : t('thisYearWord')
                ,
                data: chosenTime === 'todayWord' ? allDataset.day.thisDay : 
                    chosenTime === 'weeklyWord' ? allDataset.week.thisWeek : allDataset.month.thisMonth
                ,
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
                    stepSize: 200,
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
                text: "Sales Data",
            },

            filler: {
                propagate: true,
            },

        },

    };

    return <React.Fragment>

        <div className={homeCSS.container}>

            <div className={homeCSS.summary}>

                {homeData.map(data => <RatioCard count={4} key={data.id} cardData={data} />)}

            </div>

            <div className={homeCSS.revenue_charts}>

                <div className={homeCSS.chart_title}>

                    <h3>{t('revenue')}</h3>

                    <div className={homeCSS.sort_list}>

                        {timeValues.map((time, idx) => <button 
                            style={chosenTime === time ? {borderColor: 'var(--first-color)', color: 'var(--first-color)'} : {}}
                            key={idx} onClick={() => chooseChart(time)}
                        >
                            {t(time)}
                        </button>)}

                    </div>

                </div>

                <div className={homeCSS.chart_cont}>

                    <Line data={data} options={options} />

                </div>

            </div>

        </div>

    </React.Fragment>

}
