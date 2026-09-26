import type { Task } from "../../services/taskService";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium text-text">
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-1 text-sm text-text/50">
              {task.description}
            </p>
          )}
        </div>

        <span className="shrink-0 rounded-md border border-border px-2.5 py-1 text-xs text-text/60">
          {task.status}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-text/50">
        <span>
          Priority: {task.priority}
        </span>

        {task.due_date && (
          <span>
            Due: {new Date(task.due_date).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;