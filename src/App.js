import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { FlashMessageProvider } from "./contexts/FlashMessageContext";
import Dashboard from "./pages/Dashboard";
import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BaseLayout from "./layouts/BaseLayout";
import EditList from "./pages/EditList"; 
import ViewList from "./pages/ViewList";
import Favorites from "./pages/Favorites"; 




const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <FlashMessageProvider>
        <Router>
        <Routes>
            {/* Páginas sin Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Páginas con BaseLayout */}
            <Route path="/" element={<BaseLayout><PublicHome /></BaseLayout>} />
            <Route path="/dashboard" element={<PrivateRoute><BaseLayout><Dashboard /></BaseLayout></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><BaseLayout><Profile /></BaseLayout></PrivateRoute>} />


            <Route path="/favorites" element={<PrivateRoute><BaseLayout><Favorites /></BaseLayout></PrivateRoute>} />

            
            {/* Listas */}
            <Route path="/edit/:id" element={<PrivateRoute><BaseLayout><EditList /></BaseLayout></PrivateRoute>} />
            <Route path="/view/:id" element={<BaseLayout><ViewList /></BaseLayout>} />


          </Routes>
        </Router>
      </FlashMessageProvider>
    </AuthProvider>
  );
}

export default App;
