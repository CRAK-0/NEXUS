import { useState } from "react";

import { useNotes } from "../hook/useNotes";
import { useDeleteNote } from "../hook/useDeleteNote";

import NoteForm from "../components/notes/NoteForm";

import type { Note } from "../services/noteService";

const Notes = () => {
  const [editingNote, setEditingNote] = useState<Note | undefined>(
    undefined,
  );

  const { data, isPending, isError } = useNotes();

  const deleteNoteMutation = useDeleteNote();

  /*
   * Loading state
   */
  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-text/60">
          Loading notes...
        </p>
      </div>
    );
  }

  /*
   * Error state
   */
  if (isError) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="text-sm text-text/60">
          Failed to load notes.
        </p>
      </div>
    );
  }

  const notes = data.notes;

  /*
   * Delete note
   */
  const handleDelete = (noteId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) {
      return;
    }

    deleteNoteMutation.mutate(noteId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-text">
          Notes
        </h1>

        <p className="mt-1 text-sm text-text/60">
          Create and manage your personal notes.
        </p>
      </div>

      {/* Create / Edit Form */}
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="mb-5">
          <h2 className="text-lg font-medium text-text">
            {editingNote ? "Edit Note" : "Create Note"}
          </h2>

          <p className="mt-1 text-sm text-text/50">
            {editingNote
              ? "Update your note."
              : "Add a new note to your workspace."}
          </p>
        </div>

        <NoteForm note={editingNote} />

        {editingNote && (
          <button
            type="button"
            onClick={() => setEditingNote(undefined)}
            className="mt-3 text-sm text-text/60 hover:text-text"
          >
            Cancel editing
          </button>
        )}
      </div>

      {/* Notes List */}
      <div className="rounded-lg border border-border bg-surface">
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-medium text-text">
            Your Notes
          </h2>

          <p className="mt-1 text-sm text-text/50">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-text/50">
              No notes yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-6"
              >
                <div className="flex items-start justify-between gap-6">
                  {/* Note content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-text">
                      {note.title}
                    </h3>

                    <p className="mt-2 whitespace-pre-wrap text-sm text-text/60">
                      {note.content}
                    </p>

                    <p className="mt-3 text-xs text-text/40">
                      Updated{" "}
                      {new Date(
                        note.updated_at,
                      ).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingNote(note)}
                      className="rounded-md border border-border px-3 py-1.5 text-sm text-text/70 transition hover:bg-background hover:text-text"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(note.id)}
                      disabled={deleteNoteMutation.isPending}
                      className="rounded-md border border-border px-3 py-1.5 text-sm text-text/70 transition hover:bg-background hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deleteNoteMutation.isPending
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
