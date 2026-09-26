import { useActivities } from "../../hook/useActivities.ts";
import { RiTimeLine } from "@remixicon/react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import GlowBorder from "../ui/GlowBorder.tsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const RecentActivity = () => {
  const { data, isPending, isError } = useActivities();
  const activityRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
  const activity = activityRefs.current;

  if (!activity.length) return;

  gsap.fromTo(
    activity,
    {
      x: 60,
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
          Recent Activity
        </h2>
      </div>

      <div className="divide-y divide-border">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 px-6 py-4"
          >
            <Skeleton className="mt-0.5 size-8 shrink-0 rounded-md" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-28" />
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
            Recent Activity
          </h2>
        </div>

        <div className="p-6">
          <p className="text-sm text-text/50">
            Unable to load activity.
          </p>
        </div>
      </div>
    );
  }

  const activities = data.activities;

  return (
    <GlowBorder>
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-medium text-text">
          Recent Activity
        </h2>
      </div>

      <div className="divide-y divide-border">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
  <div className="flex size-10 items-center justify-center rounded-md border border-border bg-background">
    <RiTimeLine className="size-5 text-text/40" />
  </div>

  <p className="mt-3 text-sm font-medium text-text">
    No activity yet
  </p>

  <p className="mt-1 max-w-xs text-xs text-text/40">
    Your workspace activity will appear here.
  </p>
</div>
        ) : (
          activities.slice(0, 5).map((activity,index) => (
            <div
              key={activity.id}
               ref={(el) => {
    activityRefs.current[index] = el;
  }}
              className="flex items-start gap-3 px-6 py-4"
            >
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                <RiTimeLine className="size-4 text-text/50" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-text">
                  {activity.action}{" "}
                  <span className="text-text/60">
                    {activity.entity_type}
                  </span>
                </p>

                <p className="mt-1 text-xs text-text/40">
                  {new Date(activity.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </GlowBorder>
  );
};

export default RecentActivity;