import React from 'react';

import pdfViewerCSS from './pdf_viewer.module.css';

// import pdfImg from '../../../Images/pdf-1.pdf';

export default function PdfViewer() {

    const pdfImg = 'https://res.cloudinary.com/dmkh4y8bw/image/upload/v1737311609/%D8%A3%D9%88%D8%B1%D8%A7%D9%82-%D8%A7%D9%84%D8%AA%D8%A7%D8%AC%D8%B1-%D9%84%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84-%D9%A1_utj6si.pdf'

    return <React.Fragment>

        <div className={pdfViewerCSS.container}>

            <iframe
                src={pdfImg}
                title="PDF Viewer"
                className={pdfViewerCSS.i_frame}
            />

        </div>

    </React.Fragment>

}
