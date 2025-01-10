import React from 'react';

import cardCSS from './ratio_card.module.css';

export default function RatioCard({cardData}) {

    return <React.Fragment>

        <div className={cardCSS.card}>

            <p className={cardCSS.card_number}>{cardData.num}</p>

            <p className={cardCSS.card_title}>{cardData.title}</p>

        </div>

    </React.Fragment>

}
