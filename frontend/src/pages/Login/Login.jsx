import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {AppContext} from '../../App'

const Login = () => {

    const [hasError, setHasError] = useState(false);

    const {user, logout, userSetter} = useContext(AppContext);

    const [formUser, setFormUser] = useState({
        userName: '',
        password: ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (e) => 
        setFormUser({...formUser, [e.target.name]: e.target.value});

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");

        try {
            const response = await fetch('/api/accounts/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formUser),
                credentials: "include"
            });
            if(!response.ok) {
                // alert("Login Failed");
                setHasError(true);
            }
            else {
                const data = await response.json();
                // alert('check')
                // console.log(data.userFN);
                userSetter(data.userFN);
                navigate('/');
            }
        }
        catch (err) {
        setError('Something went wrong');
        }
        
    };


  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='form-label' htmlFor='userNameInput'>User Name</label>
            <input id='userNameInput' className='form-input' required
              value={formUser.userName}  
              name='userName' 
              type='text' 
              onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label className='form-label' htmlFor='passwordInput'>Password</label>
            <input id='passwordInput'  className='form-input' required
              value={formUser.password}
              name='password' 
              type='password' 
              onChange={handleChange} />
          </div>
          <span hidden={!hasError} className='validation-message'>Incorrect Uername or Password</span>
          <div className='form-group '>
            <button className='form-submit-btn' type='submit'>Sign In</button>
          </div>
      </form>
    </div>
  )
}
export default Login