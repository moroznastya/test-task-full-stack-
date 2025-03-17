import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

// Отримуємо токен з localStorage
export const getAuthToken = () => {
  return localStorage.getItem("token"); // Токен має бути збережений в localStorage
};

// Функція для отримання подій
export const fetchEvents = async () => {
  console.log(localStorage.getItem('token'));

  try {
    const response = await axios.get(API_URL, {
      

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні подій:", error);
  }
};

// Функція для отримання події за ID
export const fetchEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні події:", error);
  }
};

// Функція для створення події
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, eventData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(localStorage.getItem('token'));
    return response.data;
  } catch (error) {
    console.log(localStorage.getItem('token'));
    console.error("Помилка при створенні події:", error);
  }
};

// Функція для оновлення події
export const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, eventData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при оновленні події:", error);
  }
};

// Функція для видалення події
export const deleteEvent = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (error) {
    console.error("Помилка при видаленні події:", error);
  }
};
