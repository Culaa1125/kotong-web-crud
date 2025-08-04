// src/App.js
import './Style.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './Components/Home';
import Itemlist from './Components/Itemlist';
import Additem from './Components/Additem';
import Edititem from './Components/Edititem';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import Register from './Components/Register';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    // Update auth status saat route berubah
    setIsAuth(localStorage.getItem('isAuthenticated') === 'true');
  }, [location]);

  return (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
      {isAuth && <Sidebar />}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/itemlist" element={<PrivateRoute><Itemlist /></PrivateRoute>} />
          <Route path="/additem" element={<PrivateRoute><Additem /></PrivateRoute>} />
          <Route path="/edititem/:id" element={<PrivateRoute><Edititem /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
