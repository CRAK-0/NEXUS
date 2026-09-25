import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  taskSchema,
  type TaskFormData,
} from "../../schemas/taskSchema";

import { useCreateTask } from "../../hook/useCreateTask";
import { useUpdateTask } from "../../hook/useUpdateTask";

import type { Task } from "../../services/taskService";

interface TaskFormProps {
  projectId: number;
  task?: Task;
}

const TaskForm = ({
  projectId,
  task,
}: TaskFormProps) => {
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      status: "todo",
      priority: "medium",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    if (task) {
      updateTaskMutation.mutate({
        taskId: task.id,
        data,
      });

      return;
    }

    createTaskMutation.mutate({
      projectId,
      data,
    });
  };

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date
          ? task.due_date.slice(0, 10)
          : "",
      });
    }
  }, [task, reset]);

  const isPending =
    createTaskMutation.isPending ||
    updateTaskMutation.isPending;

  const isError =
    createTaskMutation.isError ||
    updateTaskMutation.isError;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="title"
          className="text-sm text-text"
        >
          Task Title
        </label>

        <input
          id="title"
          type="text"
          {...register("title")}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
        />

        {errors.title && (
          <p className="mt-1 text-xs text-text/50">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm text-text"
        >
          Description
        </label>

        <textarea
          id="description"
          rows={3}
          {...register("description")}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
        />

        {errors.description && (
          <p className="mt-1 text-xs text-text/50">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label
            htmlFor="status"
            className="text-sm text-text"
          >
            Status
          </label>

          <select
            id="status"
            {...register("status")}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">
              In Progress
            </option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="priority"
            className="text-sm text-text"
          >
            Priority
          </label>

          <select
            id="priority"
            {...register("priority")}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="due_date"
            className="text-sm text-text"
          >
            Due Date
          </label>

          <input
            id="due_date"
            type="date"
            {...register("due_date")}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
          />
        </div>
      </div>

      {isError && (
        <p className="text-sm text-text/50">
          Failed to save task.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text disabled:opacity-40"
      >
        {isPending
          ? "Saving..."
          : task
            ? "Update Task"
            : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;