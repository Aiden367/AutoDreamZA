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
import Cables from './FRONTEND/Pages/AccesoriesPages/CarInteriorPages/Cables'
import CarMats from './FRONTEND/Pages/AccesoriesPages/CarInteriorPages/CarMats'
import DoorHandles from './FRONTEND/Pages/AccesoriesPages/CarInteriorPages/DoorHandles'
import DoorRubber from './FRONTEND/Pages/AccesoriesPages/CarInteriorPages/DoorRubber'
import GasSprings from './FRONTEND/Pages/AccesoriesPages/CarInteriorPages/GasSprings'
import PedalPads from './FRONTEND/Pages/AccesoriesPages/CarInteriorPages/PedalPads'
import SeatCovers from './FRONTEND/Pages/AccesoriesPages/CarInteriorPages/SeatCovers'
import SteeringLock from './FRONTEND/Pages/AccesoriesPages/CarInteriorPages/SteeringLock'
import Audio from './FRONTEND/Pages/AudioPages/Audio'
import BatteriesAndBatteryProducts from './FRONTEND/Pages/BatteriesAndBatteryProducts/Batteries'
import ElectricalPage from './FRONTEND/Pages/ElectricalPages/Electrical'
import EnginePage from './FRONTEND/Pages/EnginePages/Engine'
import JacksPage from './FRONTEND/Pages/JacksPages/Jacks'
import ServicesPage from './FRONTEND/Pages/ServicesPages/Services'
import ToolsPages from './FRONTEND/Pages/ToolsPages/Tools'
import TyresAndRimsPages from './FRONTEND/Pages/TyresAndRimsPages/TyresAndRims'
import CarInterior from './FRONTEND/Pages/AccesoriesPages/CarInteriorPages/CarInterior'
import { FilterProvider } from './COMPONENTS/FilterContext';
import RoofRacks from './FRONTEND/Pages/AccesoriesPages/RoofRacks';
import Rims from './FRONTEND/Pages/AccesoriesPages/Rims';
import { UserProvider } from './BACKEND/context/UserContext'; // adjust path if needed
import CartPage from './FRONTEND/Pages/PaymentPages/CartPage';
import CheckoutPage from './FRONTEND/Pages/PaymentPages/Checkout';
import ProfilePage from './FRONTEND/Pages/ProfilePages/Profile';
import PurchasesPage from './FRONTEND/Pages/ProfilePages/PurchasesPage';
import AccountSettingsPage from './FRONTEND/Pages/ProfilePages/AccountSettingsPage';
import ChangePasswordPage from './FRONTEND/Pages/ProfilePages/ResetPasswordPage';
import { CartProvider } from './BACKEND/context/CartContext';

const App: React.FC = () => {
  return (
    
    
    <Router>
      {/* Wrap the Routes in FilterProvider */}
      <UserProvider>
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
          <Route path="/RoofRacks" element={<RoofRacks />} />
          <Route path="/Rims" element={<Rims />} />
    
          <Route path="/Accessory" element={<Accessories />} />
          <Route path="/Audio" element={<Audio />} />
          <Route path="/Batteries" element={<BatteriesAndBatteryProducts />} />
          <Route path="/Electrical" element={<ElectricalPage />} />
          <Route path="/Engine" element={<EnginePage />} />
          <Route path="/Jacks" element={<JacksPage />} />
          <Route path="/Services" element={<ServicesPage />} />
          <Route path="/Tools" element={<ToolsPages />} />
          <Route path="/TyresAndRims" element={<TyresAndRimsPages />} />

          <Route path="/CarInterior" element={<CarInterior />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/Checkout" element={<CheckoutPage />} />
          <Route path="/Profile/:userId" element={<ProfilePage />} />
          <Route path="/Purchases" element={<PurchasesPage />} />
          <Route path="/AccountSettings" element={<AccountSettingsPage />} />
          <Route path="/ResetPassword" element={<ChangePasswordPage />} />
        </Routes>
      </FilterProvider>
      </UserProvider>
    </Router>
    
  );
};

export default App;
