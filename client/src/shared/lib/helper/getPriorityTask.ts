export function getPriorityTask(priority: string): string {
  let priorityResult = "";
  if (priority === "HIGH") {
    priorityResult = "высокий";
  }
  if (priority === "MEDIUM") {
    priorityResult = "средний";
  }
  if (priority === "LOW") {
    priorityResult = "низкий";
  }

  return priorityResult;
}
