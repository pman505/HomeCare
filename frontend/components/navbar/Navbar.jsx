import { useState } from "react";
import Navlinks from './Navlinks';
import UserContainer from './UserContainer'
// import './Style.css';

const navbar = () => {
  return (
    <nav className='navbar flex w-full myb-2'>
      <div className='flex items-center w-full gap-0'>
        <div className='flex flex-row'>
          <h2 className='flex head-margin'>FS1</h2>
        </div>
        <Navlinks/>
        <UserContainer/>
      </div>
    </nav>
  );
}

export default navbar;