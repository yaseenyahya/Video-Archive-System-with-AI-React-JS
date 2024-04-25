import React, { useEffect } from "react";
import FileCopy from "@mui/icons-material/FileCopy";
import Check from "@mui/icons-material/Check";
import { makeStyles } from '@mui/styles';
import {
  IconButton
} from "@mui/material";
const useStyles = makeStyles((theme) => ({

  buttonIcon: {
    color: "rgb(219 61 68)",
    strokeDasharray: 100,
    position: "absolute",
    transition: "all 300ms ease-in-out"
  },
  button: {
    padding: 4,

  },
  buttonIconCheck: {
    color: "green",
    strokeDasharray: 100,
    position: "absolute",
    transition: "all 300ms ease-in-out"
  }
}));
const CopyButton = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);
  return (
    <span className={props.containerClassName} style={props.style}>
      <IconButton onClick={() => {

        props.onClick && props.onClick()
        setCopied(true)
      }
      } className={classes.button}>
        <span style={{
          position: "relative", display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 12
        }}>
          <FileCopy style={{
            strokeWidth: 1.5,
            width:20,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none",
            stroke: "currentcolor",
            strokeDashoffset: copied ? -100 : 0,

          }} className={classes.buttonIcon} />
          <Check isVisible={copied} style={{
            strokeWidth: 1.5,
            width:20,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none",
            stroke: "currentcolor",
            strokeDashoffset: copied ? 0 : -100,
          }} className={classes.buttonIconCheck} />
        </span>
      </IconButton>

    </span >
  );
});

export default CopyButton;
