import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './Layout/Dashboard/Layout';
import Home from './Pages/Home/Home';
import Users from './Pages/Users/Users';
import Analytics from './Pages/Analytics/Analytics';
import UserDetails from './Pages/Users/User_Details/UserDetails';
import UsersLayout from './Layout/User_Layout/UsersLayout';
import Transactions from './Pages/Transactions/Transactions';
import Settings from './Pages/Settings/Settings';
import Notification from './Pages/Notification/Notification';
import NotificationLayout from './Layout/Notification_Layout/NotificationLayout';
import SingleNote from './Pages/Notification/Single_Note/SingleNote';
import Auth from './Authentication/Auth';
import Error from './Pages/Error/Error';

const routes = createBrowserRouter(
    [

        {path: '/', element: <Layout />, children: [

            {path: '/', element: <Home />},
            {path: '/analytics', element: <Analytics />},
            {path: '/users', element: <UsersLayout />, children: [

                {path: '/users', element: <Users />},
                {path: 'user_details/:id', element: <UserDetails />},

            ]},
            {path: '/transactions', element: <Transactions />},
            {path: '/setting', element: <Settings />},

        ]},

        {path: '/notifications', element: <NotificationLayout />, children: [

            {path: '/notifications', element: <Notification />},
            {path: 'note/:id', element: <SingleNote />},

        ]},

        {path: '/login', element: <Auth />},

        {path: '*', element: <Error />},

    ],

    {
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true
        }
    }
);

export default function App() {

    const {i18n} = useTranslation();

    useEffect(() => {

        // const savedLang = i18n.language;
        const savedLang = localStorage.getItem('language');

        if(savedLang && i18n.language !== savedLang){
            i18n.changeLanguage(savedLang);
        }

        document.documentElement.lang = i18n.language;
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

    }, [i18n , i18n.language]);

    return <React.Fragment>

        <RouterProvider router={routes} />

    </React.Fragment>

}
