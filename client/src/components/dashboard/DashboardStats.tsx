import { useProjects } from "../../hook/useProjects.ts";
import { useNotes } from "../../hook/useNotes.ts";
import { useAllTasks } from "../../hook/useAllTasks.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

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
    isError: tasksError,
  } = useAllTasks();

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projectCount =
    projectsData?.projects.pagination.total ?? 0;

  const taskCount = tasksData?.tasks.length ?? 0;

  const noteCount = notesData?.notes.length ?? 0;

  // Card entrance animation
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(
      ".dashboard-stat-card",
    );

    gsap.set(cards[0], {
      y: 80,
      opacity: 0,
    });

    gsap.set(cards[1], {
      y: 80,
      opacity: 0,
    });

    gsap.set(cards[2], {
      y: 80,
      opacity: 0,
    });

    gsap.to(cards[0], {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(cards[1], {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    });

    gsap.to(cards[2], {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 1,
    });
  }, []);

  // Moving border glow
  useEffect(() => {
    const lines = gsap.utils.toArray<SVGRectElement>(
      ".dashboard-glow-line",
    );

    const animations = lines.map((line) => {
      gsap.set(line, {
        strokeDashoffset: 0,
        opacity: 0,
      });

      return gsap.to(line, {
        strokeDashoffset: -100,
        duration: 3,
        ease: "none",
        repeat: -1,
        paused: true,
      });
    });

    const cleanups = cardRefs.current.map((card, index) => {
      if (!card) return undefined;

      const animation = animations[index];
      const line = lines[index];

      const handleEnter = () => {
        gsap.to(line, {
          opacity: 1,
          duration: 0.2,
        });

        animation.play();
      };

      const handleLeave = () => {
        animation.pause();

        gsap.to(line, {
          opacity: 0,
          duration: 0.2,
        });
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);

      return () => {
        card.removeEventListener("mouseenter", handleEnter);
        card.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup?.());
      animations.forEach((animation) => animation.kill());
    };
  }, []);

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Projects */}
      <div
        ref={(el) => {
          cardRefs.current[0] = el;
        }}
        className="dashboard-stat-card dashboard-glow-card relative rounded-xl border border-border bg-surface p-6"
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
  <filter
    id="glow"
    x="-100%"
    y="-100%"
    width="300%"
    height="300%"
  >
    <feGaussianBlur
      stdDeviation="3"
      result="blur"
    />

    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>
          <rect
            className="dashboard-glow-line"
            filter="url(#glow)"
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="12"
            fill="none"
            stroke="#E7E9ED"
            strokeWidth="1"
            pathLength="100"
            strokeDasharray="8 92"
            strokeDashoffset="0"
          />
        </svg>

        <p className="text-sm font-medium text-text/60">
          Projects
        </p>

        <div className="mt-2 text-4xl font-semibold tracking-tight text-text">
          {projectsPending ? (
            <Skeleton className="h-10 w-16" />
          ) : projectsError ? (
            "-"
          ) : (
            projectCount
          )}
        </div>

        <p className="mt-1 text-xs text-text/40">
          Total projects
        </p>
      </div>

      {/* Tasks */}
      <div
        ref={(el) => {
          cardRefs.current[1] = el;
        }}
        className="dashboard-stat-card dashboard-glow-card relative rounded-xl border border-border bg-surface p-6"
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
  <filter
    id="glow"
    x="-100%"
    y="-100%"
    width="300%"
    height="300%"
  >
    <feGaussianBlur
      stdDeviation="3"
      result="blur"
    />

    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>
          <rect
            className="dashboard-glow-line"
            filter="url(#glow)"
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="12"
            fill="none"
            stroke="#E7E9ED"
            strokeWidth="1"
            pathLength="100"
            strokeDasharray="8 92"
            strokeDashoffset="0"
          />
        </svg>

        <p className="text-sm font-medium text-text/60">
          Tasks
        </p>

        <div className="mt-2 text-4xl font-semibold tracking-tight text-text">
          {tasksPending ? (
            <Skeleton className="h-10 w-16" />
          ) : tasksError ? (
            "-"
          ) : (
            taskCount
          )}
        </div>

        <p className="mt-1 text-xs text-text/40">
          Total tasks
        </p>
      </div>

      {/* Notes */}
      <div
        ref={(el) => {
          cardRefs.current[2] = el;
        }}
        className="dashboard-stat-card dashboard-glow-card relative rounded-xl border border-border bg-surface p-6"
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
  <filter
    id="glow"
    x="-100%"
    y="-100%"
    width="300%"
    height="300%"
  >
    <feGaussianBlur
      stdDeviation="3"
      result="blur"
    />

    <feMerge>
      <feMergeNode in="blur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>
          <rect
            className="dashboard-glow-line"
            filter="url(#glow)"
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="12"
            fill="none"
            stroke="#E7E9ED"
            strokeWidth="1"
            pathLength="100"
            strokeDasharray="8 92"
            strokeDashoffset="0"
          />
        </svg>

        <p className="text-sm font-medium text-text/60">
          Notes
        </p>

        <div className="mt-2 text-4xl font-semibold tracking-tight text-text">
          {notesPending ? (
            <Skeleton className="h-10 w-16" />
          ) : notesError ? (
            "-"
          ) : (
            noteCount
          )}
        </div>

        <p className="mt-1 text-xs text-text/40">
          Total notes
        </p>
      </div>
    </section>
  );
};

export default DashboardStats;