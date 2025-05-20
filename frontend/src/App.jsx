import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';

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
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home/>} />
        </Route>
        <Route>
          {/* admin layout */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App