import { useActivities } from "../../hook/useActivities.ts";

const RecentActivity = () => {
  const { data, isPending, isError } = useActivities();

  if (isPending) {
    return (
      <div className="rounded-lg border border-border bg-surface">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-medium text-text">
            Recent Activity
          </h2>
        </div>

        <div className="p-5">
          <p className="text-sm text-text/50">
            Loading activity...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-border bg-surface">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-medium text-text">
            Recent Activity
          </h2>
        </div>

        <div className="p-5">
          <p className="text-sm text-text/50">
            Unable to load activity.
          </p>
        </div>
      </div>
    );
  }

  const activities = data.activities;

  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-sm font-medium text-text">
          Recent Activity
        </h2>
      </div>

      <div className="p-5">
        {activities.length === 0 ? (
          <p className="text-sm text-text/50">
            No activity yet.
          </p>
        ) : (
          <div className="space-y-3">
            {activities.slice(0, 5).map((activity) => (
              <div key={activity.id}>
                <p className="text-sm text-text">
                  {activity.action} {activity.entity_type}
                </p>

                <p className="text-xs text-text/50">
                  {new Date(activity.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;