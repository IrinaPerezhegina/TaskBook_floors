import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const prisma = new PrismaClient();
const router = express.Router();

// Пполучение всех руководителей  managerId: null
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    where: {
      managerId: null,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      middleName: true,
    },
  });
  return res.json(users);
});

router.post("/", async (req, res) => {
  const { firstName, lastName, middleName, login, password, managerId } =
    req.body;
  if (!firstName || !lastName || !login || !password) {
    return res
      .status(400)
      .json({ error: "Не все обязательные поля заполнены" });
  }

  const existing = await prisma.user.findUnique({ where: { login } });
  if (existing) {
    return res
      .status(400)
      .json({ error: "Пользователь с таким логином уже существует" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      middleName,
      login,
      password: hashedPassword,
      managerId: managerId || null,
    },
  });

  res.json({ id: user.id, login: user.login });
});

// Получить подчиненных пользователя и авторизованного пользователя(для проверки иерархии)
router.get("/subordinates", authMiddleware, async (req, res) => {
  const userId = parseInt(req.userId);
  const subs = await prisma.user.findMany({ where: { managerId: userId } });
  const me = await prisma.user.findUnique({ where: { id: userId } });

  res.json([...subs, me]);
});

export default router;
