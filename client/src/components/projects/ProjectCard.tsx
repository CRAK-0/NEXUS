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
    <section className="rounded-lg border border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-text">
            {project.name}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-text/60">
            {project.description || "No description provided."}
          </p>
        </div>

        <span className="rounded-md border border-border px-3 py-1 text-xs text-text/60">
          {project.status}
        </span>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-text/60">
            Progress
          </span>

          <span className="text-sm font-medium text-text">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-text transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;