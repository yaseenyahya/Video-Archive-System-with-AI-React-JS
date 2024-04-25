import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  scrollToTopButton: {
    backgroundColor: '#E14425!important',
    position: 'fixed!important',
    bottom: '50px',
    left: '20px',
    zIndex: 1000,
    borderRadius: '50%!important', // Makes it circular
    padding: "6px!important", // Adjust the padding as needed
    opacity:0.7,
    '&:hover': {
      opacity:1, // You can adjust this if needed
    },
  },
  scrollToTopButtonIcon:{
    width: "30px!important",
    height: "30px!important",
   color:"white"
  }
}));
const ScrollToTopButton = () => {

  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: Add smooth scrolling behavior
    });
  };

  const handleScroll = () => {
    // Check if the user has scrolled down a certain amount (e.g., 200 pixels)
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Attach scroll event listener to show/hide the button
  window.addEventListener('scroll', handleScroll);

  return (
    <div>
      {isVisible && (
        <IconButton
          className={classes.scrollToTopButton}
          color="default"
          aria-label="Scroll to top"
          onClick={scrollToTop}
         
        >
          <ArrowUpwardIcon className={classes.scrollToTopButtonIcon}/>
        </IconButton>
      )}
    </div>
  );
};

export default ScrollToTopButton;
