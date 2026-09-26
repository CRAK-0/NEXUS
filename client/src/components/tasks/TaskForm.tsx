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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="title" className="text-text">
          Task Title
        </Label>

        <Input
          id="title"
          type="text"
          placeholder="Enter task title"
          {...register("title")}
          className="border-border bg-background text-text placeholder:text-text/30"
        />

        {errors.title && (
          <p className="text-xs text-text/50">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-text">
          Description
        </Label>

        <textarea
          id="description"
          rows={4}
          placeholder="Describe what needs to be done..."
          {...register("description")}
          className="flex w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-text outline-none placeholder:text-text/30 transition-colors focus-visible:border-text/40 focus-visible:ring-1 focus-visible:ring-text/20"
        />

        {errors.description && (
          <p className="text-xs text-text/50">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="status" className="text-text">
            Status
          </Label>

          <select
            id="status"
            {...register("status")}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-text outline-none transition-colors focus:border-text/40 focus:ring-1 focus:ring-text/20"
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority" className="text-text">
            Priority
          </Label>

          <select
            id="priority"
            {...register("priority")}
            className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-text outline-none transition-colors focus:border-text/40 focus:ring-1 focus:ring-text/20"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="due_date" className="text-text">
            Due Date
          </Label>

          <Input
            id="due_date"
            type="date"
            {...register("due_date")}
            className="border-border bg-background text-text"
          />
        </div>
      </div>

      {isError && (
        <div className="rounded-md border border-border bg-background px-4 py-3">
          <p className="text-sm text-text/60">
            Failed to save task. Please try again.
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full border border-border bg-background text-text hover:bg-surface disabled:opacity-40 sm:w-auto"
      >
        {isPending
          ? "Saving..."
          : task
            ? "Update Task"
            : "Create Task"}
      </Button>
    </form>
  );
};

export default TaskForm;
