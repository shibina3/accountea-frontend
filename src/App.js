import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddIncome from "./pages/AddIncome";
import PageNotFound from "./pages/PageNotFound";
import "./assets/css/styles.css"
import AddExpenditure from "./pages/AddExpenditure";
import ViewExpenditure from "./pages/ViewExpenditure";
import ViewIncome from "./pages/ViewIncome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login /> } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/income/add" element={<AddIncome />} />
        <Route path="/income/view" element={<ViewIncome />} />
        <Route path="/expenditure/add" element={<AddExpenditure />} />
        <Route path="/expenditure/view" element={<ViewExpenditure />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
