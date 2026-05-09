import { Outlet } from 'react-router-dom'

const ResidentLayout = () => {
  return (
    <div style={{marginTop: '20px'}}>
      <Outlet />
    </div>
  )
}
export default ResidentLayout