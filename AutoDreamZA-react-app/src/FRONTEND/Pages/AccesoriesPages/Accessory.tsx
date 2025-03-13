import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../../COMPONENTS/Navbar";
import CarInterior from "../../Images/Car_Interior_New_img.jpg";
import SecondNav from "../../../COMPONENTS/SecondNavbar"
import "../Styles/Accessories.css";
const Accessory: React.FC = () => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };
    return (
        <>
            <SecondNav />
            <Nav />
            <div className="categories-wrapper">
                <div className="categories-container" >
                    <div className="category" onClick={() => handleNavigation('/Cables')}>
                        <p>Car Interior</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/CarMats')}>
                        <p>General Accessories</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorHandles')}>
                        <p>Wheel Covers</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorRubber')}>
                        <p>License Plate and Disc Holder</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/GasSprings')}>
                        <p>License Plate and Disc Holder</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/PedalPads')}>
                        <p>Sun Visor</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/SeatCovers')}>
                        <p>Trailer Hitch</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/SteeringLock')}>
                        <p>Rims</p>
                        <img src={CarInterior}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/CarInterior')}>
                        <p>Steering Wheel Covers</p>
                        <img src={CarInterior}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Accessory;