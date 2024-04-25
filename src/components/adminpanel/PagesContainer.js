import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "@mui/material"; // Change import
import { makeStyles } from "@mui/styles"; // Change import
import clsx from "clsx";
import AdminUsers from "./AdminUsers";
import AdminDesignations from "./AdminDesignations";
import AdminFoldersPath from "./AdminFoldersPath";
import AdminUsersHistory from "./AdminUsersHistory";
const useStyles = makeStyles((theme) => ({
    mainContainer: {

    },
}));

const PagesContainer = (props) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <Container maxWidth={false} disableGutters={true}>
            {(location.pathname === "/" || 
            location.pathname === "/adminpanel" || 
            location.pathname === "/adminusers") && <AdminUsers />}
            {location.pathname === "/admindesignations" && <AdminDesignations/>}
            {location.pathname === "/adminfolderspath" && <AdminFoldersPath/>}
            {location.pathname === "/adminusershistory" && <AdminUsersHistory/>}

        </Container>
    );
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(PagesContainer);
