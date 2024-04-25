import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import NotFound from "./components/404";
import ProtectedRoute from "./router/ProtectedRoute";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import { ApolloProvider } from "@apollo/client";
import { DialogProvider } from "./components/context/DialogContext";

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#FF5733', // Orange color
    },
    // Customize other palette colors if needed
  },
});


function App(props) {
  return (
    <AnimatePresence exitBeforeEnter>
      <DialogProvider>
        <BrowserRouter>
          <Provider store={props.reduxStore}>
            <ThemeProvider theme={customTheme}>
              <ApolloProvider client={props.apolloClient}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route  path={"/"} element={<ProtectedRoute />} />
                  <Route  path={"/userpanel"} element={<ProtectedRoute />} />
                  <Route  path={"/adminpanel"} element={<ProtectedRoute />} />
                  <Route  path={"/adminusers"} element={<ProtectedRoute />} />
                  <Route  path={"/admindesignations"} element={<ProtectedRoute />} />
                  <Route  path={"/adminfolderspath"} element={<ProtectedRoute />} />
                  <Route  path={"/adminusershistory"} element={<ProtectedRoute />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </ApolloProvider>
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      </DialogProvider>
    </AnimatePresence>
  );
}

export default App;
