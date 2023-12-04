import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import NotFound from "./pages/notFound";
import SignUpInItems from "./components/signupinitems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpInItems />} />
        <Route path="home" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
