import { useState } from "react";

import { useNotes } from "../hook/useNotes";
import { useDeleteNote } from "../hook/useDeleteNote";

import NoteForm from "../components/notes/NoteForm";

import type { Note } from "../services/noteService";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const Notes = () => {
  const [editingNote, setEditingNote] =
    useState<Note | undefined>(undefined);

  const [isCreatingNote, setIsCreatingNote] =
    useState(false);

  const [noteToDelete, setNoteToDelete] =
    useState<number | null>(null);

  const { data, isPending, isError } = useNotes();

  const deleteNoteMutation = useDeleteNote();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-text/50">
          Loading notes...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-border bg-surface">
        <CardContent className="p-6">
          <p className="text-sm text-text/50">
            Failed to load notes.
          </p>
        </CardContent>
      </Card>
    );
  }

  const notes = data.notes;

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-text">
            Notes
          </h1>

          <p className="mt-1 text-sm text-text/50">
            Create and manage your personal notes.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => {
            setIsCreatingNote(true);
            setEditingNote(undefined);
          }}
          className="w-fit bg-text text-background hover:bg-text/90"
        >
          + Create New Note
        </Button>
      </div>

      {/* Create / Edit Form */}

      {(isCreatingNote || editingNote) && (
        <Card className="border-border bg-surface">
          <CardContent className="p-6">
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-wider text-text/40">
                Workspace
              </p>

              <h2 className="mt-1 text-xl font-semibold text-text">
                {editingNote ? "Edit Note" : "Create Note"}
              </h2>

              <p className="mt-1 text-sm text-text/40">
                {editingNote
                  ? "Update your note."
                  : "Add a new note to your workspace."}
              </p>
            </div>

            <NoteForm note={editingNote} />

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsCreatingNote(false);
                setEditingNote(undefined);
              }}
              className="mt-3 border-border bg-background text-text hover:bg-surface"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notes List */}

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-text">
            Your Notes
          </h2>

          <p className="mt-1 text-sm text-text/40">
            {notes.length}{" "}
            {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>

        {notes.length === 0 ? (
          <Card className="border-border bg-surface">
            <CardContent className="flex min-h-40 items-center justify-center p-6 text-center">
              <div>
                <h3 className="font-medium text-text">
                  No notes yet
                </h3>

                <p className="mt-1 text-sm text-text/40">
                  Create your first note to get started.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {notes.map((note) => (
              <Card
                key={note.id}
                className="border-border bg-surface transition-colors hover:border-text/30"
              >
                <CardContent className="flex h-full flex-col p-5">
                  <div className="min-w-0">
                    <h3 className="font-medium text-text">
                      {note.title}
                    </h3>

                    <p className="mt-3 line-clamp-5 whitespace-pre-wrap text-sm leading-6 text-text/50">
                      {note.content}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <p className="text-xs text-text/40">
                      Updated{" "}
                      {new Date(
                        note.updated_at,
                      ).toLocaleString()}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingNote(note);
                          setIsCreatingNote(false);
                        }}
                        className="border-border bg-background text-text hover:bg-surface"
                      >
                        Edit
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        disabled={
                          deleteNoteMutation.isPending
                        }
                        onClick={() =>
                          setNoteToDelete(note.id)
                        }
                        className="border-border bg-background text-text hover:bg-surface disabled:opacity-40"
                      >
                        {deleteNoteMutation.isPending
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Delete confirmation */}

      <AlertDialog
        open={noteToDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setNoteToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="border-border bg-surface text-text">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete note?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-text/50">
              Are you sure you want to delete this note?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-border bg-background text-text hover:bg-surface">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                if (noteToDelete !== null) {
                  deleteNoteMutation.mutate(
                    noteToDelete,
                  );

                  setNoteToDelete(null);
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

export default Notes;
