// src/services/AuthService.js

// Функція для отримання токена з localStorage
export const getAuthToken = () => {
    return localStorage.getItem("token");
  };
  
  // Функція для збереження токена в localStorage
  export const setAuthToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  // Функція для видалення токена з localStorage
  export const removeAuthToken = () => {
    localStorage.removeItem("token");
  };
  