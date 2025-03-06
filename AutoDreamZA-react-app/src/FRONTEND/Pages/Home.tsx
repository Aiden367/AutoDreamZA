import React, { useState, useEffect } from 'react';
import Nav from "../../COMPONENTS/Navbar"
import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
    const navigate = useNavigate();
    return(
        <>
        <Nav/>
        <div>
            <h1> Hi this is home</h1>
        </div>
        </>
    )
}
export default Home;