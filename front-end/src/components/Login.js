import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const navigate =useNavigate();
    useEffect(() =>{
        const auth =localStorage.getItem('user');
        if(auth)
        navigate("/")
    },[])
    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
          
          result = await result.json();
          console.warn(result);
    
          if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/"); // Redirect to the home page
          } else {
            alert("Please enter the correct details");
          }
      };
      

  return (
    <div className='login'>
         <input className='inputBox'type='text' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
         <input className='inputBox' type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
         <button onClick={handleLogin} className='appButton' type='button '>Login</button>


    </div>
  )
}

export default Login