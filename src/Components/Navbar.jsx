import React from 'react'
import {Outlet, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react'
import { contexData } from '../FirebaseContext/ConfigContext'

const NavbarMain = () => {

  const {Logout,userDetails,user}=useContext(contexData)
  const Navigate=useNavigate()

  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#" className='logo'>Book Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClickCapture={()=>Navigate("/")} className='Navlink'>Product</Nav.Link>
            { userDetails ===true ? <>
              <Nav.Link onClickCapture={()=>Navigate("/AddBooks")} className='Navlink'>Add Books</Nav.Link>  
              <Nav.Link onClickCapture={()=>Navigate("/BookCart")} className='Navlink'>Cart</Nav.Link>  
            </>:""
            }          
          </Nav>
          <Nav>
          { userDetails !==true ? <>
            <Nav.Link onClickCapture={()=>Navigate("/login")} className='Navlink'>Login</Nav.Link>
            <Nav.Link eventKey={2} onClickCapture={()=>Navigate("/Singup")} className='Navlink'>
             Sign Up
            </Nav.Link>
            </>:
            <>
            <h4 className='text-white fs-6  pt-2 pe-4'>{user.email}</h4>
            <button type="button" className="Bookbtn" onClickCapture={()=>Navigate("/")} onClick={()=>Logout()}>Logout</button>
            </>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
<Outlet/>
    </div>
  )
}

export default NavbarMain
