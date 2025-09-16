import { memo } from "react";

import { priority, status } from "@/entities/Task";
import {
  Button,
  classNames,
  Input,
  Loader,
  Modal,
  Select,
  Text,
  Textarea,
} from "@/shared";
import { SelectOption } from "@/shared/types";

import cls from "./TaskModal.module.scss";

interface TaskModalProps {
  isOpen: boolean;
  titleModal: string;
  title: string;
  description: string;
  dateCompletion: string;
  priorityTask: string | undefined;
  statusTask: string | undefined;
  subordinates: SelectOption[] | undefined;
  responsibleId: string | undefined;
  isLoading: boolean | undefined;
  error: string | undefined;
  text: string;
  readOnly: boolean;
  finalResult: {
    onUpdateTaskId: (value?: number) => void;
    onCloseModal: () => void;
    onSelectedResponsible: (value: string) => void;
    onCreateNewTask: () => Promise<void>;
    onChangeVisibilityModalCreateTask: () => void;
    onChangeTitle: (value: string) => void;
    onChangeDescription: (value: string) => void;
    onChangeStatus: (value: string) => void;
    onChangeDateCompletion: (value: string) => void;
    onChangePriority: (value: string) => void;
  };
  className?: string;
}

export const TaskModal = memo((props: TaskModalProps) => {
  const {
    className,
    isLoading,
    error,
    isOpen,
    title,
    text,
    readOnly,
    titleModal,
    description,
    dateCompletion,
    priorityTask,
    statusTask,
    subordinates,
    responsibleId,
    finalResult,
  } = props;

  if (!isOpen) return;
  console.log(readOnly);

  return (
    <Modal
      isOpen={isOpen}
      className={classNames(cls.TaskModal, {}, [className])}
    >
      <div className={cls.TaskCard}>
        <h3>{titleModal}</h3>
        <Input
          readOnly={readOnly}
          required
          label="Заголовок задачи"
          name="title"
          value={title}
          onChange={finalResult.onChangeTitle}
        />
        <Textarea
          readOnly={readOnly}
          required
          value={description}
          onChange={finalResult.onChangeDescription}
          label="Описание задачи"
          name="description"
        />
        <Input
          readOnly={readOnly}
          required
          type="date"
          label="Укажите дату выполнения"
          name="date of completion"
          value={dateCompletion.slice(0, 10)}
          onChange={finalResult.onChangeDateCompletion}
        />
        <Select
          readOnly={readOnly}
          label="Приоритет задачи"
          placeholder="Укажите приоритет..."
          onChange={finalResult.onChangePriority}
          value={priorityTask}
          options={priority}
        />
        <Select
          placeholder="Укажите статус..."
          onChange={finalResult.onChangeStatus}
          label="Статус задачи"
          value={statusTask}
          options={status}
        />

        <Select
          readOnly={readOnly}
          placeholder="Укажите ответственного..."
          onChange={finalResult.onSelectedResponsible}
          label="Ответственный"
          value={String(responsibleId)}
          options={subordinates}
        />
        <div className={cls.wrapperComponents}>
          {isLoading && <Loader variant="smallLoader" />}
          {error && <Text text={error} />}
        </div>
        <div className={cls.btnWrap}>
          <Button text="Отменить" onClick={finalResult.onCloseModal} />
          <Button text={text} onClick={finalResult.onCreateNewTask} />
        </div>
      </div>
    </Modal>
  );
});
