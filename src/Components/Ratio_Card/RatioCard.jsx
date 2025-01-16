import React, { useEffect, useState } from 'react';

import cardCSS from './ratio_card.module.css';
import { LuTrendingDown, LuTrendingUp } from 'react-icons/lu';

export default function RatioCard({cardData , count}) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
        useEffect(() => {
    
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };
    
            window.addEventListener('resize', handleResize);
    
            return () => {
                window.removeEventListener('resize', handleResize);
            };
    
        }, []);

    return <React.Fragment>

        <div 
            className={cardCSS.card} 
            style={windowWidth >= 940 ? {width: `calc((100% / ${count}) - (20px - (20px / ${count})))`} : {}}
        >

            <p className={cardCSS.card_number}>{cardData.num}</p>

            <div className={cardCSS.rate_cont}>

                <p className={cardCSS.card_title}>{cardData.title}</p>

                {cardData.rate && <span
                    className={cardCSS.rate}
                    style={{backgroundColor: cardData.rate.split('')[0] === '+' ? 'var(--eighth-color)' : 'var(--tenth-color)'}}
                >
                    <p style={{color: cardData.rate.split('')[0] === '+' ? 'var(--seventh-color)' : 'var(--ninth-color)'}}>
                        {cardData.rate}
                    </p>
                    {cardData.rate.split('')[0] === '+' ? 
                        <LuTrendingUp style={{color: 'var(--seventh-color)'}} /> : 
                        <LuTrendingDown style={{color: 'var(--ninth-color)'}} />
                    }
                </span>}

            </div>

        </div>

    </React.Fragment>

}
