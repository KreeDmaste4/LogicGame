import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Maths from './pages/Math/Maths'
import Store from './pages/Store/Store'
import Pets from './pages/Pets/Pets'
import Quest from './pages/Quest/Quest'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/math' element={<Maths/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path='/pets' element={<Pets/>}/>
          <Route path='/quest' element={<Quest/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
