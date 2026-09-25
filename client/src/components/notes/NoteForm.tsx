import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  noteSchema,
  type NoteFormData,
} from "../../schemas/noteSchema";

import { useCreateNote } from "../../hook/useCreateNote";
import { useUpdateNote } from "../../hook/useUpdateNote";

import type { Note } from "../../services/noteService";

interface NoteFormProps {
  note?: Note;
}

const NoteForm = ({
  note,
}: NoteFormProps) => {
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = (data: NoteFormData) => {
    if (note) {
      updateNoteMutation.mutate({
        noteId: note.id,
        data,
      });

      return;
    }

    createNoteMutation.mutate(data);
  };

  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        content: note.content,
      });
    }
  }, [note, reset]);

  const isPending =
    createNoteMutation.isPending ||
    updateNoteMutation.isPending;

  const isError =
    createNoteMutation.isError ||
    updateNoteMutation.isError;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="title"
          className="text-sm text-text"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          {...register("title")}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
        />

        {errors.title && (
          <p className="mt-1 text-xs text-text/50">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="text-sm text-text"
        >
          Content
        </label>

        <textarea
          id="content"
          rows={6}
          {...register("content")}
          className="mt-1 w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
        />

        {errors.content && (
          <p className="mt-1 text-xs text-text/50">
            {errors.content.message}
          </p>
        )}
      </div>

      {isError && (
        <p className="text-sm text-text/50">
          Failed to save note.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text disabled:opacity-40"
      >
        {isPending
          ? "Saving..."
          : note
            ? "Update Note"
            : "Create Note"}
      </button>
    </form>
  );
};

export default NoteForm;