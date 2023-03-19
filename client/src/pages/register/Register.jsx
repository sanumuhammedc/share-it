import "./register.css";
import { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";



export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };

      try {
        await axios.post("auth/register",user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }

    }
  };


  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Share It</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Share It.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick} >
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required type="email" ref={email} className="loginInput" />
            <input placeholder="Password" required type="password" minLength="6" ref={password} className="loginInput" />
            <input placeholder="Password Again" required type="password" ref={passwordAgain} className="loginInput" />
            <button type="submit" className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}