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
}


const ProjectForm = ({ project }: ProjectFormProps) => {
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description,
      });
    }
  }, [project, reset]);

  const onSubmit = (data: ProjectFormData) => {
    if (project) {
      updateProjectMutation.mutate({
        id: project.id,
        data,
      });

      return;
    }

    createProjectMutation.mutate(data);
  };

  const isPending =
    createProjectMutation.isPending ||
    updateProjectMutation.isPending;

  const isError =
    createProjectMutation.isError ||
    updateProjectMutation.isError;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Project Name</label>

        <input
          id="name"
          type="text"
          {...register("name")}
        />

        {errors.name && (
          <p>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          {...register("description")}
          rows={4}
        />

        {errors.description && (
          <p>{errors.description.message}</p>
        )}
      </div>

      {isError && (
        <p>Failed to save project.</p>
      )}

      <button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Saving..."
          : project
            ? "Update Project"
            : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;