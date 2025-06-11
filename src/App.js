import Login from './Components/Auth/Login';
import react, { useState, useEffect } from 'react';
import api from './utils/api';
import { Route, Routes } from 'react-router-dom';
import Admin from './Components/DashboardAdmin/Admin';
import { Navigate } from 'react-router-dom';
import Pasien from './Components/DashboardPasien/Pasien';
import Dokter from './Components/DashboardDokter/Dokter';
import Apoteker from './Components/DashboardApoteker/Apoteker';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await api.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn('Unauthorized, removing token');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          console.error('Other error:', err);
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === 'admin' ? (
              <Navigate to="/dashboardAdmin" />
            ) : isAuthenticated && user?.role === 'pasien' ? (
              <Navigate to="/dashboardPasien" />
            ) : isAuthenticated && user?.role === 'dokter' ? (
              <Navigate to="/dashboardDokter" />
            ) : isAuthenticated && user?.role === 'apoteker' ? (
              <Navigate to="/dashboardApoteker" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
            )
          }
        />

        <Route path="/dashboardAdmin/*" element={isAuthenticated && user?.role === 'admin' ? <Admin setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to={'/'} />} />
        <Route path="/dashboardPasien/*" element={isAuthenticated && user?.role === 'pasien' ? <Pasien setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/dashboardDokter/*" element={isAuthenticated && user?.role === 'dokter' ? <Dokter setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/dashboardApoteker/*" element={isAuthenticated && user?.role === 'apoteker' ? <Apoteker setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
