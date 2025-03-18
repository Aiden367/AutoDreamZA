import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../../COMPONENTS/Navbar";
import CarInterior from "../../Images/Car_Interior_New_img.jpg";
import SecondNav from "../../../COMPONENTS/SecondNavbar"
import "../Styles/Batteries.css";
const TyresAndRims: React.FC = () => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };
    return (
        <>
            <SecondNav />
            <Nav />
            <div className="categories-wrapper">
                <h1>Categories</h1>
                <div className="categories-container" >
                    <div className="category" onClick={() => handleNavigation('/Cables')}>
                        <p>Tyres</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/CarMats')}>
                        <p>Rims</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorHandles')}>
                        <p>Tyre Valve Cap</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorRubber')}>
                        <p>Wheel Cover</p>
                        <img src={CarInterior}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TyresAndRims;