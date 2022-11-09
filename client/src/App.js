import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container} from "@mui/material";

import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Container>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
        </Router>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
