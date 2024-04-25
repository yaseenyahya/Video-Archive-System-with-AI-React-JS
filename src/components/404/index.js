import React from "react";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";
import Lottie from "react-lottie"; // Import Lottie
import animationData from "./404.json"; // Import your 404.json animation file
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex!important",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column"
  },
  backButton: {
    fontSize: "17px!important",

    
  },
}));

const NotFound = (props) => {
  const classes = useStyles();

  const navigate = useNavigate();

  // Lottie options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container
        maxWidth="md"
        disableGutters={true}
        className={classes.container}
      >

        <Lottie options={lottieOptions} height={300} width={300} />
        <Button className={classes.backButton} variant="text" onClick={() => {
          navigate("/");
        }}>Back to home</Button>
      </Container>
    </motion.div>
  );
};


export default NotFound;
