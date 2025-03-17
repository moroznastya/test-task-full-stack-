const cors = require("cors");

// Дозволити запити з фронтенду
app.use(cors({
  origin: "http://localhost/3002", // фронтенд на порту 3000
}));
