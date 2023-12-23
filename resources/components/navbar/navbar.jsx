import React, {useState} from 'react';

import './navbar.css'
import '../button/buttons.css'
import '../Utils/searchbar'
import '../searchbar/searchbar.css'

import Searchbar from "../searchbar/searchbar"
import CartModal from "./cart_modal"
import DropdownContent from "./dropDownContent";

const Navbar = () => {

    const searchTextStyle = {
        background: 'var(--scheme-background)', border: '1px solid var(--scheme-outline, #A1B096)'
    }
    const color = require('../Utils/color');
    let isOpenMenu = false;
    let isSearching = false;

    function toggleMenu() {
        const menu = document.querySelector('.navbar-menu')
        const openIconMenu = document.querySelector('.navbar .menu-open-btn img');

        if (isOpenMenu === false) {
            openIconMenu.src = '/imgs/navbar/close-icon.svg'
            menu.classList.add('open-menu');
            isOpenMenu = true;
        } else {
            openIconMenu.src = '/imgs/navbar/menu-icon.svg'
            menu.classList.remove('open-menu');
            isOpenMenu = false
        }
    }

    function openCartModal() {
        const cartModal = document.querySelector('.navbar-cart')
        if (cartModal.classList.value.search("open-cart-modal") === -1)
        {
            cartModal.classList.add('open-cart-modal');
        } else
        {
            cartModal.classList.remove('open-cart-modal');
        }
        console.log(cartModal.classList.value)
        console.log(cartModal.classList.value.search("open-cart-modal"))
        // cartModal.classList.add('open-cart-modal');
    }

    function closeCartModal() {
        const cartModal = document.querySelector('.navbar-cart')
        cartModal.classList.remove('open-cart-modal');
        console.log(cartModal.classList.value)
    }

    function toggleSearch() {
        // const searchLabel = document.querySelector('.search-label')
        const searchDropdown = document.querySelector('.search-dropdown')

        if (isSearching === false) {
            // searchLabel.classList.remove('disable-search-label');
            searchDropdown.classList.remove('open-search-dropdown');
            isSearching = true;
        } else {
            // searchLabel.classList.add('disable-search-label');
            searchDropdown.classList.add('open-search-dropdown');
            isSearching = false
        }
    }

    const dropDownContent0 = (
    <ul className="dropdown-content" id="dropdownContent">
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
                <span>Sign Up
                </span>
            </a>
        </li>
    </ul>
    )

    return (
        <div>
        {/*<!-- Navbar --> */}

            <div className="container-xxl navbar">
                <div className="d-flex flex-row g-4 align-items-center justify-content-between">


                    {/*<!-- Menu & Search --> */}
                    <div>
                        <h5 className="menu-open-btn">
                            <img src="/imgs/navbar/menu-icon.svg" alt="Menu" onClick={toggleMenu}/>
                        </h5>
                    </div>
                    <div className="search-label flex-row" onClick={toggleSearch}>
                        <img className="mx-2 my-2" src="/imgs/navbar/search-icon.svg" alt="Search"/>
                        <p className="navbar-text my-3">SEARCH</p>
                    </div>
                </div>

                {/*<!-- Logo --> */}
                <div className="d-flex flex-row g-4 align-items-center">
                    <a href="/home">
                    <img src="/imgs/navbar/logo.svg" alt="Fitment"/>
                    </a>
                </div>

                {/*<!-- Cart & Account --> */}
                <div className="d-flex align-items-center">

                    <div className="d-flex flex-row align-items-center">
                        <h5 className="cart-modal-open-btn">
                            <img src="/imgs/navbar/cart-icon.svg" alt="Cart" onClick={openCartModal}/>
                        </h5>
                        <p className="button2 mx-2 align-items-center">BAG
                        </p>
                        <div className="navbar-cart-num">
                            <p className="support align-items-center">0
                            </p>
                        </div>
                    </div>
                    <DropdownContent/>
                    </div>
                </div>


        <div className="container-fluid fixed-top navbar-container justify-content-between position-relative"
             onClick={(event) => {
                 event.stopPropagation()
             }}>
            {/*// <!-- Search dropdown -->*/}
            <Searchbar/>
            {/*<!-- Cart Modal --> */}
            <CartModal/>
        </div>
        {/*<!-- Megamenu --> */}
        <div className="container-fluid navbar-menu">
            <div className="container-xxl d-flex">
                <div className="col-xxl-7">
                    <div className="d-flex">
                        <div className="col-xxl-3">
                            <d5>ABOUT
                            </d5>
                            <ul className="flex-column mt-3">
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">ABOUT US
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">OUR PARTNERS
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">OUR DESIGNERS
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xxl-3">
                            <d5>SHOP
                            </d5>
                            <ul className="flex-column mt-3">
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">SHOP ALL
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">LIVING ROOM
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">BEDROOM
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">DINING ROOM
                                    </a>
                                </li>
                                <li className="p1 mb-4">
                                    <a href="#" className="slide-border">BATH ROOM
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xxl-3 ">
                            <d5>SUPPORT
                            </d5>
                            <ul className="flex-column mt-3">
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">FAQS
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">CONTACT
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">WARRANTY POLICY
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="col-xxl-3">
                            <d5>SERVICE
                            </d5>
                            <ul className="flex-column mt-3">
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">MAINTENANCE
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">ASSEMBLY
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">UPHOLSTERY
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">REPAIRS
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xxl-3 ">
                            <d5>MEDIA
                            </d5>
                            <ul className="flex-column mt-3">
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">ARTICLES
                                    </a>
                                </li>
                                <li className="p1 mb-2">
                                    <a href="#" className="slide-border">COMMUNITY
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xxl-3 ">
                            <p className="label1">Follow Fitment at
                            </p>
                            <ul className="d-flex flex-row mt-3">
                                <li>
                                    <div className="menu-contact-container">
                                        <a href="#">
                                            <button className="outline-i-btn i-btn-md">
                                                <img src="/imgs/navbar/facebook-logo.svg" alt="facebook-logo"/>
                                            </button>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="menu-contact-container">
                                        <a href="#">
                                            <button className="outline-i-btn i-btn-md">
                                                <img src="/imgs/navbar/twitter-logo.svg" alt="twitter-logo"/>
                                            </button>
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="menu-contact-container">
                                        <a href="#">
                                            <button className="outline-i-btn i-btn-md">
                                                <img src="/imgs/navbar/instagram-logo.svg" alt="instagram-logo"/>
                                            </button>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/*<!-- Menu img --> */}
                <div className="col-xxl-5 menu-img">
                    <div>
                        <img src="/imgs/navbar/navimg.jpg" alt="" className="menu-img"/>
                        <a href="#" className="button1 view-more-btn">View more</a>
                    </div>
                </div>
            </div>
        </div>
    </div>)
};


export default Navbar;
