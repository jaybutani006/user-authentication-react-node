import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useEffect} from 'react'
import Footer from "./components/layout/Footer/Footer";
import webFont from 'webfontloader'
import React from 'react'
import Login from './components/User/Login';
import store from './store';
import { loadUser } from './actions/userAction';
import { useSelector} from 'react-redux'
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import UserOptions from "./components/layout/Header/UserOptions";
import SignUp from './components/User/SignUp';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  // const navigate = useNavigate();

  useEffect(() => {
    webFont.load({
      google: {
        families : ['Roboto','Droid Sans', 'Chilanka']
      }
    })
    store.dispatch(loadUser())
  }, [])
  return (
    <Router>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        {isAuthenticated && (
          <Route exact path="/" element={<Profile />}></Route>
        )}
        {!isAuthenticated && <Route exact path="/" element={<Login />} />}
        {isAuthenticated && (
          <Route exact path="/account" element={<Profile />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/account" element={<Login />} />
        )}
        {isAuthenticated && (
          <Route exact path="/me/update" element={<UpdateProfile />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/me/update" element={<Login />} />
        )}
        {isAuthenticated && (
          <Route exact path="/password/update" element={<UpdatePassword />} />
        )}
        {!isAuthenticated && (
          <Route exact path="/password/update" element={<Login />} />
        )}
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<SignUp />}></Route>
        <Route
          exact
          path="/password/forgot"
          element={<ForgotPassword />}
        ></Route>
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;