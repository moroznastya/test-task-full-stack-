const express = require("express");
const { Event } = require("../models");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Створення події
router.post("/events", authMiddleware, async (req, res) => {
  try {
    const { title, date, description, priority } = req.body;
    const event = await Event.create({ title, date, description, priority, userId: req.userId });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Отримання всіх подій користувача
router.get("/events", authMiddleware, async (req, res) => {
  try {
    const events = await Event.findAll({ where: { userId: req.userId }, order: [["date", "ASC"]] });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримання однієї події за ID
router.get("/events/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!event) return res.status(404).json({ error: "Подію не знайдено" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Оновлення події
router.put("/events/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!event) return res.status(404).json({ error: "Подію не знайдено" });

    await event.update(req.body);
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Видалення події
router.delete("/events/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!event) return res.status(404).json({ error: "Подію не знайдено" });

    await event.destroy();
    res.json({ message: "Подія видалена" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
