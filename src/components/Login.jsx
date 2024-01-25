import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { AuthContext } from "../contexts/AuthContext";
import homesvg from '../assets/homesvg.svg'
import google from '../assets/google.svg'


const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { user, login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const { username, password } = values;
      const res = await login(username, password);
      if (res.error || res.data) {
        if (res.data && res.data.detail) {
          setError(res.data.detail);
        }
      } else {
        navigate("/");
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
 
  return (
    <div className="login-main">
      <div className='login-top'>

        <div className='login-home-icon'>
          <img src={homesvg} alt="home"/>
          <span className='login-home-icon-text'>Home</span>
        </div>
      </div>
    <form onSubmit={formik.handleSubmit}>
      <div className="raised-div">
        <div className="raised-div-top login-top">
          <div className='welcome-text'>
            <img src="" alt="" />
              <p>
                👋Welcome back
              </p>
              <span>Login to your account</span>
          </div>
          <div className="google-login modal-buttons">
          <span className="login-google-icon">
                <img src={google} alt="google icon" />
            </span>
            <button className="add">
                  Continue with Google
            </button>
       
          </div> 
          <div className="raised-div-horizontal">
            <hr className=""/>
          </div>
          </div>
       
        <div className="login-inputs">
          <div className="email-field-modal">
            <label htmlFor="email">Email Address</label>
            <span className="email-label-space">

            </span>
            <input type="text" 
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username" 
            placeholder="E.g john@gmail.com"
            />
          </div>
          
          <div className="name-field-modal">
              <span className="name-label-space">
                  
              </span>
              <label htmlFor="password">Password</label>
              <span className="name-label-space">
                  
              </span>
              <input 
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password" 
              name="password" 
              placeholder="Password"
              />
          </div>
          </div>
          
          <p className="forgot-password">Forgot Password?</p>
          <div className="modal-buttons login-button">
              <button className="login add" type="submit">
                {formik.isSubmitting ? "Logging in..." : "Log in"}

              </button>
          </div>
        
          
        </div>
      </form>
      
    </div>
  );
}

export default Login
