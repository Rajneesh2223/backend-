import React from 'react'
import {Link,  useNavigate} from 'react-router-dom'


const Nav = () => {
  const auth =localStorage.getItem('user');
  const navigate =useNavigate();
  const logout = () => {
    localStorage.clear();
   navigate('/signup')
  };
  

  
  return (
    <div>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Olj8XlvbC3Vige7Qo0XHd_Sdqx-IdrFRYJSeNsfKayOIqAWVu2UDOc0n6tqRBfvuQC8&usqp=CAU'
      alt='logo' className='logo'/>
      {auth  ?
      <ul className='nav-ul'>
      <li><Link to="/" >Products</Link></li>
      <li><Link to="/add" >Add Products</Link></li>
      <li><Link to="/update" >Update Products</Link></li>
      <li><Link to="/profile" >Profile</Link></li>
      <li><Link onClick={logout} to="/signup" >LogOut</Link></li>
      </ul>
      :<ul className='nav-ul nav-right'>
      <li><Link to="/signup" >Sign Up</Link></li>
      <li><Link to="/login" >Login </Link></li>
      </ul>
      }
    </div>
  )
}

export default Nav