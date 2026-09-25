import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCreateProject } from "../../hook/useCreateProject.ts";
import {
  projectSchema,
  type ProjectFormData,
} from "../../schemas/projectSchema.ts";

const CreateProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const createProjectMutation = useCreateProject();

  const onSubmit = (data: ProjectFormData) => {
    createProjectMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm text-text"
        >
          Project Name
        </label>

        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-text outline-none"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-text/60">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm text-text"
        >
          Description
        </label>

        <textarea
          id="description"
          {...register("description")}
          rows={4}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-text outline-none"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-text/60">
            {errors.description.message}
          </p>
        )}
      </div>

      {createProjectMutation.isError && (
        <p className="text-sm text-text/60">
          Failed to create project.
        </p>
      )}

      <button
        type="submit"
        disabled={createProjectMutation.isPending}
        className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text disabled:opacity-50"
      >
        {createProjectMutation.isPending
          ? "Creating..."
          : "Create Project"}
      </button>
    </form>
  );
};

export default CreateProjectForm;