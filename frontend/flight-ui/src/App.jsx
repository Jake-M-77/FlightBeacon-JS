import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import { UserProvider } from './Context/UserContext'
import { AuthProvider } from './Context/AuthContext'


import Home from './pages/Home'
import SearchPanel from './pages/SearchPanel'
import LoginPage from './pages/LoginPage'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Departures from './pages/Departures'
import Arrivals from './pages/Arrivals'
import BoundingBox from './pages/BoundingBox'
import SignupPage from './pages/SignupPage'



function App() {

  return (
    <>
      <AuthProvider>
        <UserProvider>
      

          <Router>

            <Navbar />

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/about' element={<About />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/signup' element={<SignupPage />} />
 
              {/* Search panel parent route */}

              <Route path='/searchpanel' element={<SearchPanel />}>
              
              <Route path='departures' element={<Departures />} />
              <Route path='arrivals' element={<Arrivals />} />
              <Route path='boundingbox' element={<BoundingBox />} />
              
              
              </Route>


            </Routes>


          </Router>

            </UserProvider>
      </AuthProvider>


    </>
  )
}

export default App
