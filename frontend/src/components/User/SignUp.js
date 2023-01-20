import React, { Fragment, useState, useEffect } from "react";
import "./SignUp.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useLocation ,Link} from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    RegisterName: "",
    email: "",
    password: "",
  });

  const { RegisterName, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    dispatch(register(RegisterName, email, password, avatar));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
              <h5>SignUp</h5>
              <div className="inputs">
                <form
                  className="signUpForm"
                  encType="multipart/form-data"
                  onSubmit={registerSubmit}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="RegisterName"
                    value={RegisterName}
                    onChange={registerDataChange}
                  />
                  <br />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                  <br />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <br />
                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>

                  <br />

                  <button type="submit">SignUp</button>
                </form>
                <p id="loginLink">
                  Already have account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SignUp;
