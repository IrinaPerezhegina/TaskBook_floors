export function dateToInputDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // месяц с ведущим нулём
  const day = String(date.getDate()).padStart(2, '0');        // день с ведущим нулём
  return `${year}-${month}-${day}`;
}