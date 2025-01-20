import React, { useEffect, useState }from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { motion } from 'framer-motion';

import pdfViewerCSS from './pdf_viewer.module.css';
import { IoClose } from 'react-icons/io5';
import { ThreeCircles } from 'react-loader-spinner';

export default function PdfViewer({fileUrl, display}) {

    // ====== pdf-viewer ====== //

    // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    //     'pdfJs/pdf.worker.min.mjs',
    //     import.meta.url,
    // ).toString();

    pdfjs.GlobalWorkerOptions.workerSrc = `/pdfJs/pdf.worker.min.mjs`;

    const [isLoading, setIsLoading] = useState(true);
    const pageNumber = 1


    useEffect(() => {

        const loader = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => {
            clearTimeout(loader);
        }

    } , [])

    // ====== animation ====== //

    const parentVariants = {

        hidden : {opacity : 0},
        visible: {opacity : 1 , transition : {duration : 0.5 , when : 'beforeChildren'}},
        exit : {opacity : 0 , transition : {duration : 0.5}}

    }

    return <React.Fragment>

        <motion.div variants={parentVariants} initial='hidden' animate='visible' exit={'exit'} className={pdfViewerCSS.container}>

            <button className={pdfViewerCSS.close_page} onClick={() => display(false)}>
                <IoClose />
            </button>

            {
                isLoading ? <div className={pdfViewerCSS.loader}>
                    <ThreeCircles
                        visible={true} height="50" width="50" color="var(--seconde-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    />
                </div>
                : <Document className={pdfViewerCSS.pdf_viewer} file={fileUrl}>
                    <Page pageNumber={pageNumber} renderAnnotationLayer={false} renderTextLayer={true} />
                </Document>
            }

        </motion.div>

    </React.Fragment>

}
