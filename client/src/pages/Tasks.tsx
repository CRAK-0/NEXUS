import { useState } from "react";

import { useProjects } from "../hook/useProjects";
import { useTasks } from "../hook/useTasks";
import { useDeleteTask } from "../hook/useDeleteTask";

import TaskForm from "../components/tasks/TaskForm";

const Tasks = () => {
  const [selectedProjectId, setSelectedProjectId] =
    useState<number | null>(null);

  const [editingTaskId, setEditingTaskId] =
    useState<number | null>(null);

  const {
    data: projectsData,
    isPending: projectsPending,
    isError: projectsError,
  } = useProjects();

  const deleteTaskMutation = useDeleteTask();

  const selectedProject =
    selectedProjectId !== null
      ? projectsData?.projects.projects.find(
          (project) =>
            project.id === selectedProjectId,
        )
      : null;

  const {
    data: tasksData,
    isPending: tasksPending,
    isError: tasksError,
  } = useTasks(selectedProjectId ?? 0, {
    page: 1,
    limit: 10,
    sort: "created_at",
    order: "desc",
  });

  if (projectsPending) {
    return (
      <p className="text-sm text-text/50">
        Loading projects...
      </p>
    );
  }

  if (projectsError) {
    return (
      <p className="text-sm text-text/50">
        Unable to load projects.
      </p>
    );
  }

  const projects = projectsData.projects.projects;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text">
          Tasks
        </h1>

        <p className="mt-1 text-sm text-text/60">
          Manage tasks across your projects.
        </p>
      </div>

      {/* Project selector */}

      <div>
        <label
          htmlFor="project"
          className="text-sm text-text"
        >
          Project
        </label>

        <select
          id="project"
          value={selectedProjectId ?? ""}
          onChange={(event) => {
            const value = event.target.value;

            setSelectedProjectId(
              value === "" ? null : Number(value),
            );

            setEditingTaskId(null);
          }}
          className="mt-1 w-full max-w-md rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
        >
          <option value="">
            Select a project
          </option>

          {projects.map((project) => (
            <option
              key={project.id}
              value={project.id}
            >
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {!selectedProjectId ? (
        <p className="text-sm text-text/50">
          Select a project to view its tasks.
        </p>
      ) : (
        <>
          {/* Create task */}

          <div className="rounded-lg border border-border bg-surface p-5">
            <h2 className="mb-4 text-lg font-medium text-text">
              Create Task
            </h2>

            <TaskForm
              projectId={selectedProjectId}
            />
          </div>

          {/* Tasks */}

          <div>
            <h2 className="mb-3 text-lg font-medium text-text">
              {selectedProject?.name} Tasks
            </h2>

            {tasksPending && (
              <p className="text-sm text-text/50">
                Loading tasks...
              </p>
            )}

            {tasksError && (
              <p className="text-sm text-text/50">
                Unable to load tasks.
              </p>
            )}

            {tasksData &&
              tasksData.tasks.length === 0 && (
                <p className="text-sm text-text/50">
                  No tasks yet.
                </p>
              )}

            {tasksData &&
              tasksData.tasks.length > 0 && (
                <div className="space-y-3">
                  {tasksData.tasks.map(
                    (task) => (
                      <div
                        key={task.id}
                        className="rounded-lg border border-border bg-surface p-5"
                      >
                        {editingTaskId ===
                        task.id ? (
                          <div>
                            <h3 className="mb-4 font-medium text-text">
                              Edit Task
                            </h3>

                            <TaskForm
                              projectId={
                                selectedProjectId
                              }
                              task={task}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setEditingTaskId(
                                  null,
                                )
                              }
                              className="mt-3 rounded-lg border border-border px-3 py-2 text-sm text-text"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <h3 className="font-medium text-text">
                              {task.title}
                            </h3>

                            <p className="mt-1 text-sm text-text/60">
                              {task.description ||
                                "No description"}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-3 text-xs text-text/50">
                              <span>
                                Status:{" "}
                                {task.status}
                              </span>

                              <span>
                                Priority:{" "}
                                {task.priority}
                              </span>

                              <span>
                                Due:{" "}
                                {task.due_date
                                  ? new Date(
                                      task.due_date,
                                    ).toLocaleDateString()
                                  : "No date"}
                              </span>
                            </div>

                            <div className="mt-4 flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingTaskId(
                                    task.id,
                                  )
                                }
                                className="rounded-lg border border-border px-3 py-2 text-sm text-text"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                disabled={
                                  deleteTaskMutation.isPending
                                }
                                onClick={() => {
                                  const confirmed =
                                    window.confirm(
                                      `Delete "${task.title}"?`,
                                    );

                                  if (confirmed) {
                                    deleteTaskMutation.mutate(
                                      task.id,
                                    );
                                  }
                                }}
                                className="rounded-lg border border-border px-3 py-2 text-sm text-text disabled:opacity-40"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tasks;