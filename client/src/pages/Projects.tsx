import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../hook/useProjects";
import { useDeleteProject } from "../hook/useDeleteProject";
import useDebounce from "../hook/useDebounce";
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

import ProjectForm from "../components/projects/ProjectForm";

import type { Project } from "../services/projectService";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    "pending" | "complete" | undefined
  >(undefined);

  const [page, setPage] = useState(1);

  const [sort, setSort] = useState<
    "name" | "created_at" | "updated_at"
  >("created_at");

  const [order, setOrder] = useState<"asc" | "desc">(
    "desc",
  );

  const [projectToDelete, setProjectToDelete] =
  useState<Project | null>(null);

  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [isCreating, setIsCreating] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const {
    data,
    isPending,
    isError,
  } = useProjects({
    search: debouncedSearch || undefined,
    status,
    sort,
    order,
    page,
  });

  const deleteProjectMutation = useDeleteProject();

  if (isPending) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-32 animate-pulse rounded-md bg-surface" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded-md bg-surface" />
        </div>

        <div className="h-20 animate-pulse rounded-xl border border-border bg-surface" />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-48 animate-pulse rounded-xl border border-border bg-surface"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium text-text">
            Unable to load projects
          </h2>

          <p className="mt-1 text-sm text-text/50">
            Something went wrong while fetching your projects.
          </p>
        </div>
      </div>
    );
  }

  const projects = data.projects.projects;
  const pagination = data.projects.pagination;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-text">
            Projects
          </h1>

          <p className="mt-1 text-sm text-text/50">
            Manage and organize your workspace projects.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => {
            setEditingProject(null);
            setIsCreating(true);
          }}
          className="bg-text text-background hover:bg-text/90"
        >
          + New Project
        </Button>
      </div>

      {/* Create / Edit Form */}
      {isCreating && (
        <ProjectForm
          onClose={() => setIsCreating(false)}
        />
      )}

      {editingProject && (
        <ProjectForm
          project={editingProject}
          onClose={() => setEditingProject(null)}
        />
      )}

      {/* Filters */}
      <Card className="border-border bg-surface">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <Input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="border-border bg-background text-text placeholder:text-text/30 lg:flex-1"
            />

            <div className="flex flex-wrap gap-3">
              <select
                value={status ?? ""}
                onChange={(event) => {
                  const value = event.target.value;

                  setStatus(
                    value === ""
                      ? undefined
                      : (value as
                          | "pending"
                          | "complete"),
                  );

                  setPage(1);
                }}
                className="h-10 rounded-md border border-border bg-background px-3 text-sm text-text outline-none focus:border-text/40"
              >
                <option value="">All status</option>
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
                className="h-10 rounded-md border border-border bg-background px-3 text-sm text-text outline-none focus:border-text/40"
              >
                <option value="created_at">Created</option>
                <option value="updated_at">Updated</option>
                <option value="name">Name</option>
              </select>

              <select
                value={order}
                onChange={(event) => {
                  setOrder(
                    event.target.value as
                      | "asc"
                      | "desc",
                  );

                  setPage(1);
                }}
                className="h-10 rounded-md border border-border bg-background px-3 text-sm text-text outline-none focus:border-text/40"
              >
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-text/50">
          {pagination.total}{" "}
          {pagination.total === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <Card className="border-border bg-surface">
          <CardContent className="flex min-h-[260px] flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-lg font-semibold text-text">
              N
            </div>

            <h2 className="mt-4 font-medium text-text">
              No projects found
            </h2>

            <p className="mt-1 max-w-sm text-sm text-text/50">
              {search
                ? "Try changing your search or filters."
                : "Create your first project to get started."}
            </p>

            {!search && !status && (
              <Button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setIsCreating(true);
                }}
                className="mt-5 bg-text text-background hover:bg-text/90"
              >
                Create your first project
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-border bg-surface transition-colors hover:border-text/30"
            >
              <CardContent className="flex h-full flex-col p-5">
                {/* Project information */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/projects/${project.id}`)
                  }
                  className="text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-medium text-text">
                      {project.name}
                    </h2>

                    <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[11px] font-medium capitalize text-text/60">
                      {project.status}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-text/50">
                    {project.description ||
                      "No description provided."}
                  </p>
                </button>

                {/* Actions */}
                <div className="mt-auto flex gap-2 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingProject(project);
                    }}
                    className="border-border bg-transparent text-text hover:bg-background"
                  >
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setProjectToDelete(project);
                    }}
                    disabled={
                      deleteProjectMutation.isPending
                    }
                    className="border-border bg-transparent text-text hover:bg-background disabled:opacity-40"
                  >
                    {deleteProjectMutation.isPending
                      ? "Deleting..."
                      : "Delete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-5">
          <Button
            type="button"
            variant="outline"
            disabled={pagination.page === 1}
            onClick={() =>
              setPage((current) => current - 1)
            }
            className="border-border bg-surface text-text hover:bg-background disabled:opacity-30"
          >
            Previous
          </Button>

          <p className="text-sm text-text/50">
            Page{" "}
            <span className="text-text">
              {pagination.page}
            </span>{" "}
            of {pagination.totalPages}
          </p>

          <Button
            type="button"
            variant="outline"
            disabled={
              pagination.page === pagination.totalPages
            }
            onClick={() =>
              setPage((current) => current + 1)
            }
            className="border-border bg-surface text-text hover:bg-background disabled:opacity-30"
          >
            Next
          </Button>
        </div>
      )}
      <AlertDialog
  open={!!projectToDelete}
  onOpenChange={(open) => {
    if (!open) {
      setProjectToDelete(null);
    }
  }}
>
  <AlertDialogContent className="border-border bg-surface text-text">
    <AlertDialogHeader>
      <AlertDialogTitle>
        Delete project?
      </AlertDialogTitle>

      <AlertDialogDescription className="text-text/50">
        Are you sure you want to delete{" "}
        <span className="text-text">
          "{projectToDelete?.name}"
        </span>
        ? This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel className="border-border bg-background text-text hover:bg-surface">
        Cancel
      </AlertDialogCancel>

      <AlertDialogAction
        onClick={() => {
          if (projectToDelete) {
            deleteProjectMutation.mutate(
              projectToDelete.id,
            );
            setProjectToDelete(null);
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

export default Projects;