import React, { useState, memo, useRef, useEffect,forwardRef } from 'react';
import { makeStyles } from '@mui/styles';
import Lightbox from 'react-awesome-lightbox';
import { IconButton } from '@mui/material';
import 'react-awesome-lightbox/build/style.css';
import { connect } from 'react-redux';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import resolveExtensions from '../FilesList/resolveExtensions';
import PDFViewer from '../../otherComponents/PDFViewer';


const useStyles = makeStyles((theme) => ({
    mainContainer: {
        backgroundColor: "black",
        display: "flex",
        height: (state) => state.mainContainerHeight,
        width: "100%",
        justifyContent: "center",
    },
    fullscreenButton: {
        position: 'absolute!important',
        display:"flex",
        justifyContent:"center",
        top: '60px',
        right: '10px',
        backgroundColor: 'white!important',
        zIndex: 1000
    },
}));



const PreviewFile = forwardRef((props, refProp) => {
    const classes = useStyles({ mainContainerHeight: props.height });
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    useEffect(() => {
        if (refProp) {
            refProp.current = {
                pauseVideoPlaying: (value) => {
                  
                    const video = videoRef.current;
                    if (video && value) {
                        video.pause();
                    }
                }

            };
        }
    }, [refProp]);
    const videoRef = useRef();
    const openLightbox = () => {
        setIsLightboxOpen(true);
    };
    var selectedFileIsAudio = new resolveExtensions().isAudioExtension(props.filesListAndEditorSelectedFileItem.extension);
    var selectedFileIsVideo = new resolveExtensions().isVideoExtension(props.filesListAndEditorSelectedFileItem.extension);
    
    if(new resolveExtensions().isOggExtension(props.filesListAndEditorSelectedFileItem.extension)){
       
        var moreInfo = props.filesListAndEditorSelectedFileItem.moreInfo && props.filesListAndEditorSelectedFileItem.moreInfo != "" ? JSON.parse(props.filesListAndEditorSelectedFileItem.moreInfo) : null;
    if(moreInfo){
        if(moreInfo.customType == "audio"){
        selectedFileIsAudio = true;
        selectedFileIsVideo = false;
        }else{
            selectedFileIsAudio = false;
            selectedFileIsVideo = true;
        }
    }
    }
    useEffect(() => {
        if (selectedFileIsAudio || selectedFileIsVideo
        )
            videoRef.current?.load();
    }, [props.filesListAndEditorSelectedFileItem]);
    const serverAddress = `${props.configData.serverip}${props.configData.port !== '' ? ':' + props.configData.port : ''}`;

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };
    const folderPathSegments = props.filesListAndEditorSelectedFileItem.folder.path.split('\\');
    const lastFolderSegment = folderPathSegments[folderPathSegments.length - 1].replace(/\s+/g, '');
    return (
        <div className={classes.mainContainer} style={selectedFileIsAudio ? {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        } : null}>
            {new resolveExtensions().isImageExtension(props.filesListAndEditorSelectedFileItem.extension) ? (
                <>
                    <img
                        height={"100%"}
                        src={`${serverAddress}/${lastFolderSegment}/${props.filesListAndEditorSelectedFileItem.filename}`}
                        alt="Image Title"
                    />
                    <IconButton
                        className={classes.fullscreenButton}
                        onClick={openLightbox}
                        tabIndex={0}
                    >
                        <FullscreenIcon />
                    </IconButton>
                    {isLightboxOpen && (
                        <Lightbox
                            image={`${serverAddress}/${lastFolderSegment}/${props.filesListAndEditorSelectedFileItem.filename}`}
                            title={props.filesListAndEditorSelectedFileItem.filename}
                            onClose={closeLightbox}
                        />
                    )}
                </>
            ) : selectedFileIsAudio || selectedFileIsVideo ? (
                <video ref={videoRef} width={selectedFileIsAudio ? "auto" : "100%"} height={selectedFileIsAudio ? "auto" : props.height} controls controlsList="nodownload">
                    <source src={`${serverAddress}/${lastFolderSegment}/${props.filesListAndEditorSelectedFileItem.filename}`} >
                    </source>
                </video>
            ) : (
                <PDFViewer
                    fileSrc={`${serverAddress}/${lastFolderSegment}/${props.filesListAndEditorSelectedFileItem.filename}`}
                    height={props.height}
                ></PDFViewer>
            )}
        </div>
    );
});

const mapStateToProps = (state) => {
    return { ...state.OtherReducer, ...state.FilesListAndEditorReducer };
};

export default connect(mapStateToProps,null,null,{ forwardRef: true })(memo(PreviewFile));
