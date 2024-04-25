import React, { useEffect, useState, useRef } from "react";
import {
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  formHelperText: {
    color: "#f44336",
  },
}));

const ValidationSelectField = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const selectField = useRef(null);



  const [value, setValue] = useState(props.value);
  const [error, setError] = useState("");
  useEffect(() => {
 
    setValue(props.value || ""); // Reset to an empty string if props.value is falsy
  }, [props.value]);
  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if (ref) {
      ref.current = {
        validateValue: () => validate_(value),
      };
    }
  }, [ref, value]);

  function validate_(value) {
    let valid = true;

    if (props.required) {
      if (!value || value.length === 0) {
        setError("This field is required.");
        valid = false;
      } else {
        setError("");
      }
    }
    return valid;
  }

  function handleChange(e) {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    validate_(selectedValue);
    props.onChange && props.onChange(e);
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel htmlFor={`native-simple-${props.label.replace(/ /g, "-")}`}>
        {props.label}
      </InputLabel>
      <Select

        ref={selectField}
        {...props}
        inputProps={{
          id: `native-simple-${props.label.replace(/ /g, "-")}`,
        }}
        value={value}
        onChange={handleChange}
        error={error !== ""}
      >
        <MenuItem aria-label="None" value="" />
        {props.values &&
          props.values.map((values) => (
            <MenuItem  key={values[0]} value={values[0]}>
              {values[1]}
            </MenuItem>
          ))}
      </Select>
      {error && (
        <FormHelperText className={classes.formHelperText}>{error}</FormHelperText>
      )}
    </FormControl>
  );
});

export default ValidationSelectField;
