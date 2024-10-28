import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./components/Home.tsx";
import About from "./components/About.tsx";
import Project from "./components/Project.tsx";
import Experience from "./components/Experience.tsx";

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;