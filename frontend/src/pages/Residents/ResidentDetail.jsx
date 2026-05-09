import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import ResNavHandle from './ResNavHandle'
//https://localhost:7290/uploads/residents/1.jpeg
const ResidentDetail = () => {
  const navigate = useNavigate();
  const resident = useLoaderData();
  return (
    <div className='padding-sm padding-align-left resident-grid'>
        <div>
            <img className='res-img' src={'https://localhost:7290' + resident.photo}/>      
            <h4>Name: {resident.firstName} {resident.lastName}</h4>
        </div>

        <div>
            <ResNavHandle/>
            {/* <button
            onClick={() =>{
                navigate('chart');
            }}>
                Weight Chart
            </button>

            <button
            onClick={() =>{
                navigate();
            }}>
                Details
            </button> */}

            <div style={{marginTop: '20px'}}>
                <Outlet />
            </div>
        </div>
      
    </div>
  )
}
export default ResidentDetail

export const residentLoader = async ({params}) => {
  // return 0;
  const res = await fetch(`/api/residents/GetResident?id=${params.id}`);
  return res.json();
}