import Login from './Components/Auth/Login'
import react ,{useState , useEffect} from 'react'
import api from './utils/api';
import { Route , Routes } from 'react-router-dom';
import Admin from './Components/DashboardAdmin/Admin'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(true)
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
    checkAuth()
  },[])
  return (
    <div className="">
      <Routes>
        <Route path='/' element={
          <Login/>
        }/>
        <Route path='/dashboardAdmin/*' element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
