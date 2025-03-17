const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const JWT_SECRET = "your_secret_key"; // Не забудь змінити на свій секретний ключ

// Реєстрація
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "Користувача зареєстровано" });
  } catch (error) {
    res.status(500).json({ message: "Помилка при реєстрації", error });
  }
};

// Вхід
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Користувач не знайдений" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Невірний пароль" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Помилка при вході", error });
  }
};
