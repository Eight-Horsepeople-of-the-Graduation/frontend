import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import classes from "./BookReader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "../UI/ProgressBar/ProgressBar";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface BookReaderProps {
  file: string;
  language?: string;
}

const BookReader: React.FC<BookReaderProps> = ({ file, language }) => {
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

  const isRtl = [
    "arabic",
    "urdu",
    "aramaic",
    "ruhingya",
    "sindhi",
    "hebrew",
    "divehi",
    "azerbaijani",
    "syriac",
    "persian",
    "kurdish",
    "fula",
    "pashto",
  ].includes(language ?? "english");

  return (
    <div className={classes.BookReader}>
      <div className={classes.Book}>
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
          <div
            className={classes.PagesWrapper}
            style={{ direction: isRtl ? "rtl" : "ltr" }}
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

                <div className={classes.LeftShadow} />
                <div className={classes.RightShadow} />
              </>
            )}
            <Page
              pageNumber={currentPage}
              className={classes.Page}
              renderTextLayer={false}
            />
          </div>
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

export default BookReader;
