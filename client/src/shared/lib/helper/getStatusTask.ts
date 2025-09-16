export function getStatusTask(status: string): string {
  let statusResult = "";
  if (status === "TODO") {
    statusResult = "к выполнению";
  }
  if (status === "IN_PROGRESS") {
    statusResult = "выполняется";
  }
  if (status === "DONE") {
    statusResult = "выполнена";
  }
  if (status === "CANCELED") {
    statusResult = "отменена";
  }
  return statusResult;
}
