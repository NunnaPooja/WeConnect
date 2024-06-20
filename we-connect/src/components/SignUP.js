import React, { useState,useContext} from 'react';
import logo from '../img/logo.png';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA('Invalid Email');
      return;
    } else if (!passRegex.test(password)) {
      notifyA(
        'Password must contain at least eight characters, including at least one number and one includes both lower and uppercase letters and special characters for example #,?,!'
      );
      return;
    }

    fetch('http://localhost:5000/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        userName: userName,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate('/signin');
         
        
        }
        console.log(data);
      })
      .catch((error) => {
        notifyA('An error occurred while signing up.');
        console.error('Error during signup:', error);
      });
  };

  return (
    <div className="signup">
      <div className="form-container">
        <div className="form">
          <img className="signUplogo" src={logo} alt="" />
          <p className="loginPara">Sign up to your account</p>

          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="loginPara" style={{ fontSize: '12px', margin: '3px 0px' }}>
            By Signing up, you agree to our terms, privacy policy and cookies policy.
          </p>
          <input type="submit" id="submit-btn" value="Sign Up" onClick={postData} />
        </div>
        <div className="form2">
          Already have an account? <Link to="/signin"><span style={{ color: 'blue', cursor: 'pointer' }}>Sign In</span></Link>
        </div>
      </div>
    </div>
  );
}

