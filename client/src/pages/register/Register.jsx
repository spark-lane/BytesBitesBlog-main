import "./register.css";
import {Link} from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function Register() {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  // To see the error
  const [error,setError] = useState("");

  const handleSubmit = async (e)=>{
    setError(false);
    e.preventDefault();
      try{
        const res = await axios.post("/auth/register",{
          username ,
          email,
          password,
        });
        res.data && window.location.replace("/login")
      } catch (err) {
        setError(true);
      }
  };
  return (
    <div className ="register">
        <span className="registerTitle">Register</span>
        <form className ="registerForm" onSubmit={handleSubmit}>
            <label>UserName</label>
            <input type="text" className="registerInput" placeholder="Enter Your username..." onChange={e=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="text" className="registerInput" placeholder="Enter Your email..." onChange={e=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" className="registerInput" placeholder="Enter Your password" onChange={e=>setPassword(e.target.value)}/>
            <button className="registerButton" type="submit">
              Register
            </button>
        </form>
            <button className="registerLoginButton">
              <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span style={{color:"red", marginTop:"10px"}}>Something went Wrong!</span>}
    </div>
  )
}  
