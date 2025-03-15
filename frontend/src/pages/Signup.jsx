import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from "../util";

function Signup() {
    const [signupInfo,setSignupInfo] = useState({
        username:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {name, value} = e.target;
        console.log(name,value);
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    const handleSignup = async (e)=>{
        e.preventDefault();
        const {username, email, password} = signupInfo;
        if(!username || !email || !password){
            return handleError("All fields are required!")
        }
        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details)
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        }catch(err){
            handleError(err);
        }


    }
    console.log('signup info -->',signupInfo);
    

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4 p-5 border">
          <h1 className="text-center mb-4 ">SignUp</h1>
          <form onSubmit={handleSignup}>
            <div className="mt-3">
              <label htmlFor="username" className="form-label">
                Enter username:
              </label>
              <input
                type="text"
                className="form-control"
                autoFocus
                id="username"
                name="username"
                placeholder="username"
                onChange={handleChange}
                value={signupInfo.username}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="email" className="form-label">
                Enter email:
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="abc@gmail.com"
                onChange={handleChange}
                value={signupInfo.email}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="form-label">
                Enter password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                value={signupInfo.password}
              />
            </div>
            <div className="text-center mt-2 mb-3">
                 <button className="btn btn-primary mt-3">Signup</button>
                 
            </div>
            <div className="text-center">
                 <span className="mt-5 text-center">Already have an Account? <Link to="/login">Login</Link></span>
            </div>
          
          </form>
          <ToastContainer/>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}
export default Signup;
