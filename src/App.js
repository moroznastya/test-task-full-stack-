import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventForm from "./components/EventForm";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { getAuthToken } from "./services/AuthService";

function App() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthProvider value={authToken}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

