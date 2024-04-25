import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  Button,
  DialogContent,
  DialogActions,
  Typography,
  DialogTitle,
  CircularProgress,
  IconButton,
  Container,
} from "@mui/material";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  setCropImageModalImage,
  setCropImageModalToggle,
  setCropImageModalLoading,
  setCropImageModalZoom,
  setCropImageModalCrop,
  setCropImageModalCroppedAreaPixels,
  setCropImageModalReset
} from "../../store/actions/CropImageModalActions";
import getCroppedImg from './GetCroppedImage'
const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "white",
  },

  dialogTitle: {
    background: "rgb(46 62 78)",
  },
  dialogTitleText: {
    color: "white",
  },
  dialogActions: {
    padding: 0,
  },
  cropContainer: {
    position: "relative!important",
    height: "100%",
    width: "100%",
  },
  dialogContent: {
    padding: 0,
  },
  submitButton: {
    fontSize: 17,
    width: "200px",
    borderRadius: 0,
    margin:"auto!important",
    color: "white!important",
   display:"block!important"
   
  },
}));
const ImageCropper = (props) => {
  const classes = useStyles();

  const handleClose = () => {
    props.setCropImageModalReset();
  };
  const onCropChange = (crop) => {
    props.setCropImageModalCrop( crop );
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    props.setCropImageModalCroppedAreaPixels( croppedAreaPixels);
  };

  const onZoomChange = (zoom) => {

    props.setCropImageModalZoom(zoom);
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={props.cropImageModalToggle}
      onClose={handleClose}
      fullScreen
      style={{ margin: 20 }}
    >
      <DialogTitle
        onClose={handleClose}
        id="customized-dialog-title"
        className={classes.dialogTitle}
      >
        <Typography variant="h6" className={classes.dialogTitleText}>
          Crop Image
        </Typography>

      
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Cropper
          classes={{ containerClassName: classes.cropContainer }}
          image={props.cropImageModalImage}
          crop={props.cropImageModalCrop}
          zoom={props.cropImageModalZoom}
          aspect={props.cropImageModalAspect}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </DialogContent>
      <DialogActions disableSpacing={true} className={classes.dialogActions}>
        <Container maxWidth={"xl"} disableGutters={true} className={classes.submitButtonContainer}>
          <Button
          onClick={async ()=>{
            props.setCropImageModalLoading(true);
            const croppedImage = await getCroppedImg(
              props.cropImageModalImage,
              props.cropImageModalCroppedAreaPixels,
              0
            );
            props.onImageCropCompleted(croppedImage);
            props.setCropImageModalReset();
          }}
            variant="contained"
            type="submit"
            disabled={props.cropImageModalLoading}
            className={classes.submitButton}
          >
            {props.cropImageModalLoading && <CircularProgress size={25} />}
            {!props.cropImageModalLoading && "Edit"}
          </Button>
        </Container>
      </DialogActions>
    </Dialog>
  );
};
const mapStateToProps = (state) => {
  return { ...state.CropImageModalReducer };
};
export default connect(mapStateToProps, {
  setCropImageModalImage,
  setCropImageModalToggle,
  setCropImageModalLoading,
  setCropImageModalZoom,
  setCropImageModalCrop,
  setCropImageModalCroppedAreaPixels,
  setCropImageModalReset
})(ImageCropper);
