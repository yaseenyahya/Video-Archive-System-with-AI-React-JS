import React, { useState,useImperativeHandle,forwardRef } from 'react';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/styles";
import {  useTheme } from "@mui/styles";
import './styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import useMediaQuery from '@mui/material/useMediaQuery';
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex!important",

  },
  closeButton: {
    position: "absolute!important",
    right: 5,
    top: 6,
    color: "white!important",
  },
  dialogTitle: {
    background: "#505050",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "10px!important",
    paddingBottom: "10px!important",
  },
  dialogTitleText: {
    color: "white",
  },
  dialogActions: {
    padding: 0,

  },
  dialogContent: {
    padding: "0!important"
  },
  contentContainer: {
    marginTop: 10,
    display: "flex!important",
    flexDirection: "column"
  }, searchTextField: {
    marginTop: "5px!important",
    marginLeft: "15px!important",
    marginRight: "15px!important",
  },
  searchSubmitButton: {
    paddingRight: 15
  },
  submitButtonContainer: {
    display: "flex!important",
    alignItems: "center",
    justifyContent: "center"

  },
  searchText: {
    textDecoration: "underline",
    cursor: "pointer"
  }
}));
const DateRangeModal = forwardRef((props, ref) => {
  const classes = useStyles();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const theme = useTheme();
  const isMdSmOrXs = useMediaQuery(theme.breakpoints.down('md'));

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    color: '#ff5733',
  });

  // Create a ref for the DateRangeModal component
  useImperativeHandle(ref, () => ({
    clearSearch: () => {
      setSearchText("");
      setDateRange({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        color: '#ff5733',
      });
    },
  }));

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSearch = () => {
    
    props.onSearch && props.onSearch(dateRange.startDate, dateRange.endDate, searchText);
    setIsPopupOpen(false);
  };

  return (
    <div className={classes.mainContainer}>
      <Box className={props.dateRangeCalendarButtonClassName} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <IconButton  onClick={handleOpenPopup}>
          <CalendarTodayIcon className={props.dateRangeCalendarIconClassName}/>
        </IconButton>
        {props.searchIconText && <Typography className={classes.searchText} onClick={handleOpenPopup}>
          {props.searchIconText}
        </Typography>}
      </Box>
      <Dialog fullScreen={isMdSmOrXs} style={isMdSmOrXs ? {padding:20}: null}  onKeyDown={(e)=>{
            if (e.key === 'Enter' && !e.ctrlKey) {
              
              handleSearch();
              setTimeout(() => {
                setIsPopupOpen(false);
              }, (200));
             
              }
           }} open={isPopupOpen} onClose={handleClosePopup}>
        <DialogTitle
          onClose={handleClosePopup}
          id="customized-dialog-title"
          className={classes.dialogTitle}
        >
          <Typography variant="h6" className={classes.dialogTitleText}>
            {props.title}
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClosePopup}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Container disableGutters={true} className={classes.contentContainer}>
            <DateRange
              moveRangeOnFirstSelection={false}
              onChange={item => {
                setDateRange(item.selection)
              }}
              maxDate={new Date()}
              ranges={[dateRange]}
            />
            <TextField value={searchText} onChange={event => {
              setSearchText(event.target.value);
            }}
              className={classes.searchTextField} placeholder='Search Text'></TextField>
          </Container>
        </DialogContent>
        <DialogActions disableSpacing={true} className={classes.dialogActions}>
          <Container disableGutters={true} className={classes.submitButtonContainer}>
            <Button className={classes.searchSubmitButton} variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Container>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DateRangeModal;



