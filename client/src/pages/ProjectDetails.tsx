import { useParams } from "react-router-dom";

import { useProject } from "../hook/useProject.ts";
import { useTasks } from "../hook/useTasks.ts";

import ProjectCard from "../components/projects/ProjectCard.tsx";
import TaskCard from "../components/projects/TaskCard.tsx";

const ProjectDetails = () => {
  const { projectId } = useParams();

  const id = Number(projectId);

  const {
    data: project,
    isPending: projectPending,
    isError: projectError,
  } = useProject(id);

  const {
    data: tasksData,
    isPending: tasksPending,
    isError: tasksError,
  } = useTasks(id);

  if (projectPending || tasksPending) {
    return (
      <p className="text-sm text-text/50">
        Loading project...
      </p>
    );
  }

  if (projectError || !project) {
    return (
      <p className="text-sm text-text/50">
        Unable to load project.
      </p>
    );
  }

  if (tasksError) {
    return (
      <p className="text-sm text-text/50">
        Unable to load project tasks.
      </p>
    );
  }

  const tasks = tasksData?.tasks ?? [];

  const completedTasks = tasks.filter(
    (task) => task.status === "complete",
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) * 100,
        );

  return (
    <div className="space-y-8">
      <ProjectCard
        project={project}
        progress={progress}
      />

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-text">
            Tasks
          </h2>

          <p className="mt-1 text-sm text-text/50">
            {completedTasks} of {tasks.length} tasks completed
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="text-sm text-text/50">
              No tasks in this project yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectDetails;