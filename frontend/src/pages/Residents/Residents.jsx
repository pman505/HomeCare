import { useLoaderData, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';


const Residents = () => {
  const initialResData = useLoaderData();
  const [residents, setResidents] = useState(initialResData);
  const navigate = useNavigate();
  let rowNum = 1
  return (
    <div>
      <table className='resident-table table table-full-width'>
        <thead>
          <tr className='tr-heading'>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th className='no-background td-align-right'>
                <button className='btn-add-res' id='add-resident-btn'
                onClick={() =>{
                    navigate('/residents/addResident');
                }}>
                    {/* <Plus size={18}/> */}
                    + Add Resident
                </button>
            </th>
          </tr>
        </thead>
        <tbody>
            {residents.map((resident) => {
                return (<tr className='tr-body' key={resident.id}>
                <td>{resident.firstName}</td>
                <td>{resident.lastName}</td>
                <td>{resident.dob}</td>
                <td className='td-align-left'>
                    <button className='btn-resident-list btn-info'
                    onClick={() =>{
                    navigate(`details/${resident.id}`);
                    }}>
                    Details
                    </button>
                    <button className='btn-resident-list btn-danger' onClick={() => {
                    fetch(`/api/Residents/DeleteResident?id=${resident.id}`, { method: 'DELETE' })
                    // residentsData = residentsData.filter(x => x.id !==resident.id);
                    setResidents(prev => prev.filter(p => p.id !== resident.id));
                }}>Remove</button>
                </td>
                </tr>)           
            })}
        </tbody>
      </table>
      
    </div>
  )
}
export default Residents


export const residentsLoader = async () => {
  const res = await fetch("/api/residents/getresidents", {
    credentials: "include"
  });

  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error("Not authenticated");
  }

  if (res.status === 403) {
    throw new Error("Not authorized");
  }

  return res.json(); 
}