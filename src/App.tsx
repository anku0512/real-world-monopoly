import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store, AppDispatch } from "./store";
import { checkAuthState } from "./store/slices/userSlice";
import Login from "./Login/Login";
import Game from "./components/Game";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

// App component that handles authentication state
const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check if user is already authenticated when app loads
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

// Main App component with Redux Provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
