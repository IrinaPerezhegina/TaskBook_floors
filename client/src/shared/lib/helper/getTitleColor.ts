export function getTitleColor(dateString: string, status: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // обнуляем время у сегодня

  const dueDate = new Date(dateString);
  dueDate.setHours(0, 0, 0, 0); // обнуляем время у даты задачи

  if (status === "DONE") {
    return "green";
  }

  if (dueDate < today && status !== "DONE") {
    return "red";
  }

  return "gray";
}
