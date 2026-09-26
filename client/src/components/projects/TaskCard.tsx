import { useNavigate } from "react-router-dom";

import type { Task } from "../../services/taskService";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/tasks")}
      className="w-full rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:border-text/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-medium text-text">
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-text/50">
              {task.description}
            </p>
          )}
        </div>

        <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs font-medium capitalize text-text/60">
          {task.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text/50">
        <span className="capitalize">
          Priority: {task.priority}
        </span>

        {task.due_date && (
          <span>
            Due: {new Date(task.due_date).toLocaleDateString()}
          </span>
        )}
      </div>
    </button>
  );
};

export default TaskCard;
