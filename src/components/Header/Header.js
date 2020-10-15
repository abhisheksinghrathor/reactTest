import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header = ({cartLength}) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
            <img src={logo} style={{width: '10%', height: '10%'}}/> Vodafone Shop</NavLink>
                <div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-brand" to={"/"} style={{color:'white'}}><i className="fa fa-shopping-cart mr-2"
                                                                          aria-hidden="true" />Cart</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


const mapStateToProps = (state) => {
  return {
      cartLength: 0
  }
};

export default connect(mapStateToProps, null)(Header);


/*
*                         <li className="nav-item active">
                            <a className="nav-link" href="#">Home
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
* */