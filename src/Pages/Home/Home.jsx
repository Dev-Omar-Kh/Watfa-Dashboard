import React, { useState } from 'react';
import RatioCard from '../../Components/Ratio_Card/RatioCard';

import { Line } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from "chart.js";

import homeCSS from './home.module.css';
import { useTranslation } from 'react-i18next';
// import { Helmet } from 'react-helmet';

export default function Home() {

    const {t} = useTranslation();

    // ====== cards-data ====== //

    const homeData = [

        {id: 0, title: t('totalClientsWord'), num: '230'},
        {id: 1, title: t('totalOrdersWord'), num: '180'},
        {id: 2, title: t('revenueWord'), num: '140'},
        {id: 3, title: t('overduePaymentsWord'), num: '80'},

    ];

    // ====== custom-charts ====== //

    const [dayChart, setDayChart] = useState(false);
    const [weekChart, setWeekChart] = useState(true);
    const [monthChart, setMonthChart] = useState(false);

    const chooseChart = (chartType) => {

        setDayChart(chartType === setDayChart);
        setWeekChart(chartType === setWeekChart);
        setMonthChart(chartType === setMonthChart);

    }

    // ====== charts-data ====== //

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

        labels: dayChart ? allLabels.day : weekChart ? allLabels.week : allLabels.month,

        datasets: [

            {
                label: dayChart ? t('lastDayWord') : weekChart ? t('lastWeekWord') : t('lastYearWord'),
                data: dayChart ? allDataset.day.lastDay : weekChart ? allDataset.week.lastWeek : allDataset.month.lastMonth,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.3,
                pointBackgroundColor: "white",
                pointBorderColor: "rgba(255, 99, 132, 1)",
                fill: true,
            },

            {
                label: dayChart ? t('thisDayWord') : weekChart ? t('thisWeekWord') : t('thisYearWord'),
                data: dayChart ? allDataset.day.thisDay : weekChart ? allDataset.week.thisWeek : allDataset.month.thisMonth,
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
                text: "Monthly Sales Data",
            },

            filler: {
                propagate: true,
            },

        },

    };

    return <React.Fragment>

        <div className={homeCSS.container}>

            <div className={homeCSS.summary}>

                {homeData.map(data => <RatioCard key={data.id} cardData={data} />)}

            </div>

            <div className={homeCSS.revenue_charts}>

                <div className={homeCSS.chart_title}>

                    <h3>{t('revenue')}</h3>

                    <div className={homeCSS.sort_list}>

                        <button 
                            style={dayChart ? {borderColor: 'var(--first-color)', color: 'var(--first-color)'} : {}}
                            onClick={() => chooseChart(setDayChart)}
                        >{t('todayWord')}</button>

                        <button 
                            style={weekChart ? {borderColor: 'var(--first-color)', color: 'var(--first-color)'} : {}}
                            onClick={() => chooseChart(setWeekChart)}
                        >{t('weeklyWord')}</button>

                        <button 
                            style={monthChart ? {borderColor: 'var(--first-color)', color: 'var(--first-color)'} : {}}
                            onClick={() => chooseChart(setMonthChart)}
                        >{t('yearlyWord')}</button>

                    </div>

                </div>

                <div className={homeCSS.chart_cont}>

                    <Line data={data} options={options} />

                </div>

            </div>

        </div>

    </React.Fragment>

}
