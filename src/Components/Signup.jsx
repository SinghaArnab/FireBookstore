/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import { useContext } from 'react'
import { contexData } from '../FirebaseContext/ConfigContext'
import { NavLink,useNavigate} from 'react-router-dom'

const Signup = () => {

    const {RegisterUser,googleSignIN,userDetails}=useContext(contexData)

    const Navigate=useNavigate();
   
    const[input,setInput]=useState({
        username:"",
        passsword:"",
        cpassword:""
    })
    
    const handelChange=(e)=>{
        const {name,value}=e.target
        setInput((prev)=>{
           return {
            ...prev,[name]:value
           } 
        })   
    }   

    const formSubmit=(e)=>{
      e.preventDefault()
      if(input.passsword===input.cpassword){
        RegisterUser(input.username,input.passsword)
      }
      else{
        console.log("Password Not Matched");
      }
      console.log(input);
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
      <input type="email" name="username" placeholder="Enter username" onChange={handelChange}/>
      <input type="password" name="passsword" placeholder="Password"  onChange={handelChange}/>
      <input type="password" name="cpassword" placeholder="Conform password" onChange={handelChange}/>
      <button type='submit' className='loginbtn'>Sign Up</button>
    </form>
   
    <p className="or">
    </p>
    <div className="icons">
      <i className="fab fa-google" onClick={()=>googleSignIN()}></i>
      <i className="fab fa-github"></i>
      <i className="fab fa-facebook"></i>
    </div>
    <div className="not-member">
      Go to Login Page? <NavLink to="/login">Login</NavLink>
    </div>

      
    </div>
  )
}

export default Signup
