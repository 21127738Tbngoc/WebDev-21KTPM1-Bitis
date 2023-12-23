import React from 'react';

import './navbar.css';
import '../button/buttons.css';
import "./breadcrumb.css";
import '../Utils/searchbar';
const Breadcrumb = () => {
    return (
        <nav aria-label="breadcrumb" className="navbar-breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item breadcrumb-home"><a href="/">HOME</a></li>
                <li className="breadcrumb-item breadcrumb-element"><a href="#">CART</a></li>
                <li className="breadcrumb-item active breadcrumb-home breadcrumb-element" aria-current="page">Data</li>
            </ol>
        </nav>
    )
};

export default Breadcrumb;