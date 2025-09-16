import { Priority, PrismaClient, Status } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Хешируем пароли для всех пользователей
  const passwordHash = await bcrypt.hash("password123", 10);

  // Создаём менеджера (руководителя)
  const manager = await prisma.user.create({
    data: {
      firstName: "Ivan",
      lastName: "Ivanov",
      login: "ivan.manager",
      passwordHash,
    },
  });

  // Создаём подчинённых с ссылкой на менеджера
  const subordinate1 = await prisma.user.create({
    data: {
      firstName: "Petr",
      lastName: "Petrov",
      middleName: "Sergeevich",
      login: "petr.user",
      passwordHash,
      managerId: manager.id,
    },
  });

  const subordinate2 = await prisma.user.create({
    data: {
      firstName: "Anna",
      lastName: "Sidorova",
      login: "anna.user",
      passwordHash,
      managerId: manager.id,
    },
  });

  // Создаём задачи, связанные с пользователями
  await prisma.task.createMany({
    data: [
      {
        title: "Подготовить отчёт",
        description: "Финансовый отчёт за месяц",
        dueDate: new Date("2025-09-30"),
        priority: Priority.HIGH,
        status: Status.TODO,
        creatorId: manager.id,
        assigneeId: subordinate1.id,
      },
      {
        title: "Обновить сайт",
        description: "Добавить новую страницу",
        dueDate: new Date("2025-10-05"),
        priority: Priority.MEDIUM,
        status: Status.IN_PROGRESS,
        creatorId: subordinate1.id,
        assigneeId: subordinate2.id,
      },
      {
        title: "Обновить сайт",
        description: "Добавить новую страницу",
        dueDate: new Date("2025-10-15"),
        priority: Priority.MEDIUM,
        status: Status.IN_PROGRESS,
        creatorId: subordinate1.id,
        assigneeId: subordinate2.id,
      },
    ],
  });

  console.log("Mock данные успешно добавлены");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
