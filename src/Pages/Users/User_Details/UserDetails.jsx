import React from 'react';

import userDetailsCSS from './user_details.module.css';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

import userImg from '../../../Images/user_img.jpg';
import PdfViewer from '../PDF_Viewer/PdfViewer';

// import pdfImg from '../../../Images/pdf-1.pdf'

export default function UserDetails() {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <PdfViewer />

        <div className={userDetailsCSS.container}>

            <div className={userDetailsCSS.title}>

                <Link to={'/users'}>
                    <IoIosArrowBack />
                </Link>

                <h3>{t('detailsWord')}</h3>

            </div>

            <div className={userDetailsCSS.user_info}>

                <div className={userDetailsCSS.user_img}>

                    <img src={userImg} alt="user" />

                </div>

                <div className={userDetailsCSS.user_data}>

                    <div className={userDetailsCSS.user_data_cont}>
                        <h3>{t('userNameWord')}</h3>
                        <p>Omar Khaled Mohamed</p>
                    </div>

                    <div className={userDetailsCSS.user_data_cont}>
                        <h3>{t('emailWord')}</h3>
                        <p>omar.er3434@gmail.com</p>
                    </div>

                    <div className={userDetailsCSS.user_data_cont}>
                        <h3>{t('phoneNumWord')}</h3>
                        <p 
                            dir={i18n.language === 'ar' ? 'ltr' : 'ltr'}
                            style={i18n.language === 'ar' ? {display: 'flex', justifyContent: 'end'} : {}}
                        >
                            +966 547712349
                        </p>
                    </div>

                </div>

            </div>

            <div className={userDetailsCSS.registration_files}>

                <button className={userDetailsCSS.file_cont}>
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 0C9.05625 0 7.875 1.18125 7.875 2.625V39.375C7.875 40.8187 9.05625 42 10.5 42H36.75C38.1938 42 39.375 40.8187 39.375 39.375V10.5L28.875 0H10.5Z" fill="#E2E5E7"/>
                        <path d="M31.5 10.5H39.375L28.875 0V7.875C28.875 9.31875 30.0562 10.5 31.5 10.5Z" fill="#B0B7BD"/>
                        <path d="M39.375 18.375L31.5 10.5H39.375V18.375Z" fill="#CAD1D8"/>
                        <path d="M34.125 34.125C34.125 34.8469 33.5344 35.4375 32.8125 35.4375H3.9375C3.21562 35.4375 2.625 34.8469 2.625 34.125V21C2.625 20.2781 3.21562 19.6875 3.9375 19.6875H32.8125C33.5344 19.6875 34.125 20.2781 34.125 21V34.125Z" fill="#F15642"/>
                        <path d="M8.34619 24.8679C8.34619 24.5214 8.61919 24.1434 9.05888 24.1434H11.4831C12.8481 24.1434 14.0766 25.0569 14.0766 26.8078C14.0766 28.4668 12.8481 29.3908 11.4831 29.3908H9.73088V30.7768C9.73088 31.2388 9.43688 31.5 9.05888 31.5C8.71238 31.5 8.34619 31.2388 8.34619 30.7768V24.8679ZM9.73088 25.4651V28.0796H11.4831C12.1866 28.0796 12.7431 27.4588 12.7431 26.8078C12.7431 26.0741 12.1866 25.4651 11.4831 25.4651H9.73088ZM16.1319 31.5C15.7854 31.5 15.4074 31.311 15.4074 30.8503V24.8889C15.4074 24.5122 15.7854 24.2379 16.1319 24.2379H18.5351C23.331 24.2379 23.226 31.5 18.6296 31.5H16.1319ZM16.7934 25.5189V30.2203H18.5351C21.3688 30.2203 21.4948 25.5189 18.5351 25.5189H16.7934ZM24.927 25.6029V27.2711H27.6032C27.9812 27.2711 28.3592 27.6491 28.3592 28.0153C28.3592 28.3618 27.9812 28.6453 27.6032 28.6453H24.927V30.849C24.927 31.2165 24.6658 31.4987 24.2983 31.4987C23.8363 31.4987 23.5541 31.2165 23.5541 30.849V24.8876C23.5541 24.5109 23.8376 24.2366 24.2983 24.2366H27.9825C28.4445 24.2366 28.7175 24.5109 28.7175 24.8876C28.7175 25.2236 28.4445 25.6016 27.9825 25.6016H24.927V25.6029Z" fill="white"/>
                        <path d="M32.8125 35.4375H7.875V36.75H32.8125C33.5344 36.75 34.125 36.1594 34.125 35.4375V34.125C34.125 34.8469 33.5344 35.4375 32.8125 35.4375Z" fill="#CAD1D8"/>
                    </svg>
                    <p>seller papers for registration-1</p>
                </button>

            </div>

        </div>

    </React.Fragment>

}
