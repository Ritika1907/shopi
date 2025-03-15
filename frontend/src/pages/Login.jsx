import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from "../util";

function Login(){
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {name, value} = e.target;
        console.log(name,value);
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        const { email, password} = loginInfo;
        if( !email || !password){
            return handleError("All fields are required!")
        }
        try{
            const url = "https://shopi-t63o.onrender.com/auth/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(loginInfo)
            })
            const result = await response.json();
            const {success, message,jwtToken, username ,error, email, cart, orders} = result;
      
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',username);
                localStorage.setItem('userEmail',email);
                localStorage.setItem('cart',JSON.stringify(cart));
                localStorage.setItem('orders',orders);
                setTimeout(()=>{
                    navigate('/home')
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
    console.log('Login info -->',loginInfo);
    

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4 p-5 border">
          <h1 className="text-center mb-4 ">Login</h1>
          <form onSubmit={handleLogin}>
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
                value={loginInfo.email}
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
                value={loginInfo.password}
              />
            </div>
            <div className="text-center mt-2 mb-3">
                 <button className="btn btn-primary mt-3">Login</button>
                 
            </div>
            <div className="text-center">
                 <span className="mt-5 text-center">Don't have an Account? <Link to="/signup">Signup</Link></span>
            </div>
          
          </form>
          <ToastContainer/>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}
export default Login;
