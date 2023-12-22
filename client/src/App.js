import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import useStyles from "./styles.js";
import Auth from "./components/Auth/Auth";
// import { gapi } from "gapi-script";
import PostDetails from "./components/PostDetails/PostDetails";

const App = ({ theme }) => {
  const classes = useStyles();
  const Home1 = (props) => {
    return <Home theme={theme} {...props} />;
  };
  const Auth1 = () =>
    !user ? <Auth /> : <Navigate replace={true} to="/posts" />;

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar theme={theme} />
        <Routes>
          <Route
            path="/"
            exact
            element={<Navigate replace={true} to="/posts" />}
          />
          <Route path="/posts" exact element={<Home1 />} />
          <Route path="/posts/search" exact element={<Home1 />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
          <Route path="/auth" exact element={<Auth1 />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
