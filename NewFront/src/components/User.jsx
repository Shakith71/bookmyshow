import React, { useState } from 'react';
import axios from 'axios';
import '../style/User.css'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();

  const notify = (word) => {toast.error(`${word}!!!`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce
    });}

    const notifyLogin = (word) => {toast.error(`${word}!!!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
      });}

  const initialFormData = {
    email: '',
    password: '',
    confirm: '',
  };
  const initialFormDataLogin = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formDataLogin, setFormDataLogin] = useState(initialFormDataLogin);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleChangeLogin = (e) => {
    setFormDataLogin({
      ...formDataLogin,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (formData.email === ""){
      notify("Please Enter the Email");
      return;
    }
    if (formData.password !== formData.confirm) {
      notify("Please Check the password");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users', formData);
      console.log(res)
      alert('Form submitted successfully');

      setIsSignup(false);

      setFormData(initialFormData); // Reset the form data
      // navigate(`/users/${res.data}`)
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (formDataLogin.email === "" || formDataLogin.password === ""){
      notify("Please Enter the Details");
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/userLogin', formDataLogin);
      console.log(res.data)
      if (res.data.suc){
      setFormData(initialFormDataLogin); // Reset the form data
      navigate(`/users/${res.data.userId}`)
      }
      else{
        notifyLogin(res.data.message)
        return;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form');
    }
  };
  
  const [isSignup, setIsSignup] = useState(false);

  const handleSignupClick = () => {
    setFormData(initialFormData);
    setFormData(initialFormDataLogin);  
    setIsSignup(true);
    
  };

  const handleLoginClick = () => {
    setFormData(initialFormData);
    setFormData(initialFormDataLogin); 
    setIsSignup(false);
    
  };

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    setFormData(initialFormData);
    setFormData(initialFormDataLogin); 
    setIsSignup(true);
  };

  return (
    <div className="user">
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${isSignup ? 'signup' : 'login'}`}>
          {isSignup ? 'Signup Form' : 'Login Form'}
        </div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked={!isSignup} readOnly />
          <input type="radio" name="slide" id="signup" checked={isSignup} readOnly />
          <label htmlFor="login" className="slide login" onClick={handleLoginClick}>
            Login
          </label>
          <label htmlFor="signup" className="slide signup" onClick={handleSignupClick}>
            Signup
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner" style={{ marginLeft: isSignup ? '-100%' : '0%' }}>
          <form action="#" className="login">
            <div className="field">
              <input type="text" name='email' value={formDataLogin.email} placeholder="Email Address" onChange={handleChangeLogin} required />
            </div>
            <div className="field">
              <input type="password" name='password' value={formDataLogin.password} placeholder="Password" onChange={handleChangeLogin} required />
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" onClick={handleSubmitLogin} />
            </div>
            <div className="signup-link">
              Not a member? <a href="#" onClick={handleSignupLinkClick}>Signup now</a>
            </div>
          </form>
          <form action="#" className="signup">
            <div className="field">
              <input type="text" name='email' placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="field">
              <input type="password" name='password'  placeholder="Password" value={formData.password} onChange={handleChange}  required />
            </div>
            <div className="field">
              <input type="password" name='confirm'  placeholder="Confirm password" value={formData.confirm}  onChange={handleChange} required />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Signup" onClick={handleSubmit}/>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
    </div>
  );
};

export default User;
