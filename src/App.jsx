import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useTranslation } from 'react-i18next';

const routes = createBrowserRouter(
    [

        {path: '/', element: <Layout />, children: [

            {path: '/', element: <></>}

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
