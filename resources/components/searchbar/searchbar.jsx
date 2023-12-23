import React from "react";

import './searchbar.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import color from "../Utils/color";

// import Color from "../Utils/color"


const Searchbar = () => {
    const color = require('../Utils/color')
    const searchTextStyle = {
        background: 'var(--scheme-background)',
        border: '1px solid var(--scheme-outline, #A1B096)'
    }
    return (
        // <!-- Search dropdown -->
        <div className="container-xxl  w-75">
            <div className="search-dropdown justify-content-center flex-column gap-3 position-relative">
                <div className="search-box">
                    <div className="d-flex flex-row g-4 d-flex">
                        <div className="input-group">
                            <div className="input-group-text">
                                <img src="/imgs/navbar/search-icon.svg" alt="Search"/>
                            </div>
                            <input type="text" className="form-control out" id="searchtext"
                                   placeholder="What are you searching for?"
                                   style={searchTextStyle}/>

                            <div className="input-group-text quit-search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path
                                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                                        fill="#46692A"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-4">
                    <div className=" d-inline-flex gap-1">
                        <p className="d-inline-flex" style={color.TonePrimary10}> Label</p>
                        <p className="d-inline-flex" style={color.ToneNeutral60}>Label</p>
                    </div>
                </div>
                <div className="row g-4">
                    <div className=" d-inline-flex gap-1">
                        <p className="d-inline-flex" style={color.TonePrimary10}> Label</p>
                        <p className="d-inline-flex" style={color.ToneNeutral60}>Label</p>
                    </div>
                </div>
                <div className="row g-4">
                    <div className=" d-inline-flex gap-1">
                        <p className="d-inline-flex" style={color.TonePrimary10}> Label</p>
                        <p className="d-inline-flex" style={color.ToneNeutral60}>Label</p>
                    </div>
                </div>

            </div>
        </div>
);
}
//
// const Searchbar = ` <div className="container-xxl  w-75">
// <div className="search-dropdown justify-content-center flex-column gap-3 position-relative">
//     <div className="search-box" onClick={(event) => {
//     event.stopPropagation()}}>
// <div className="d-flex flex-row g-4 d-flex">
//     <div className="input-group">
//     <div className="input-group-text">
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
// fill="none">
//     <path
// d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
// stroke="#46692A" strokeWidth="2" strokeLinecap="round"
// strokeLinejoin="round"/>
//     </svg>
// </div>
// <input type="text" className="form-control out" id="searchtext"
//        placeholder="Typing something"
//        style={searchTextStyle}/>
//
// <div className="input-group-text quit-search" onClick={toggleSearch}>
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
//          fill="none">
//         <path
//             d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
//             fill="#46692A"/>
//     </svg>
// </div>
// </div>
// </div>
// </div>
// <div className="row g-4">
//     <div className=" d-inline-flex gap-1">
//         <p className="d-inline-flex" style={color.TonePrimary10}> Label</p>
//         <p className="d-inline-flex" style={color.ToneNeutral60}>Label</p>
//     </div>
// </div>
// <div className="row g-4">
//     <div className=" d-inline-flex gap-1">
//         <p className="d-inline-flex" style={color.TonePrimary10}> Label</p>
//         <p className="d-inline-flex" style={color.ToneNeutral60}>Label</p>
//     </div>
// </div>
// <div className="row g-4">
//     <div className=" d-inline-flex gap-1">
//         <p className="d-inline-flex" style={color.TonePrimary10}> Label</p>
//         <p className="d-inline-flex" style={color.ToneNeutral60}>Label</p>
//     </div>
// </div>
//
// </div>
// </div>`

export default Searchbar