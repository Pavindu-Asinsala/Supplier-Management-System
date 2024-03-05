import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Navbaar.css';


const Navbaar = () => {
  return (
    <header>
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white " to="/" > Supplier Management</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div> 
      
      
    </nav>
    
  </header>
  
  

  );
}

export default Navbaar;
