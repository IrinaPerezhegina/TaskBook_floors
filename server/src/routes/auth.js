import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Получение данных авторизованного пользователя
router.get("/me", authMiddleware, async (req, res) => {
  const authUser = await prisma.user.findUnique({ where: { id: req.userId } });

  res.json({
    user: {
      id: authUser.id,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      middleName: authUser.middleName,
      login: authUser.login,
      managerId: authUser.managerId,
    },
  });
});

// Регистрация пользователя
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, middleName, login, password, managerId } =
      req.body;

    // Проверка обязательных полей
    if (!firstName || !lastName || !login || !password) {
      return res
        .status(400)
        .json({ error: "firstName, lastName, login и password обязательны" });
    }

    // Проверяем, что логин уникален
    const existingUser = await prisma.user.findUnique({ where: { login } });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Пользователь с таким логином уже существует" });
    }

    // Хэшируем пароль
    const passwordHash = await bcrypt.hash(password, 10);

    // Создаем пользователя
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        middleName: middleName || null,
        login,
        passwordHash,
        managerId: managerId || null,
      },
    });

    // Создаем JWT токен
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "8h",
    });

    // Возвращаем пользователя (без passwordHash) и токен
    res.status(201).json({
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        middleName: newUser.middleName,
        login: newUser.login,
        managerId: newUser.managerId,
      },
      token,
    });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

// Авторизации пользователя
router.post("/signin", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: "Login and password required" });
  }

  const user = await prisma.user.findUnique({ where: { login } });

  if (!user) {
    return res
      .status(401)
      .json({ error: "Пользователя с таким логином не существует" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Пользователь ввел неверный пароль" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "8h" });
  res.json({
    token,
    user: {
      managerId: user.managerId,
      id: user.id,
      login: user.login,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
    },
  });
});

export default router;
