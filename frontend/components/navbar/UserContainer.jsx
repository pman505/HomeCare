import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import {AppContext} from '../../src/App'
import { Navigate, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;


const UserContainer = () => {
  // const user = {
  //   name: 'ash'
  // }
  // const logout = () => {
  //   console.log('logout');
  // }

  const navigate = useNavigate();


  const{user, logout, userSetter} = useContext(AppContext);
  const logoutButton = async () => {
     try {
    await fetch(`${API_URL}/api/accounts/logout`, {
      method: "POST",
      credentials: "include", // important: send cookies
    });

    userSetter(null);
    // setIsAuthenticated(false);

    //Redirect or show logged-out UI
    navigate('/');
  } catch (err) {
    console.error("Logout failed", err);
  }       
  }

  return (
    <div className='user-container'>
      {user ? (
        <>
          <p>Hi {user}</p>
          <button type='button' className='btn' onClick={logoutButton}>
            Log Out
          </button>
        </>
      ) : (
        <NavLink to='/login' className='btn btn-login'>Login</NavLink>
      )}
    </div>
  );
}

export default UserContainer;
