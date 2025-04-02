import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import Search from "./pages/Search";
import { Context, server } from "./main";
import FloatingNavbar from "./components/Navbar";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Add from "./pages/Add";
import "./styles/app.scss";

function App() {
  const { user, setUser, setIsAuthenticated, setLoading, isAuthenticated } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser({});
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Router>
      {isAuthenticated && <FloatingNavbar image={user.avatar.url} />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Add />
          </LocalizationProvider>
        ) : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={isAuthenticated ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Search />
          </LocalizationProvider>
        ) : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
