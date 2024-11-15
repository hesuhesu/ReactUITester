import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./routes/Home.tsx";
import About from "./routes/About.tsx";
import Project from "./routes/Project.tsx";
import Diary from "./routes/Diary.tsx";
import QuillEditor from "./routes/QuillEditor.tsx";

// npm install axios sweetalert2 react-paginate react-router-dom
// npm install katex quill-image-resize quill-image-drop-module quill-image-drop-and-paste --save

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/quilleditor" element={<QuillEditor/>}/>
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;