import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Income from "./pages/Income";
import PageNotFound from "./pages/PageNotFound";
import "./assets/css/styles.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login /> } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/income/add" element={<Income />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
