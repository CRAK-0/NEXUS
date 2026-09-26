import type { Project } from "../../services/projectService";

interface ProjectCardProps {
  project: Project;
  progress: number;
}

const ProjectCard = ({
  project,
  progress,
}: ProjectCardProps) => {
  return (
    <section className="rounded-xl border border-border bg-surface">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text/40">
              Project
            </p>

            <h1 className="break-words text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              {project.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-text/50">
              {project.description || "No description provided."}
            </p>
          </div>

          <span className="w-fit shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-medium capitalize text-text/60">
            {project.status}
          </span>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-text">
                Progress
              </p>

              <p className="mt-1 text-xs text-text/40">
                Based on completed tasks
              </p>
            </div>

            <span className="text-2xl font-semibold tracking-tight text-text">
              {progress}%
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-text transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
