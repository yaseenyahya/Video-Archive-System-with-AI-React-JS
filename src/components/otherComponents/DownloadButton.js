import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { CircularProgress, Button, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';


const useStyles = makeStyles((theme) => ({

    downloadButton: {
        backgroundColor: "#504e4e!important",
        borderRadius: "0!important",
        width: "auto!important",
        minWidth: "auto!important",
        paddingRight: "5px!important",
        paddingLeft: "5px!important"
    },
    downloadButtonProgress:{
        color:"white!important"
    },
    downloadButtonIcon:{
        padding:0
    }
}));

const DownloadButton = (props) => {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    return (

        <Button variant={"contained"} onClick={() => {

            setIsLoading(true);
            fetch(props.fileUrl)
                .then((response) => response.blob())
                .then((blob) => {
                    // Create a URL for the blob data
                    const url = window.URL.createObjectURL(blob);

                    // Create a temporary anchor element for downloading
                    const downloadLink = document.createElement('a');
                    downloadLink.href = url;
                    downloadLink.download = props.filename;

                    // Simulate a click on the anchor to trigger the download
                    downloadLink.click();

                    // Clean up the temporary anchor element and URL
                    downloadLink.remove();
                    window.URL.revokeObjectURL(url);
                    setIsLoading(false);
                    props.onFileDownloadedComplete();
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error('Error downloading file:', error);
                });
        }} disabled={props.disabled || isLoading} className={classes.downloadButton}>
            {isLoading ? <CircularProgress className={classes.downloadButtonProgress} size={15}></CircularProgress> : <Tooltip title="Download">
                <DownloadIcon className={classes.downloadButtonIcon}/>
            </Tooltip>}
        </Button>
    );
};



export default DownloadButton;
