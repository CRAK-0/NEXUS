import { useState } from "react";
import { useProjects } from "../hook/useProjects.ts";
import CreateProjectForm from "../components/projects/CreateProjectForm.tsx";

const Projects = () => {

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
  "pending" | "complete" | undefined
>(undefined);

const [page, setPage] = useState(1);

const [sort, setSort] = useState<
  "name" | "created_at" | "updated_at"
>("created_at");

const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isPending, isError } = useProjects({
  search: search || undefined,
  status,sort,order,page,
});

  if (isPending) {
    return <p className="text-sm text-text/50">Loading projects...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-text/50">
        Unable to load projects.
      </p>
    );
  }

  const projects = data.projects.projects;
  const pagination = data.projects.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text">
          Projects
        </h1>

        <input
  type="text"
  placeholder="Search projects..."
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none placeholder:text-text/40"
/>
<select
  value={status ?? ""}
  onChange={(event) => {
    const value = event.target.value;

    setStatus(
      value === ""
        ? undefined
        : (value as "pending" | "complete"),
    );
  }}
  className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
>
  <option value="">All</option>
  <option value="pending">Pending</option>
  <option value="complete">Complete</option>
</select> 

<select
  value={sort}
  onChange={(event) => {
    setSort(
      event.target.value as
        | "name"
        | "created_at"
        | "updated_at",
    );

    setPage(1);
  }}
  className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
>
  <option value="created_at">Created</option>
  <option value="updated_at">Updated</option>
  <option value="name">Name</option>
</select>

<select
  value={order}
  onChange={(event) => {
    setOrder(event.target.value as "asc" | "desc");
    setPage(1);
  }}
  className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
>
  <option value="desc">Descending</option>
  <option value="asc">Ascending</option>
</select>
        <p className="mt-1 text-sm text-text/60">
          Manage your projects.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-text/50">
          No projects yet.
        </p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <h2 className="font-medium text-text">
                {project.name}
              </h2>

              <p className="mt-1 text-sm text-text/60">
                {project.description || "No description"}
              </p>

              <p className="mt-3 text-xs text-text/50">
                Status: {project.status}
              </p>
            </div>
          ))}
        </div>
      )}

      <h1>Create the Project</h1>

       <CreateProjectForm />

      <div className="flex items-center justify-between">
  <button
    disabled={pagination.page === 1}
    onClick={() => setPage((current) => current - 1)}
    className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text disabled:cursor-not-allowed disabled:opacity-40"
  >
    Previous
  </button>

  <p className="text-sm text-text/50">
    Page {pagination.page} of {pagination.totalPages}
  </p>

  <button
    disabled={pagination.page === pagination.totalPages}
    onClick={() => setPage((current) => current + 1)}
    className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text disabled:cursor-not-allowed disabled:opacity-40"
  >
    Next
  </button>
</div>
    </div>
  );
};

export default Projects;