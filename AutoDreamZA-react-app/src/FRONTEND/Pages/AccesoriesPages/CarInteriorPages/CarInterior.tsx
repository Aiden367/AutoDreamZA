import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../../../COMPONENTS/Navbar";
import CarInteriorer from "../../../Images/Car_Interior_New_img.jpg";
import SecondNav from "../../../../COMPONENTS/SecondNavbar"
import "../../Styles/Accessories.css";
const CarInteriors: React.FC = () => {
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
                    <div className="category" onClick={() => handleNavigation('/CarMats')}>
                        <p>Car Mats</p>
                        <img src={CarInteriorer}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorHandles')}>
                        <p>Door Handles</p>
                        <img src={CarInteriorer}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/DoorRubber')}>
                        <p>Door Rubber</p>
                        <img src={CarInteriorer}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/GasSprings')}>
                        <p>Gas Springs</p>
                        <img src={CarInteriorer}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/PedalPads')}>
                        <p>Pedal Pads</p>
                        <img src={CarInteriorer}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/SeatCovers')}>
                        <p>Seat Covers</p>
                        <img src={CarInteriorer}></img>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/SteeringLock')}>
                        <p>Steering Lock</p>
                        <img src={CarInteriorer}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarInteriors;
