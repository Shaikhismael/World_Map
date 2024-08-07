import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './App.css'
import CityList from './components/CityList'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesContextProvider, useCitiesContext } from './context/CitiesContext'
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <CitiesContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage/>} />
            <Route path='login' element={<Login/>} />
            <Route path='product' element={<Product/>} />
            <Route path='pricing' element={<Pricing/>} />
            <Route path='app' 
              element={
              <ProtectedRoute>
                <AppLayout/>
              </ProtectedRoute>
              }
            >
              <Route 
                index 
                element={<Navigate replace to='cities' />} 
              />
              <Route 
                path='cities' 
                element={
                <CityList 
                />} 
              />
              <Route 
                path='cities/:id' 
                element={<City/>}
              />
              <Route 
                path='countries' 
                element={
                <CountryList 
                />}
              />
              <Route path='form' element={<Form/>} />
            </Route>
            <Route path='*' element={<PageNotFound/>} />
          </Routes>
        </BrowserRouter>
      </CitiesContextProvider>
    </AuthProvider>
  )
}

export default App
