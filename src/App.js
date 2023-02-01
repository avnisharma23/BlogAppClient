import React from "react";

import './App.css';
import { Routes, Route } from 'react-router-dom';
import BlogDetail from '../src/pages/BlogDetail';
import BlogListPage from '../src/pages/BlogList';
/* import HomePage from '../src/pages/Home'; */
import LoginPage from '../src/pages/Login';
import NewBlogPage from '../src/pages/NewBlog';

import SignupPage from '../src/pages/Signup';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App" >
     {/*  <SignupPage/> */}

     <Navbar/>
      <Routes>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/blogdetails/:blogId' element={<BlogDetail/>}></Route>
        <Route path='/newblog' element={<NewBlogPage/>}></Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/bloglist' element={<BlogListPage />}></Route>

      </Routes>
    </div>
  );
}

export default App;
