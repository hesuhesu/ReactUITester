import React from 'react';
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./routes/Home.tsx";
import About from "./routes/About.tsx";
import Project from "./routes/Project.tsx";
import Diary from "./routes/Diary.tsx";
import QuillEditor from "./routes/QuillEditor.tsx";
import AuthPage from "./routes/AuthPage.tsx";
import PrivateRoute from './utils/PrivateRoute.js';

// npm install axios sweetalert2 react-paginate react-router-dom
// npm install katex quill-image-resize quill-image-drop-module quill-image-drop-and-paste --save

const Layout = () => {
  return (
    <>
      <Header/>
        <Outlet/>
      <Footer/>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<Project />} />
            <Route path="/diary" element={<Diary />} />
            <Route element={<PrivateRoute/>}>
              <Route path="/quilleditor" element={<QuillEditor />} />
            </Route>
          </Route>
          <Route path="/authpage" element={<AuthPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;