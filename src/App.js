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
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

function App() {
 
  return (
    <div className="App">
     {/*  <SignupPage/> */}

     <Navbar/>
      <Routes>
        
        <Route path='/signup' element={<IsAnon><SignupPage/></IsAnon>}></Route>
        <Route path='/login' element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path='/blogdetails/:blogId' element={<IsPrivate><BlogDetail/></IsPrivate>}></Route>
        <Route path='/newblog' element={<IsPrivate><NewBlogPage/></IsPrivate>}></Route>
        <Route path='/bloglist' element={<IsPrivate><BlogListPage /></IsPrivate>}></Route>

      </Routes>
    </div>
  );
}

export default App;
