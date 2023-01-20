import React, { Fragment, useState, useEffect } from "react";
import "./Login.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
    // eslint-disable-next-line
  }, [dispatch, error, alert, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="box-form">
            <div className="left">
              <div className="overlay">
                <h1>Welcome Back To Information Security</h1>
              </div>
            </div>

            <div className="right">
              <h5>Login</h5>
              <div className="inputs">
                <form className="signUpForm" onSubmit={loginSubmit}>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <br />
                  <br />

                  <div className="remember-me--forget-password">
                    <Link to="/password/forgot">forget password?</Link>
                  </div>

                  <br />

                  <button type="submit">Login</button>
                </form>
                <p id="loginLink">
                  Don't have Account? <Link to="/register">create account</Link>
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
