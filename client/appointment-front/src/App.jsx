import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import React from "react";
import ReactDOM from "react-dom/client";
import './App.css'
import Doctors from "./components/Doctors";
import Footer from "./components/Footer";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerRegister from "./pages/customer/CustomerRegister";
import Sidebar from "./components/Sidebar";
import CustomerProfile from "./pages/customer/CustomerProfile";
import CustomerAppointment from "./pages/customer/CustomerAppointment";
import CustomerHistory from "./pages/customer/CustomerHistory";

const router = createBrowserRouter([
  {
    path:"/",
    element:
    <div>
    <Navbar /> 
      <Home />
    <Footer />
    </div>
  },
  {
    path:'/doctors',
    element: <div><Doctors /></div>
  },
  {
    path:'/patients/login',
    element: <div>
      <Navbar />
      <CustomerLogin />
      </div>
  },
  {
    path:'/patients/register',
    element: <div> 
      <Navbar /> 
      <CustomerRegister />
      </div>
  },
  {
    path:'/customer/profile',
    element:
    <div>
      <Navbar />
      <div className="customer-body">
        <div className="sidebar"><Sidebar  /></div>
        <div className="main-content"><CustomerProfile /></div>
        </div>
        <Footer />
      
    </div>

  },
  {
    path:'/customer/appointment',
    element: 
    <div>
      <Navbar />
      <div className="customer-body">
        <div className="sidebar"><Sidebar  /></div>
        <div className="main-content"><CustomerAppointment /></div>
        </div>
        <Footer />
    </div>
  },{
    path: '/customer/history',
    element:
    <div>
      <Navbar />
      <div className="customer-body">
        <div className="sidebar"><Sidebar  /></div>
        <div className="main-content"><CustomerHistory /></div>
        </div>
        <Footer />
    </div>
  }

  
])


function App() {
  
  return (
   <div className='full'>
    
<RouterProvider router={router}/>
   </div>
  )
}

export default App
