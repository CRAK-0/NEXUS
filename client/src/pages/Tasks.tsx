import { useState } from "react";

import { useProjects } from "../hook/useProjects";
import { useTasks } from "../hook/useTasks";
import { useDeleteTask } from "../hook/useDeleteTask";

import TaskForm from "../components/tasks/TaskForm";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Tasks = () => {
  const [selectedProjectId, setSelectedProjectId] =
    useState<number | null>(null);

  const [editingTaskId, setEditingTaskId] =
    useState<number | null>(null);

  const [isCreatingTask, setIsCreatingTask] =
    useState(false);

  const [taskToDelete, setTaskToDelete] =
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
  const tasks = tasksData?.tasks ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-text">
          Tasks
        </h1>

        <p className="mt-1 text-sm text-text/50">
          Manage tasks across your projects.
        </p>
      </div>

      {/* Project selector */}

      <Card className="border-border bg-surface">
        <CardContent className="p-5">
          <div className="max-w-md space-y-2">
            <Label
              htmlFor="project"
              className="text-sm text-text"
            >
              Project
            </Label>

            <select
              id="project"
              value={selectedProjectId ?? ""}
              onChange={(event) => {
                const value = event.target.value;

                setSelectedProjectId(
                  value === "" ? null : Number(value),
                );

                setEditingTaskId(null);
                setIsCreatingTask(false);
              }}
              className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-text outline-none transition-colors focus:border-text/40 focus:ring-1 focus:ring-text/20"
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
        </CardContent>
      </Card>

      {!selectedProjectId ? (
        <Card className="border-border bg-surface">
          <CardContent className="flex min-h-48 items-center justify-center p-6 text-center">
            <div>
              <h2 className="font-medium text-text">
                Select a project
              </h2>

              <p className="mt-2 text-sm text-text/40">
                Choose a project above to view and manage
                its tasks.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Tasks */}

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-text">
                  {selectedProject?.name} Tasks
                </h2>

                <p className="mt-1 text-sm text-text/40">
                  {tasks.length}{" "}
                  {tasks.length === 1 ? "task" : "tasks"}
                </p>
              </div>

              <Button
                type="button"
                onClick={() => {
                  setIsCreatingTask(true);
                  setEditingTaskId(null);
                }}
                className="shrink-0 bg-text text-background hover:bg-text/90"
              >
                + Create New Task
              </Button>
            </div>

            {/* Create Task */}

            {isCreatingTask && (
              <Card className="mb-6 border-border bg-surface">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-text/40">
                      {selectedProject?.name}
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-text">
                      Create Task
                    </h2>

                    <p className="mt-1 text-sm text-text/40">
                      Add a new task to this project.
                    </p>
                  </div>

                  <TaskForm
                    projectId={selectedProjectId}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setIsCreatingTask(false)
                    }
                    className="mt-3 border-border bg-background text-text hover:bg-surface"
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Task loading */}

            {tasksPending && (
              <Card className="border-border bg-surface">
                <CardContent className="p-6">
                  <p className="text-sm text-text/50">
                    Loading tasks...
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Task error */}

            {tasksError && (
              <Card className="border-border bg-surface">
                <CardContent className="p-6">
                  <p className="text-sm text-text/50">
                    Unable to load tasks.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Empty state */}

            {!tasksPending &&
              !tasksError &&
              tasks.length === 0 && (
                <Card className="border-border bg-surface">
                  <CardContent className="flex min-h-40 items-center justify-center p-6 text-center">
                    <div>
                      <h3 className="font-medium text-text">
                        No tasks yet
                      </h3>

                      <p className="mt-1 text-sm text-text/40">
                        Create your first task above.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Task list */}

            {!tasksPending &&
              !tasksError &&
              tasks.length > 0 && (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="border-border bg-surface transition-colors hover:border-text/30"
                    >
                      <CardContent className="p-5">
                        {editingTaskId === task.id ? (
                          <div>
                            <div className="mb-5">
                              <p className="text-xs font-medium uppercase tracking-wider text-text/40">
                                Editing
                              </p>

                              <h3 className="mt-1 font-medium text-text">
                                {task.title}
                              </h3>
                            </div>

                            <TaskForm
                              projectId={
                                selectedProjectId
                              }
                              task={task}
                            />

                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                setEditingTaskId(null)
                              }
                              className="mt-3 border-border bg-background text-text hover:bg-surface"
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                              <div className="min-w-0">
                                <h3 className="font-medium text-text">
                                  {task.title}
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-text/50">
                                  {task.description ||
                                    "No description provided."}
                                </p>
                              </div>

                              <span className="w-fit shrink-0 rounded-full border border-border px-2.5 py-1 text-xs font-medium capitalize text-text/60">
                                {task.status.replace(
                                  "_",
                                  " ",
                                )}
                              </span>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4 text-xs text-text/40">
                              <span className="capitalize">
                                Priority: {task.priority}
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
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setEditingTaskId(
                                    task.id,
                                  );
                                  setIsCreatingTask(false);
                                }}
                                className="border-border bg-background text-text hover:bg-surface"
                              >
                                Edit
                              </Button>

                              <Button
                                type="button"
                                variant="outline"
                                disabled={
                                  deleteTaskMutation.isPending
                                }
                                onClick={() =>
                                  setTaskToDelete(
                                    task.id,
                                  )
                                }
                                className="border-border bg-background text-text hover:bg-surface disabled:opacity-40"
                              >
                                Delete
                              </Button>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
          </section>
        </>
      )}

      {/* Delete confirmation */}

      <AlertDialog
        open={taskToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setTaskToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="border-border bg-surface text-text">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete task?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-text/50">
              Are you sure you want to delete this task?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-border bg-background text-text hover:bg-surface">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                if (taskToDelete !== null) {
                  deleteTaskMutation.mutate(
                    taskToDelete,
                  );

                  setTaskToDelete(null);
                }
              }}
              className="border border-border bg-background text-text hover:bg-surface"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Tasks;
