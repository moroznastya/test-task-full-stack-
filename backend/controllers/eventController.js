const Event = require('../models/event'); // Модель для події

// Створення нової події
exports.createEvent = async (req, res) => {
  try {
    const { name, date, location, description } = req.body;
    
    const newEvent = await Event.create({
      name,
      date,
      location,
      description
    });

    res.status(201).json({
      message: 'Подію створено!',
      event: newEvent
    });
  } catch (error) {
    res.status(500).json({
      message: 'Помилка при створенні події',
      error: error.message
    });
  }
};

// Отримання всіх подій
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json({
      events
    });
  } catch (error) {
    res.status(500).json({
      message: 'Помилка при отриманні подій',
      error: error.message
    });
  }
};

// Отримання події за ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Подію не знайдено' });
    }
    res.status(200).json({
      event
    });
  } catch (error) {
    res.status(500).json({
      message: 'Помилка при отриманні події',
      error: error.message
    });
  }
};

// Оновлення події за ID
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Подію не знайдено' });
    }

    const { name, date, location, description } = req.body;

    event.name = name || event.name;
    event.date = date || event.date;
    event.location = location || event.location;
    event.description = description || event.description;

    await event.save();

    res.status(200).json({
      message: 'Подію оновлено!',
      event
    });
  } catch (error) {
    res.status(500).json({
      message: 'Помилка при оновленні події',
      error: error.message
    });
  }
};

// Видалення події за ID
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Подію не знайдено' });
    }

    await event.destroy();

    res.status(200).json({
      message: 'Подію видалено!'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Помилка при видаленні події',
      error: error.message
    });
  }
};
