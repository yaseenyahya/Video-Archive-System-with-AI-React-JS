import React, { useState, memo } from 'react';
import { makeStyles } from '@mui/styles';
import { IconButton, Dialog, Paper } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CloseIcon from "@mui/icons-material/Close";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { pdfjs, Document, Page } from 'react-pdf';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import clsx from "clsx";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  fullscreenButton: {
    position: 'absolute!important',
    top: '60px',
    right: '10px',
    backgroundColor: 'white!important',
    zIndex: 10000,
  },

  exitFullscreenButton: {
    color: "white!important",
    cursor: "pointer"
  },
  modal: {

  },
  pagesCount: {
    position: "absolute",
    marginTop: -18,
    fontSize: 11,
    marginLeft: 5,
    fontWeight: 700
  },
  nextPrevButtons: {
    position: "absolute",
    zIndex: 1000
  },
  prevButton:{
    cursor:"pointer"
  },
  nextButton:{
    cursor:"pointer"
  }
}));

const PDFViewer = (props) => {
  const classes = useStyles(); // Add this line to initialize classes
  const [numPages, setNumPages] = useState(0); // Initialize numPages with a default value
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false); // Add state for the modal
  const [pageNumber, setPageNumber] = useState(1);
  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => {

      return <Toolbar>
        {(slots) => {
          const {
            CurrentPageInput,
            Download,
            EnterFullScreen,
            GoToNextPage,
            GoToPreviousPage,
            NumberOfPages,
            Print,
            ShowSearchPopover,
            Zoom,
            ZoomIn,
            ZoomOut,

          } = slots;
          return (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                width: '100%',
              }}
            >
              <div style={{ padding: '0px 2px' }}>
                <ShowSearchPopover />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <ZoomOut />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <Zoom />
              </div>
              <div style={{ padding: '0px 2px' }}>
                <ZoomIn />
              </div>
              <div style={{ padding: '0px', marginLeft: 'auto' }}>
                <GoToPreviousPage />
              </div>
              <div style={{ padding: '0px 2px', display: "flex", color: "white", justifyContent: "center", alignItems: "center" }}>
                <CurrentPageInput /> / <NumberOfPages />
              </div>
              <div style={{ padding: '0px' }}>
                <GoToNextPage />
              </div>


              <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                <Print />
              </div>
              <div style={{ padding: '5px 4px 0px 0px' }}>
                <CloseIcon onClick={() => {
                  setIsFullscreenModalOpen(false);
                }} className={classes.exitFullscreenButton} />
              </div>
            </div>
          );
        }}
      </Toolbar>
    }
  });


  return (
    <>
      <IconButton
        className={classes.fullscreenButton}
        onClick={() => {

          setIsFullscreenModalOpen(true); // Open the modal on button click
        }}
        tabIndex={0}
      >
        <FullscreenIcon />
      </IconButton>
      <div className="Example" style={{ overflow: 'hidden' }}>
        <div className="Example__container">
          <div className="Example__container__document">
            <div className={classes.nextPrevButtons}>
              <KeyboardArrowLeftIcon className={classes.prevButton} onClick={goToPreviousPage} disabled={pageNumber === 1}>
              </KeyboardArrowLeftIcon>
              <KeyboardArrowRightIcon className={classes.nextButton}  onClick={goToNextPage} disabled={pageNumber === numPages}>
                Next
              </KeyboardArrowRightIcon>
            </div>
            <Document
              onLoadError={(e) => {
                alert(e);
              }}
              file={props.fileSrc}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page height={props.height} pageNumber={pageNumber} />
            </Document>
            <p className={classes.pagesCount}>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        </div>
      </div>
      <Dialog fullScreen
        className={classes.modal}
        open={isFullscreenModalOpen}
        onClose={() => {
          setIsFullscreenModalOpen(false); // Close the modal when desired
        }}

      >
        <Paper className={clsx(classes.modalContent)} >
          <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.js`}>
          <div style={{ height: "100vh" }}>
            <Viewer fileUrl={props.fileSrc} plugins={[defaultLayoutPluginInstance]} theme="dark" />
          </div>
          </Worker>
        </Paper>
      </Dialog>
    </>
  );
};

export default memo(PDFViewer);
