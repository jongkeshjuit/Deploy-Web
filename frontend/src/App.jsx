import React from 'react'
import { FaUser } from "react-icons/fa";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout';

const App = () => {
  return (
    <BrowserRouter>
    {
      /*
      www.wukudada.com/home
      www.wukudada.com/products
      www.wukudada.com/cart
      .......
      */
    }
      <Routes>
        <Route path='/' element={<UserLayout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App