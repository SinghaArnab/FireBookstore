/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { contexData } from '../FirebaseContext/ConfigContext'

const Login = () => {
    const {googleSignIN,userDetails,singinUser}=useContext(contexData)
    const Navigate=useNavigate();

    const[input,setInput]=useState({
        username:"",
        passsword:""
    })

    const handelChange=(e)=>{
        const {name,value}=e.target
        setInput(()=>{
           return {
            ...input,[name]:value
           } 
        })   
    }

    const formSubmit=(e)=>{
        e.preventDefault()
        console.log(input);
        singinUser(input.username,input.passsword) 
    }

    useEffect(() => {
        if(userDetails===true){
            Navigate('/')
        }    
    }, [userDetails])
    

  return (
  <div className="wrapper">
    <h1>Hello Again!</h1>
    <p>Welcome back you've <br/> been missed!</p>
    <form onSubmit={formSubmit}>
      <input type="email" name='username' placeholder="Enter username" onChange={handelChange}/>
      <input type="password" name='passsword' placeholder="Password" onChange={handelChange}/>
      <button className='loginbtn'>Login</button>
    </form>
   
    <p className="or">
    </p>
    <div className="icons">
      <i className="fab fa-google" onClick={()=>googleSignIN()}></i>
      <i className="fab fa-github"></i>
      <i className="fab fa-facebook"></i>
    </div>
    <div className="not-member">
      Not a member? <NavLink to="/Singup">Register Now</NavLink>
    </div>

      
    </div>
  )
}

export default Login
