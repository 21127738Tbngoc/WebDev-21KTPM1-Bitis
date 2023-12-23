import React from 'react';

import './navbar.css'
import '../button/buttons.css'

const dropDownContent = () => {
    return (
        <div className="dropdown" onMouseEnter={() => {
            document.getElementById("dropdownContent").style.display = "block";}}>
            <div className="d-flex flex-row align-items-center" id="dropdownToggle">
                <h5 className="mx-2">
                    <img src="/imgs/navbar/profile-icon.svg" alt="Profile"/>
                </h5>
                <p className="button2 align-items-center" id="dropdownButton">ACCOUNT
                </p>
            </div>
            <ul className="dropdown-content" id="dropdownContent" style={{zIndex: 9999}}
                onMouseLeave={() => {
                    document.getElementById("dropdownContent").style.display = "none";
                }}>
                {/*<!-- Login --> */}
                <li>
                    <a href="/login" id="signIn" className="list-item">
                        <img src="/imgs/navbar/login.svg" alt="login"/>
                        <span>Sign In</span>
                    </a>
                </li>
                {/*<!-- Sign Up --> */}
                <li>
                    <a href="/signup" id="signUp" className="list-item">
                        <img src="/imgs/navbar/signup.svg" alt="login"/>
                        <span>Sign Up</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default dropDownContent;
