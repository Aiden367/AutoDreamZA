import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../../COMPONENTS/Navbar";
import CarInterior from "../../Images/Car_Interior_New_img.jpg";
import SecondNav from "../../../COMPONENTS/SecondNavbar"
import "../Styles/Electrical.css";
const Electrical: React.FC = () => {
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
                        <p>Consumables</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/CarMats')}>
                        <p>Electrical Accesories</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorHandles')}>
                        <p>Switches and Sensors</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorRubber')}>
                        <p>Started and Parts</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorRubber')}>
                        <p>Alternators and Parts</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorRubber')}>
                        <p>Electrical Cable and Sleeving</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorRubber')}>
                        <p>Trailer Parts</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorRubber')}>
                        <p>Globes and Fuses</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorRubber')}>
                        <p>Ignition System</p>
                        <img src={CarInterior}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Electrical;