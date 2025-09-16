export enum Priority {
  "HIGH" = "HIGH",
  "MEDIUM" = "MEDIUM",
  "LOW" = "LOW",
}

export enum Status {
  "TODO" = "TODO",
  "IN_PROGRESS" = "IN_PROGRESS",
  "DONE" = "DONE",
  "CANCELED" = "CANCELED",
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  priority: Priority;
  status: Status;
  creatorId?: number;
  assigneeId: number | undefined;
  assignee?: {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string | null;
  };
}
