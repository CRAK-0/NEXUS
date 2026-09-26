import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  projectSchema,
  type ProjectFormData,
} from "../../schemas/projectSchema";

import { useCreateProject } from "../../hook/useCreateProject";
import { useUpdateProject } from "../../hook/useUpdateProject";

import type { Project } from "../../services/projectService";

interface ProjectFormProps {
  project?: Project;
  onClose: () => void;
}

const ProjectForm = ({
  project,
  onClose,
}: ProjectFormProps) => {
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [project, reset]);

  const onSubmit = (data: ProjectFormData) => {
    if (project) {
      updateProjectMutation.mutate(
        {
          id: project.id,
          data,
        },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );

      return;
    }

    createProjectMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isPending =
    createProjectMutation.isPending ||
    updateProjectMutation.isPending;

  const isError =
    createProjectMutation.isError ||
    updateProjectMutation.isError;

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-medium text-text">
          {project ? "Edit Project" : "Create Project"}
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="text-sm text-text/50 hover:text-text"
        >
          Cancel
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="name"
            className="text-sm text-text"
          >
            Project Name
          </label>

          <input
            id="name"
            type="text"
            {...register("name")}
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-text outline-none"
          />

          {errors.name && (
            <p className="mt-1 text-xs text-text/50">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="text-sm text-text"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            {...register("description")}
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-text outline-none"
          />

          {errors.description && (
            <p className="mt-1 text-xs text-text/50">
              {errors.description.message}
            </p>
          )}
        </div>

        {isError && (
          <p className="text-sm text-text/50">
            Failed to save project.
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm text-text disabled:opacity-40"
          >
            {isPending
              ? "Saving..."
              : project
                ? "Update Project"
                : "Create Project"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm text-text/60"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
