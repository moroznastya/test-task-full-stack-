import { useEffect, useState } from "react";
import { fetchEvents, deleteEvent } from "../services/EventService";
import EventForm from "../components/EventForm";
import EventItem from "../components/EventItem";
import { Container, Typography, Button, FormControl, Select, MenuItem, InputLabel, Box } from "@mui/material";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { parse } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Локалізатор для календаря
const localizer = momentLocalizer(require('moment'));

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filterImportance, setFilterImportance] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false); // Стан для відображення форми
  const [showCalendar, setShowCalendar] = useState(false); // Стан для перемикання між календарем і списком

  // Завантаження подій
  useEffect(() => {
    const getData = async () => {
      const data = await fetchEvents();
      console.log("Отримані події:", data);
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        console.error("Очікував масив, але отримав:", data);
      }
    };
    getData();
  }, []);

  // Обробник фільтрації важливості
  const handleFilterChange = (e) => {
    setFilterImportance(e.target.value);
  };

  // Обробник пошуку
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Фільтрація та пошук подій
  const filteredEvents = events.filter((event) => {
    const matchesImportance = filterImportance ? event.priority === filterImportance : true;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesImportance && matchesSearch;
  });

  // Обробник видалення події
  const handleDeleteEvent = async (id) => {
    await deleteEvent(id);
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  // Перетворення подій у формат, сумісний з календарем
  const formattedEvents = filteredEvents.map((event) => ({
    title: event.title,
    start: new Date(event.date), // Використовуємо Date для правильного формату
    end: new Date(event.date), // Якщо подія має час, його можна додати, наприклад, через: new Date(event.date + " 23:59:59")
    priority: event.priority,
    description: event.description,
  }));

  return (
    <Container 
      maxWidth="md" 
      sx={{ backgroundColor: "#f5f5dc", padding: "20px", minHeight: "100vh" }} // Світло-бежевий фон
    >
      {/* Заголовок з гарним шрифтом і по центру */}
      <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: "Arial, sans-serif", marginTop: "20px" }}>
        Події
      </Typography>

      {/* Кнопка для створення події */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm((prev) => !prev)} // Перемикає видимість форми
        sx={{ marginBottom: 3 }}
      >
        {showForm ? "Сховати форму" : "Створити подію"}
      </Button>

      {/* Якщо showForm = true, показуємо форму */}
      {showForm && <EventForm onCreate={handleCreateEvent} setShowForm={setShowForm} />}

      {/* Кнопка для перемикання між календарем і списком */}
      <Button
        variant="outlined"
        onClick={() => setShowCalendar((prev) => !prev)} // Перемикає між календарем і списком
        sx={{ marginBottom: 3 }}
      >
        {showCalendar ? "Переглянути список" : "Переглянути календар"}
      </Button>

      {/* Відступ перед фільтрацією та пошуком */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Важливість</InputLabel>
          <Select
            value={filterImportance}
            onChange={handleFilterChange}
            label="Важливість"
          >
            <MenuItem value="">Усі</MenuItem>
            <MenuItem value="critical">Висока</MenuItem>
            <MenuItem value="important">Середня</MenuItem>
            <MenuItem value="normal">Низька</MenuItem>
          </Select>
        </FormControl>

        {/* Пошук за ключовими словами */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Пошук за ключовими словами"
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            minWidth: "200px",
          }}
        />
      </Box>

      {/* Відображення подій в залежності від стану showCalendar */}
      {showCalendar ? (
        <Box mb={3}>
          <Calendar
            localizer={localizer}
            events={formattedEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </Box>
      ) : (
        <ul>
          {filteredEvents.map((event) => (
            <div key={event.id} style={{ marginBottom: "20px" }}>
              <EventItem event={event} onDelete={handleDeleteEvent} />
            </div>
          ))}
        </ul>
      )}

      {/* Якщо немає подій */}
      {filteredEvents.length === 0 && !showCalendar && (
        <Typography variant="body1" align="center">Немає подій для відображення.</Typography>
      )}
    </Container>
  );
};

export default EventsPage;



