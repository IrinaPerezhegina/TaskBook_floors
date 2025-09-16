import { SelectOption } from "@/shared/types";

export const status: SelectOption[] = [
  {
    value: "TODO",
    content: "к выполнению",
  },
  {
    value: "IN_PROGRESS",
    content: "выполняется",
  },
  {
    value: "DONE",
    content: "выполнена",
  },
  {
    value: "CANCELED",
    content: "отменена",
  },
];
