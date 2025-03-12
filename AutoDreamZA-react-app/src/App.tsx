import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './FRONTEND/Pages/Home';
import About from './FRONTEND/Pages/About';
import Products from './FRONTEND/Pages/Product';
import Contact from './FRONTEND/Pages/Contact';
import Upload from './FRONTEND/Pages/Upload';
import Login from './FRONTEND/Pages/Login';
import Register from './FRONTEND/Pages/Register';
import Accessories from './FRONTEND/Pages/AccesoriesPages/Accessory';
import Cables from './FRONTEND/Pages/AccesoriesPages/Cables'
import CarMats from './FRONTEND/Pages/AccesoriesPages/CarMats'
import DoorHandles from './FRONTEND/Pages/AccesoriesPages/DoorHandles'
import DoorRubber from './FRONTEND/Pages/AccesoriesPages/DoorRubber'
import GasSprings from './FRONTEND/Pages/AccesoriesPages/GasSprings'
import PedalPads from './FRONTEND/Pages/AccesoriesPages/PedalPads'
import SeatCovers from './FRONTEND/Pages/AccesoriesPages/SeatCovers'
import SteeringLock from './FRONTEND/Pages/AccesoriesPages/SteeringLock'
import Audio from './FRONTEND/Pages/AudioPages/Audio'
import BatteriesAndBatteryProducts from './FRONTEND/Pages/BatteriesAndBatteryProducts/Batteries'
import ElectricalPage from './FRONTEND/Pages/ElectricalPages/Electrical'
import EnginePage from './FRONTEND/Pages/EnginePages/Engine'
import JacksPage from './FRONTEND/Pages/JacksPages/Jacks'
import ServicesPage from './FRONTEND/Pages/ServicesPages/Services'
import ToolsPages from './FRONTEND/Pages/ToolsPages/Tools'
import TyresAndRimsPages from './FRONTEND/Pages/TyresAndRimsPages/TyresAndRims'
import { FilterProvider } from './COMPONENTS/FilterContext';
//import Register from './FRONTEND/Pages/Register';

const App: React.FC = () => {
  return (
    <Router>
      {/* Wrap the Routes in FilterProvider */}
      <FilterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          
          <Route path="/Cables" element={<Cables />} />
          <Route path="/CarMats" element={<CarMats />} />
          <Route path="/DoorHandles" element={<DoorHandles />} />
          <Route path="/DoorRubber" element={<DoorRubber />} />
          <Route path="/GasSprings" element={<GasSprings />} />
          <Route path="/PedalPads" element={<PedalPads />} />
          <Route path="/SeatCovers" element={<SeatCovers />} />
          <Route path="/SteeringLock" element={<SteeringLock />} />
    
          <Route path="/Accessory" element={<Accessories />} />
          <Route path="/Audio" element={<Audio />} />
          <Route path="/Batteries" element={<BatteriesAndBatteryProducts />} />
          <Route path="/Electrical" element={<ElectricalPage />} />
          <Route path="/Engine" element={<EnginePage />} />
          <Route path="/Jacks" element={<JacksPage />} />
          <Route path="/Services" element={<ServicesPage />} />
          <Route path="/Tools" element={<ToolsPages />} />
          <Route path="/TyresAndRims" element={<TyresAndRimsPages />} />
        </Routes>
      </FilterProvider>
    </Router>
  );
};

export default App;
