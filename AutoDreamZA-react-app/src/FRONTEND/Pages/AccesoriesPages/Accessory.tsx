import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from "../../../COMPONENTS/Navbar";
import CarInterior from "../../Images/Car_Interior_New_img.jpg";
import CarMat from "../../Images/Car_mat_image.jpg";
import RoofRack from "../../Images/Roof_Rack_image.jpg";
import SeatCover from "../../Images/Seat_cover_iimage.jpg";
import Rims from "../../Images/Rims_iimage.jpeg";
import Hitches from "../../Images/Hitches_image.jpg";
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
            <div className="categories-wrapper-accesories">
               
                <div className="categories-container" >
                    <div className="category" onClick={() => handleNavigation('/CarMats')}>
                        <img src={CarMat}></img>
                        <p>Car Mats</p>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/RoofRacks')}>
                        <img src={RoofRack}></img>
                        <p>Roof Racks</p>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/SeatCovers')}>
                        <img src={SeatCover}></img>
                        <p>Seat Covers</p>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/Rims')}>
                        <img src={Rims}></img>
                        <p>Rims</p>
                    </div>
                     <div className="category" onClick={() => handleNavigation('/Trailer hitches')}>
                        <img src={Hitches}></img>
                        <p>Rims</p>
                    </div>
                    <div className="category" onClick={() => handleNavigation('/Trailer hitches')}>
                        <img src={Hitches}></img>
                        <p>Rims</p>
                    </div>
                  
                </div>
            </div>
        </>
    )
}

export default Accessory;