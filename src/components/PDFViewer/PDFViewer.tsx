import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import classes from "./PDFViewer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../UI/ProgressBar/ProgressBar";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  file: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 2);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 2);
  };

  return (
    <div className={classes.PDFViewer}>
      <div className={classes.PDF}>
        <button
          onClick={goToPreviousPage}
          title="Previous page"
          disabled={currentPage <= 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className={classes.Document}
        >
          {currentPage > 1 && (
            <>
              <Page
                pageNumber={currentPage - 1}
                className={classes.Page}
                renderTextLayer={false}
              />

              <div className={classes.PageShadow}>
                <div className={classes.Separator} />
              </div>
            </>
          )}
          <Page
            pageNumber={currentPage}
            className={classes.Page}
            renderTextLayer={false}
          />
        </Document>

        <button
          onClick={goToNextPage}
          title="Next page"
          disabled={currentPage >= numPages}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className={classes.Progress} title={`${currentPage} of ${numPages}`}>
        <ProgressBar progress={(currentPage / numPages) * 100} />
        <div
          className={classes.ProgressLabel}
          style={{ left: `${(currentPage / numPages) * 100}%` }}
        >
          <p>
            {currentPage} / {numPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
