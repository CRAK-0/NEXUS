import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiSearchLine } from "@remixicon/react";

import { useSearch } from "../../hook/useSearch.ts";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const {
    data,
    isPending,
    isError,
  } = useSearch(query);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
    setQuery("");
    setIsOpen(false);
  };

  const handleTaskClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
    setQuery("");
    setIsOpen(false);
  };

  const handleNoteClick = () => {
    navigate("/notes");
    setQuery("");
    setIsOpen(false);
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div
      ref={searchRef}
      className="relative w-full max-w-md"
    >
      {/* Search input */}

      <div
        className="flex h-10 items-center rounded-lg border border-border bg-surface transition-colors focus-within:border-text/30"
        onClick={() => {
          if (hasQuery) {
            setIsOpen(true);
          }
        }}
      >
        <RiSearchLine
          size={17}
          className="ml-3 shrink-0 text-text/40"
        />

        <input
          type="text"
          value={query}
          onFocus={() => {
            if (hasQuery) {
              setIsOpen(true);
            }
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          placeholder="Search workspace..."
          className="h-full w-full bg-transparent px-3 text-sm text-text outline-none placeholder:text-text/35"
        />
      </div>

      {/* Search results */}

      {hasQuery && isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-border bg-surface">
          {/* Loading */}

          {isPending && (
            <div className="px-4 py-5 text-center">
              <p className="text-sm text-text/50">
                Searching...
              </p>
            </div>
          )}

          {/* Error */}

          {isError && (
            <div className="px-4 py-5 text-center">
              <p className="text-sm text-text/50">
                Search failed.
              </p>
            </div>
          )}

          {/* Results */}

          {data && (
            <div className="max-h-96 overflow-y-auto p-2">
              {/* Projects */}

              {data.results.projects.length > 0 && (
                <div>
                  <p className="px-3 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wider text-text/35">
                    Projects
                  </p>

                  <div className="space-y-1">
                    {data.results.projects.map(
                      (project) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() =>
                            handleProjectClick(
                              Number(project.id),
                            )
                          }
                          className="w-full rounded-md px-3 py-2.5 text-left transition-colors hover:bg-background"
                        >
                          <p className="truncate text-sm font-medium text-text">
                            {project.name}
                          </p>

                          {project.description && (
                            <p className="mt-1 truncate text-xs text-text/40">
                              {project.description}
                            </p>
                          )}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Tasks */}

              {data.results.tasks.length > 0 && (
                <div
                  className={
                    data.results.projects.length > 0
                      ? "mt-3 border-t border-border pt-2"
                      : ""
                  }
                >
                  <p className="px-3 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wider text-text/35">
                    Tasks
                  </p>

                  <div className="space-y-1">
                    {data.results.tasks.map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() =>
                          handleTaskClick(
                            task.project_id,
                          )
                        }
                        className="w-full rounded-md px-3 py-2.5 text-left transition-colors hover:bg-background"
                      >
                        <p className="truncate text-sm font-medium text-text">
                          {task.title}
                        </p>

                        {task.description && (
                          <p className="mt-1 truncate text-xs text-text/40">
                            {task.description}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}

              {data.results.notes.length > 0 && (
                <div
                  className={
                    data.results.projects.length > 0 ||
                    data.results.tasks.length > 0
                      ? "mt-3 border-t border-border pt-2"
                      : ""
                  }
                >
                  <p className="px-3 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wider text-text/35">
                    Notes
                  </p>

                  <div className="space-y-1">
                    {data.results.notes.map((note) => (
                      <button
                        key={note.id}
                        type="button"
                        onClick={handleNoteClick}
                        className="w-full rounded-md px-3 py-2.5 text-left transition-colors hover:bg-background"
                      >
                        <p className="truncate text-sm font-medium text-text">
                          {note.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-text/40">
                          {note.content}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}

              {!isPending &&
                data.results.projects.length === 0 &&
                data.results.tasks.length === 0 &&
                data.results.notes.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <RiSearchLine
                      size={20}
                      className="mx-auto text-text/30"
                    />

                    <p className="mt-2 text-sm text-text/50">
                      No results found
                    </p>

                    <p className="mt-1 text-xs text-text/30">
                      Try searching for another term.
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
