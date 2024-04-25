import React, { useEffect, useRef, useState } from "react";
import {
    BaseTextFieldProps,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {
    defaultCountries,
    FlagEmoji,
    parseCountry,
    usePhoneInput,
} from "react-international-phone";
import { PhoneNumberUtil } from "google-libphonenumber";

const ValidationMobileField = ({ value, onChange, refProp, ...restProps }) => {
    const {
        phone,
        handlePhoneValueChange,
        inputRef,
        country,
        setCountry,
    } = usePhoneInput({
        defaultCountry: "pk",
        value,
        countries: defaultCountries,
        onChange: (data) => {

            isPhoneValid(data.phone, data.country);
            onChange(data);
        },
    });
    const [error, setError] = useState("");
    const phoneUtil = PhoneNumberUtil.getInstance();
    const inputRefFromParent = useRef(null);

    // Use a ref to access the input field from the parent component
    useEffect(() => {
        if (refProp) {
            refProp.current = {
                validatePhoneNumber: () => isPhoneValid(phone, country),
            };
        }
    }, [refProp, phone]);

    const isPhoneValid = (phone, country) => {
        try {



            const phoneUtil = PhoneNumberUtil.getInstance();
            const countryCode = "+" + phoneUtil.getCountryCodeForRegion(country);

            const phoneWithoutCode = phone.replace(/\s/g, '').replace(countryCode, '');

            if (phoneWithoutCode.length == 0 && restProps.required) {
                setError("This field is required.");
                return false;
            }

            if (phoneWithoutCode.length > 0) {
                const parsedPhone = phoneUtil.parseAndKeepRawInput(phone);


                if (!phoneUtil.isValidNumber(parsedPhone)) {
                    setError("Phone number is not valid.");
                    return false;
                }

                // Check if the phone number is complete (e.g., contains the expected number of digits)
                const isComplete = phoneUtil.isPossibleNumberWithReason(parsedPhone) === PhoneNumberUtil.ValidationResult.IS_POSSIBLE;

                if (!isComplete) {
                    setError("Phone number is incomplete.");
                    return false;
                }
                setError("");
                // Phone number is both valid and complete
                return true;
            }else{
                setError("");
                return true;
            }
        } catch (error) {

            setError("Phone number is not valid.");
            return false;
        }

    };



    return (
        <TextField
            variant="outlined"
            label="Phone number"
            color="primary"
            placeholder="Phone number"
            value={phone}
            error={error !== ""}
            helperText={error}
            onChange={handlePhoneValueChange}
            type="tel"
            inputRef={(el) => {
                inputRef.current = el;
                inputRefFromParent.current = el;
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment
                        position="start"
                        style={{ marginRight: "2px", marginLeft: "-8px" }}
                    >
                        <Select
                            MenuProps={{
                                style: {
                                    height: "300px",
                                    width: "270px",
                                    top: "10px",
                                    left: "-34px",
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                },
                            }}
                            sx={{
                                width: "max-content",
                                // Remove default outline (display only on focus)
                                fieldset: {
                                    display: "none",
                                },
                                '&.Mui-focused:has(div[aria-expanded="false"])': {
                                    fieldset: {
                                        display: "block",
                                    },
                                },
                                // Update default spacing
                                ".MuiSelect-select": {
                                    padding: "8px",
                                    paddingRight: "24px !important",
                                },
                                svg: {
                                    right: 0,
                                },
                            }}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            renderValue={(value) => (
                                <FlagEmoji iso2={value} style={{ display: "flex", width: 20, marginTop: 2 }} />
                            )}
                        >
                            {defaultCountries.map((c) => {
                                const country = parseCountry(c);
                                return (
                                    <MenuItem key={country.iso2} value={country.iso2}>
                                        <FlagEmoji
                                            iso2={country.iso2}
                                            style={{ marginRight: "8px", width: 40 }}
                                        />
                                        <Typography marginRight="8px">{country.name}</Typography>
                                        <Typography color="gray">+{country.dialCode}</Typography>
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </InputAdornment>
                ),
            }}
            {...restProps}
        />
    );
};

export default ValidationMobileField;
