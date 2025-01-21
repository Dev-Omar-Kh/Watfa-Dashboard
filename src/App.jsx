import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useTranslation } from 'react-i18next';
import Home from './Pages/Home/Home';
import Users from './Pages/Users/Users';
import Analytics from './Pages/Analytics/Analytics';
import UserDetails from './Pages/Users/User_Details/UserDetails';
import UsersLayout from './Layout/UsersLayout';
import Transactions from './Pages/Transactions/Transactions';

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

        ]}

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
