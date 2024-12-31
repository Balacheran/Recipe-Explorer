import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AddRecipePage from './components/AddRecipePage';
import ItemDetail from './components/ItemDetail';
import { ToastContainer } from 'react-toastify';
import { AuthProvider, AuthContext } from './AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/recipe/:id" element={<ItemDetail />} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default App;
