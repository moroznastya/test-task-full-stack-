import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEventById, createEvent, updateEvent } from "../services/EventService";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Container, Typography, CircularProgress } from "@mui/material";

function EventForm({ onCreate, setShowForm }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Завантаження події при редагуванні
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchEventById(id)
        .then((data) => {
          if (data) {
            setTitle(data.title || "");
            setDate(data.date || "");
            setDescription(data.description || "");
            setPriority(data.priority || "normal");
          }
        })
        .catch(() => setError("Не вдалося завантажити подію"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const eventData = { title, date, description, priority };

    try {
        if (id) {
          await updateEvent(id, eventData);
          navigate("/events");
        } else {
          await createEvent(eventData);
          onCreate(eventData); // Викликаємо onCreate, щоб оновити список подій
          navigate("/events");
        }
      } catch (err) {
        setError("Помилка збереження події. Спробуйте ще раз.");
      } finally {
        setLoading(false);
        setShowForm(false); // Приховуємо форму після створення події
      }
    };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {id ? "Редагувати подію" : "Створити подію"}
      </Typography>

      {loading && <CircularProgress />}

      {error && <Typography variant="body1" color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Назва"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Дата та час"
          variant="outlined"
          fullWidth
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Опис"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Важливість</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Важливість"
          >
            <MenuItem value="normal">Звичайна</MenuItem>
            <MenuItem value="important">Важлива</MenuItem>
            <MenuItem value="critical">Критична</MenuItem>
          </Select>
        </FormControl>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit" 
          fullWidth 
          disabled={loading}
        >
          {loading ? "Обробка..." : id ? "Зберегти зміни" : "Створити подію"}
        </Button>
      </form>
    </Container>
  );
}

export default EventForm;
