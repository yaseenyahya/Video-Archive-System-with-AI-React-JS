import React, { useState, useEffect, forwardRef, useRef } from "react";
import TextField from "@mui/material/TextField";
import validator from "validator";
import MaskedInput from "react-text-mask";
import clsx from "clsx";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ValidationTextField = forwardRef((props, refProp) => {
  const valueDefault = props.value ? props.value : "";
  
  const [value, setValue] = useState(valueDefault);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  useEffect(() => {
    if (refProp) {
      refProp.current = {
        validateValue: () => validate_(value),
        inputRef: inputRef,
      };
    }
  }, [refProp, value]);

  useEffect(() => {
 
    setValue(props.value || ""); // Reset to an empty string if props.value is falsy
  }, [props.value]);

  useEffect(() => {
    var timeout = null;
    props.focus &&
      props.focus(() => {
        timeout = setTimeout(() => {
          inputRef.current.focus();
        }, 1000);
      });
    return () => {
      props.focus && clearTimeout(timeout);
    };
  }, []);

  function validate_(value) {
    let valid = true;
    if (props.required) {
   
      if (value.length < props.minValue) {
        setError(props.minValueErrorText);
        valid = false;
      }
      if (value === "") {
        setError("This field is required.");
        valid = false;
      }
      if (valid) {
        setError("");
      }
    }
    if(valid && props.emailtext){
    if (value.length > 0) {
      if (!validator.isEmail(value)) {
        setError("Invalid email address.");
      } else {
        setError("");

      }
    }else
      setError("");
      
    }
    return valid;
  }

  function onInput(e) {
   
    setValue(e.target.value);
    validate_(e.target.value);
    props.onInput && props.onInput(e);
  }

  return (
    <TextField
   
      ref={inputRef}
      {...props}
      value={value} // Use the local value state here
      onInput={onInput}
      error={error !== ""}
      helperText={error}
      InputLabelProps={{
        shrink: true,
      }}
      type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
      InputProps={{
        autoComplete: "new-password",
        inputProps: { mask: props.mask },
        classes: {
          ...props.InputProps.classes,
          root: clsx({
            [props.onErrorInputRootClass]: error,
            [props.InputProps.classes.root]: !error,
          }),
        },
        endAdornment:
          props.type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ?  <Visibility/> :<VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) :  props.dirInput ? <InputAdornment position="end">
          <IconButton
            disabled={props.dirInputDisabled}
            aria-label="toggle password visibility"
            onClick={props.handleDirInput}
            onMouseDown={props.handleDirInput}
            edge="end"
          >
            <RuleFolderIcon/>
          </IconButton>
        </InputAdornment> : null,
      }}
    />
  );
});

export default ValidationTextField;
