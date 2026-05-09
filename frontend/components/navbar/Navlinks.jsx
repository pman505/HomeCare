import { Link, NavLink } from 'react-router-dom';

const navlinks = () => {
  return (
    <div className='flex justify-center flex-row items-center'>
      <div className='flex mx-2.5'> {/*Links*/}
        <div className='flex flex-1 flex-auto px-1.5'>
          <NavLink to='/' 
          className={({isActive}) => {
            let classes = "link-tab w-full text-center outline-link rounded-full px-1.5 py-1.5 capitalize whitespace-nowrap";
            if (isActive) {
              classes += " active-link-tab";
            }
            return classes;
          }}
          >HOME</NavLink>
        </div>
        <div className='flex flex-1 flex-auto px-1.5'>
          <NavLink  to='/residents' 
          className={({isActive}) => {
            let classes = "link-tab w-full text-center outline-link rounded-full px-1.5 py-1.5 capitalize whitespace-nowrap";
            if (isActive) {
              classes += " active-link-tab";
            }
            return classes;
          }}
          >RESIDENTS</NavLink>
        </div>
      </div>

      {/*<ul className='nav-links'>
        <NavLink to='/'><li>HOME</li></NavLink>
        <NavLink to='/residents'><li>RESIDENTS</li></NavLink>
      </ul>*/}
    </div>
    
  );
}

export default navlinks;