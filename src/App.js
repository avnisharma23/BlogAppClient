import React from "react";

import './App.css';
import { Routes, Route } from 'react-router-dom';
import BlogDetailsPage from '../src/pages/BlogDetail';
import BlogListPage from '../src/pages/BlogList';
import HomePage from '../src/pages/Home';
import LoginPage from '../src/pages/Login';
import NewBlogPage from '../src/pages/NewBlog';
import ProfilePage from '../src/pages/Profile';
import SignupPage from '../src/pages/Signup';



function App() {
  return (
    <div className="App">
     {/*  <SignupPage/> */}
      <Routes>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/blogdetails' element={<BlogDetailsPage/>}></Route>
        <Route path='/newblog' element={<NewBlogPage/>}></Route>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
