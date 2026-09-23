import { useProjects } from "../../hook/useProjects.ts";

const RecentProjects = () => {
  const {
    data,
    isPending,
    isError,
  } = useProjects();

  if (isPending) {
    return (
      <div className="rounded-lg border border-border bg-surface">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-medium text-text">
            Recent Projects
          </h2>
        </div>

        <div className="p-5">
          <p className="text-sm text-text/50">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-border bg-surface">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-medium text-text">
            Recent Projects
          </h2>
        </div>

        <div className="p-5">
          <p className="text-sm text-text/50">
            Unable to load projects.
          </p>
        </div>
      </div>
    );
  }

  const projects = data.projects.projects;

  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-medium text-text">
          Recent Projects
        </h2>
      </div>

      <div className="p-5">
        {projects.length === 0 ? (
          <p className="text-sm text-text/50">
            No projects yet.
          </p>
        ) : (
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id}>
                <p className="text-sm text-text">
                  {project.name}
                </p>

                <p className="text-xs text-text/50">
                  {project.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentProjects;