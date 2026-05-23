import { useState, createContext, useEffect } from 'react'
import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
// import { Navigate, useNavigate } from 'react-router-dom';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './Style.css';

// import Navbar from '../components/navbar/Index'
import RootLayout from './layout/RootLayout'
import ResidentsLayout from './pages/Residents/ResidentLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Residents, { residentsLoader } from './pages/Residents/Residents'
import ResidentDetail, {residentLoader} from './pages/Residents/ResidentDetail'
import Chart, {weightHistoryLoader} from './pages/Residents/Chart'
import AddResident from './pages/Residents/AddResident';

const API_URL = import.meta.env.VITE_API_URL;

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
  const logout = () => {
    setUser(null);
  }
  const userSetter = (user) => {
    setUser(user);
  }

  useEffect(() => {
    fetch(`${API_URL}/api/accounts/credcheck`, 
        {
            credentials: "include"
        })
        .then(res => {
            if(res.ok){
                // setIsLoggedIn(true);
                return res.json();
                // alert(res.userFN);
                // console.log(data.userFN);
                // userSetter(data.userFN);
                // navigate('/');
            }
            else {
                // setIsLoggedIn(false);
                throw new Error("Not authenticated");
            }
        })
        .then (data => {
            // console.log(data.userFN);
            userSetter(data.userFN);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => setLoading(false));
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>} />
        <Route path='residents' element={<ResidentsLayout/>} loader={residentsLoader}>
          <Route index element = {<Residents/>} loader={residentsLoader} />
          <Route path='details/:id' element = {<ResidentDetail/>} loader={residentLoader} >
            <Route index element={<h1>More Details</h1>}/>
            <Route path='chart' element={<Chart/>} loader={weightHistoryLoader}/>
          </Route>
          <Route path='addResident' element={<AddResident/>} />
        </Route>
        <Route path='login' element={<Login/>} />
      </Route>
    )
  )

  if(loading) {
    return <div>Loading ...</div>
  }

  return (
    <AppContext.Provider value={{user, logout, userSetter}} >
      <RouterProvider router={router}/>
      {/* <Navbar/>
      <div className='route-container'>
        <Routes>
          <Route path='/' element={<h1>HOME</h1>} />
          <Route path='/about' element={<h1>ABOUT</h1>} />
        </Routes>
      </div> */}
    </AppContext.Provider>
  )
}

export default App


// const [message, setMessage] = useState('');
  // useEffect(() => {
  //   fetch('/api/test/getuser')
  //   .then(res => {
  //     console.log(res)
  //     return res.json()
  //   })
  //   .then(data => console.log(data.firstName))
  //   .catch(err => setMessage('Error: ' + err.message));
    
  // }, []);