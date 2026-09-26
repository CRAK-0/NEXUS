import { useProjects } from "../../hook/useProjects.ts";
import { useTasks } from "../../hook/useTasks.ts";
import { useNotes } from "../../hook/useNotes.ts"; 
import { useAllTasks } from "../../hook/useAllTasks.ts";

const DashboardStats = () => {
  const {
    data: projectsData,
    isPending: projectsPending,
    isError: projectsError,
  } = useProjects();
  
const {
  data: notesData,
  isPending: notesPending,
  isError: notesError,
} = useNotes();

const {
  data: tasksData,
  isPending: tasksPending,
  isError:tasksError,
} = useAllTasks();

  const projectCount =
    projectsData?.projects.pagination.total ?? 0;

const taskCount = tasksData?.tasks.length ?? 0;

    const noteCount = notesData?.notes.length ?? 0;

    
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Projects */}
      <div className="rounded-lg border border-border bg-surface p-5">
        <p className="text-sm text-text/60">
          Projects
        </p>

        <p className="mt-3 text-3xl font-semibold text-text">
          {projectsPending
            ? "..."
            : projectsError
              ? "-"
              : projectCount}
        </p>
      </div>

      {/* Tasks */}
      <div className="rounded-lg border border-border bg-surface p-5">
        <p className="text-sm text-text/60">
          Tasks
        </p>

        <p className="mt-3 text-3xl font-semibold text-text">
          {tasksPending
            ? "..."
            : tasksError
              ? "-"
              : taskCount}
        </p>
      </div>

      {/* Notes */}
      <div className="rounded-lg border border-border bg-surface p-5">
        <p className="text-sm text-text/60">
          Notes
        </p>

        <p className="mt-3 text-3xl font-semibold text-text">
          {notesPending
    ? "..."
    : notesError
      ? "-"
      : noteCount}
        </p>
      </div>
    </section>
  );
};

export default DashboardStats;