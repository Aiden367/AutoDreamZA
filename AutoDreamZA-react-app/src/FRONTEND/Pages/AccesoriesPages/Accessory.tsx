import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../../COMPONENTS/Navbar";
import CarInterior from "../../Images/Car_Interior_New_img.jpg";
const Accessory: React.FC = () => {
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };
    return (
        <>
            <Nav />
            <div className="Categories" >
                <h1>Popular Categories</h1>
                <div className="Category" onClick={() => handleNavigation('/Cables')}>
                    <p>Car Interior</p>
                    <img src={CarInterior}></img>
                </div>
                <div className="Category" onClick={() => handleNavigation('/CarMats')}>
                    <p>General Accessories</p>
                    <img src={CarInterior}></img>
                </div>
                <div className="Category" onClick={() => handleNavigation('/DoorHandles')}>
                    <p>Wheel Covers</p>
                    <img src={CarInterior}></img>
                </div>
                <div className="Category" onClick={() => handleNavigation('/DoorRubber')}>
                    <p>License Plate and Disc Holder</p>
                    <img src={CarInterior}></img>
                </div>
                <div className="Category" onClick={() => handleNavigation('/GasSprings')}>
                    <p>License Plate and Disc Holder</p>
                    <img src={CarInterior}></img>
                </div>
                <div className="Category" onClick={() => handleNavigation('/PedalPads')}>
                    <p>Sun Visor</p>
                    <img src={CarInterior}></img>
                </div>
                <div className="Category" onClick={() => handleNavigation('/SeatCovers')}>
                    <p>Trailer Hitch</p>
                    <img src={CarInterior}></img>
                </div>
                <div className="Category" onClick={() => handleNavigation('/SteeringLock')}>
                    <p>Rims</p>
                    <img src={CarInterior}></img>
                </div>
                <div className="Category" onClick={() => handleNavigation('/CarInterior')}>
                    <p>Steering Wheel Covers</p>
                    <img src={CarInterior}></img>
                </div>
            </div>
        </>
    )
}

export default Accessory;