import { useState } from "react";
import { useSearch } from "../../hook/useSearch";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const {
    data,
    isPending,
    isError,
  } = useSearch(query);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="relative w-full max-w-md">
      {/* Search input */}
      <div className="flex items-center rounded-md border border-border bg-surface">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="ml-3 h-4 w-4 shrink-0 text-text/50"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
          />

          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search..."
          className="w-full bg-transparent px-3 py-2 text-sm text-text outline-none placeholder:text-text/40"
        />
      </div>

      {/* Search results */}
      {hasQuery && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-md border border-border bg-surface">
          {isPending && (
            <p className="p-4 text-sm text-text/50">
              Searching...
            </p>
          )}

          {isError && (
            <p className="p-4 text-sm text-text/50">
              Search failed.
            </p>
          )}

          {data && (
            <div className="p-2">
              {/* Projects */}
              {data.results.projects.length > 0 && (
                <div>
                  <p className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-text/40">
                    Projects
                  </p>

                  {data.results.projects.map(
                    (project) => (
                      <div
                        key={project.id}
                        className="rounded-md px-3 py-2 hover:bg-background"
                      >
                        <p className="text-sm text-text">
                          {project.name}
                        </p>

                        {project.description && (
                          <p className="mt-1 truncate text-xs text-text/50">
                            {project.description}
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}

              {/* Tasks */}
              {data.results.tasks.length > 0 && (
                <div className="mt-2">
                  <p className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-text/40">
                    Tasks
                  </p>

                  {data.results.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-md px-3 py-2 hover:bg-background"
                    >
                      <p className="text-sm text-text">
                        {task.title}
                      </p>

                      {task.description && (
                        <p className="mt-1 truncate text-xs text-text/50">
                          {task.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Notes */}
              {data.results.notes.length > 0 && (
                <div className="mt-2">
                  <p className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-text/40">
                    Notes
                  </p>

                  {data.results.notes.map((note) => (
                    <div
                      key={note.id}
                      className="rounded-md px-3 py-2 hover:bg-background"
                    >
                      <p className="text-sm text-text">
                        {note.title}
                      </p>

                      <p className="mt-1 truncate text-xs text-text/50">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* No results */}
              {!isPending &&
                data.results.projects.length === 0 &&
                data.results.tasks.length === 0 &&
                data.results.notes.length === 0 && (
                  <p className="p-4 text-center text-sm text-text/50">
                    No results found.
                  </p>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
