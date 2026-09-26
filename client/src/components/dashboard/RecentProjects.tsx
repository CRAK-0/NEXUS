import { useProjects } from "../../hook/useProjects.ts";
import { RiFolderLine } from "@remixicon/react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import GlowBorder from "../ui/GlowBorder.tsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const RecentProjects = () => {
  const {
    data,
    isPending,
    isError,
  } = useProjects();

  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
  const projects = projectRefs.current;

  if (!projects.length) return;

  gsap.fromTo(
    projects,
    {
      x: -60,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.35,
      ease: "power3.out",
    },
  );
}, []);

  if (isPending) {
  return (
    <div className="rounded-xl border border-border bg-surface">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-medium text-text">
          Recent Projects
        </h2>
      </div>

      <div className="divide-y divide-border">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 px-6 py-4"
          >
            <Skeleton className="size-8 rounded-md" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

  if (isError) {
    return (
      <div className="rounded-xl border border-border bg-surface">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-sm font-medium text-text">
            Recent Projects
          </h2>
        </div>

        <div className="p-6">
          <p className="text-sm text-text/50">
            Unable to load projects.
          </p>
        </div>
      </div>
    );
  }

  const projects = data.projects.projects;

  return (
    <GlowBorder>
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-medium text-text">
          Recent Projects
        </h2>
      </div>

      <div className="divide-y divide-border">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
  <div className="flex size-10 items-center justify-center rounded-md border border-border bg-background">
    <RiFolderLine className="size-5 text-text/40" />
  </div>

  <p className="mt-3 text-sm font-medium text-text">
    No projects yet
  </p>

  <p className="mt-1 max-w-xs text-xs text-text/40">
    Create your first project to start organizing your workspace.
  </p>
</div>
        ) : (
          projects.slice(0, 5).map((project,index) => (
            <div
              key={project.id}
              ref={(el) => {
    projectRefs.current[index] = el;
  }}
              className="flex items-center gap-3 px-6 py-4"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                <RiFolderLine className="size-4 text-text/50" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm text-text">
                  {project.name}
                </p>

                <p className="mt-1 text-xs capitalize text-text/40">
                  {project.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </GlowBorder>
  );
};

export default RecentProjects;