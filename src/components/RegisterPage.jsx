import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Замінили useHistory на useNavigate
import { TextField, Button, Typography, Box, Container } from "@mui/material";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Використовуємо useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/login"); // Редирект на сторінку входу після реєстрації
    } catch (error) {
      setError("Помилка при реєстрації. Спробуйте знову.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: "20px", fontFamily: "Arial, sans-serif" }}>
        Реєстрація
      </Typography>
      
      <form onSubmit={handleRegister}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
          />
          
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
          />

          {error && <Typography variant="body2" color="error" align="center">{error}</Typography>}
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "10px", marginTop: "20px" }}
          >
            Зареєструватися
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default RegisterPage;
