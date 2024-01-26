import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Login } from './components/Login';
import { HomePage } from './components/Homepage';
import { SignIn } from './components/SignIn';
import { Create } from './components/Create';
import { Video } from './components/Video';
import AuthRoute from './components/AuthRoute';
import { NotificationsPannel } from './components/NotificationsPannel';
import { NotFound } from './components/NotFound';
declare global {
  interface Window {
    $userName: string;
    $userEmail: string;
    $userPic: string;
  }
}
function App() {
  
  return (
    <div className="App">
      <AuthRoute><Header/></AuthRoute>
      <AuthRoute><NotificationsPannel/></AuthRoute>

      {/* <BrowserRouter> */}
        <HashRouter >
      
        <Routes>
          {/* <Route path="/" element={}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route> */}
          <Route path="/" element={<AuthRoute><HomePage/></AuthRoute>} />
          <Route path="/login" element={<AuthRoute><Login/></AuthRoute>} />
          <Route path="/signin" element={<AuthRoute><SignIn/></AuthRoute>} />
          <Route path="/create" element={<AuthRoute><Create/></AuthRoute>} />
          {/* <Route path="/video/:id" element={<AuthRoute><Video/></AuthRoute>} /> */}
          <Route path="/video/:id" element={<AuthRoute><Video/></AuthRoute>} />
          <Route path="*" element={<NotFound/>} />

        </Routes>
        </HashRouter>

      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
