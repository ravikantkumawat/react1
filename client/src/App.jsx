import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>            
          }></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
