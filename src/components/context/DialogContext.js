import React, { createContext, useContext, useState } from "react";
import { Button, Dialog, DialogTitle,CircularProgress, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
export const DialogContext = createContext({ openContextDialog: null });
const useStyles = makeStyles((theme) => ({
  dialogPaper:{
    minWidth: '50%'
  }
}));
export const DialogProvider = ({ children }) => {
  const classes = useStyles({});
  const [isContextDialogOpen, setContextDialogOpen] = useState(false);
  const [contextDialogShowLoadingAndDisabled, setContextDialogShowLoadingAndDisabled] = useState(false);
  const [contextDialogAgreeButtonText, setContextDialogAgreeButtonText] = useState("Agree");
  const [contextDialogDisagreeButtonText, setContextDialogDisagreeButtonText] = useState("Disagree");
  const [contextDialogContentText, setContextDialogContentText] = useState("");
  const [contextDialogTitle, setContextDialogTitle] = useState("");
  const handleContextDialogAgree = React.useRef(null); // Initialize as null
  const handleContextDialogDisagree = React.useRef(null);
  const [contextDialogshowCancel, setContextDialogShowCancel] = useState(false);
  const [contextDialogShowContainedButton, setContextDialogShowContainedButton] = useState(false);
  
  const openContextDialog = (agreeText, disagreeText, contentText, title, handleAgreeFn, handleDisagreeFn,showCancel,showContainedButton) => {
    setContextDialogAgreeButtonText(agreeText);
    setContextDialogDisagreeButtonText(disagreeText);
    setContextDialogContentText(contentText);
    setContextDialogTitle(title);
    handleContextDialogAgree.current =() => {
      handleAgreeFn();
      
    };
    handleContextDialogDisagree.current=() => {
      handleDisagreeFn();
      setContextDialogOpen(false);
    };
    setContextDialogShowCancel(showCancel);
    setContextDialogOpen(true);
    setContextDialogShowContainedButton(showContainedButton);

    return {closeAndReset,showLoadingAndDisabled};
  };
const closeAndReset =()=>{
  setContextDialogShowLoadingAndDisabled(false);
  setContextDialogOpen(false);
}
const showLoadingAndDisabled =(value)=>{
  setContextDialogShowLoadingAndDisabled(value);
}
  return (
    <DialogContext.Provider
      value={{

        openContextDialog,

      }}
    >
      {children}
      <Dialog  classes={{paper:classes.dialogPaper}} open={isContextDialogOpen} onClose={() => {
        if(!contextDialogShowLoadingAndDisabled)
        setContextDialogOpen(false)
        }}>
      {contextDialogTitle && <DialogTitle>{contextDialogTitle}</DialogTitle>}
        <DialogContent >
          <DialogContentText>{contextDialogContentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={contextDialogShowLoadingAndDisabled} variant={contextDialogShowContainedButton ? "contained" : "text"} color={contextDialogShowContainedButton ? "error" : "primary"} onClick={handleContextDialogDisagree.current}>{ contextDialogDisagreeButtonText}</Button>
          <Button disabled={contextDialogShowLoadingAndDisabled} variant={contextDialogShowContainedButton ? "contained" : "text"}  color={contextDialogShowContainedButton ? "success" : "primary"}  onClick={handleContextDialogAgree.current} autoFocus>
          {contextDialogShowLoadingAndDisabled && <CircularProgress style={{width:20,height:20}}/>} {!contextDialogShowLoadingAndDisabled && contextDialogAgreeButtonText}
          </Button>
          {
            contextDialogshowCancel &&   <Button disabled={contextDialogShowLoadingAndDisabled} color={contextDialogShowContainedButton ? "warning" : "primary"}  variant={contextDialogShowContainedButton ? "contained" : "text"} onClick={() => setContextDialogOpen(false)} autoFocus>
            Cancel
          </Button>
          }
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};
