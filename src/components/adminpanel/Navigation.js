import React from "react";
import { connect } from "react-redux";
import { Container, Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles((theme) => ({
  linksContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none!important",
    },
    marginRight: 20,
  },
  linksButton: {
    background: "#505050!important",
    border: "0px!important",
    marginRight: "5px!important",
    width: "130px!important",
    color: "white!important",
    fontWeight: "bold!important",
    textTransform: "capitalize!important",
    "&:hover": {
      background: "white!important",
      color: "#505050!important",
      border: "1px solid #505050!important",
    },
  },
  linksButtonSelected: {
    background: "white!important",
    color: "#505050!important",
    border: "1px solid #505050!important",
  },
}));

const pages = [
  { text: "Users", link: "adminusers" },
  { text: "Designations", link: "admindesignations" },
  { text: "Folders Path", link: "adminfolderspath" },
  { text: "Users History", link: "adminusershistory" },
];

const NavigationList = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container disableGutters={true} maxWidth="lg">
      <Box
        className={classes.linksContainer}
        display="flex"
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
      >
        {pages.map((page) => (
          <Button
            variant="outlined"
            key={page.text}
            onClick={() => {
              navigate("/" + page.link);
            }}
            className={clsx(classes.linksButton, {
              [classes.linksButtonSelected]:
                ((location.pathname === "/" || 
                location.pathname === "/adminpanel" ||
                  location.pathname === "/adminusers") &&
                    page.link === "adminusers" ||
                  (location.pathname === "/admindesignations" &&
                    page.link === "admindesignations") ||
                  (location.pathname === "/adminfolderspath" &&
                    page.link === "adminfolderspath") ||
                  (location.pathname === "/adminusershistory" &&
                    page.link === "adminusershistory")),
            })}
          >
            {page.text}
          </Button>
        ))}
      </Box>
    </Container>
  );
};

export default connect(null)(NavigationList);
