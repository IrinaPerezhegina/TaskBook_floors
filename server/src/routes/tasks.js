import { PrismaClient } from "@prisma/client";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

const prisma = new PrismaClient();

// Создать новую задачу
router.post("/", authMiddleware, async (req, res) => {
  const { title, status, priority, creatorId } = req.body;
  if (!title || !status || !priority || !creatorId) {
    return res
      .status(400)
      .json({ error: "Не все обязательные поля заполнены" });
  }
  const userCreator = await prisma.user.findUnique({
    where: { id: req.body.creatorId },
  });
  const userAssignee = await prisma.user.findUnique({
    where: { id: req.body.assigneeId },
  });
  const creator = {
    id: userCreator.id,
    firstName: userCreator.firstName,
    lastName: userCreator.lastName,
    middleName: userCreator.middleName,
  };
  const assignee = {
    id: userAssignee.id,
    firstName: userAssignee.firstName,
    lastName: userAssignee.lastName,
    middleName: userAssignee.middleName,
  };
  try {
    const newTask = await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        status: req.body.status,
        creator: {
          connect: { id: req.body.creatorId },
        },
        assignee: {
          connect: { id: req.body.assigneeId },
        },
      },
    });

    res.status(201).json({ ...newTask, creator, assignee });
  } catch (error) {
    res.status(400).json({ error: "Не все обязательные поля заполнены" });
  }
});

// Получение всех задач подчиненных и свои
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Предположим, что id пользователя доступен в req.userId (число или строка)
    const userId = Number(req.userId);
    if (isNaN(userId)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Получить id подчинённых пользователей текущего пользователя
    const subordinates = await prisma.user.findMany({
      where: { managerId: userId },
      select: { id: true },
    });
    const subordinateIds = subordinates.map((user) => user.id);

    // Получить все задачи, которые создал авторизованный пользователь или его подчинённые
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { assigneeId: userId },
          { creatorId: userId },
          { creatorId: { in: subordinateIds } },
        ],
      },
      orderBy: { updatedAt: "desc" },
      // Для удобства можно включить связанные данные:
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
        assignee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error("Ошибка получения задач:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Частичное обновление задачи (PATCH)
router.patch("/:id", authMiddleware, async (req, res) => {
  const { title, description, status, priority, assigneeId } = req.body;
  if (!title || !status || !priority || !assigneeId || !description) {
    return res
      .status(400)
      .json({ error: "Не все обязательные поля заполнены" });
  }
  const { id } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: req.body,
    });
    const userCreator = await prisma.user.findUnique({
      where: { id: updatedTask.creatorId },
    });
    const userAssignee = await prisma.user.findUnique({
      where: { id: updatedTask.assigneeId },
    });
    const creator = {
      id: userCreator.id,
      firstName: userCreator.firstName,
      lastName: userCreator.lastName,
      middleName: userCreator.middleName,
    };
    const assignee = {
      id: userAssignee.id,
      firstName: userAssignee.firstName,
      lastName: userAssignee.lastName,
      middleName: userAssignee.middleName,
    };

    res.json({ ...updatedTask, creator, assignee });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Удалить задачу по ID
router.delete("/:id", getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: "Задача удалена" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware для получения задачи по ID
async function getTask(req, res, next) {
  let task;
  try {
    task = await prisma.task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "Задача не найдена" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

export default router;
