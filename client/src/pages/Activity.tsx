import { useActivities } from "../hook/useActivities";

const Activity = () => {
  const { data, isPending, isError } = useActivities();

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-text/60">
          Loading activity...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="text-sm text-text/60">
          Failed to load activity.
        </p>
      </div>
    );
  }

  const activities = data.activities;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-text">
          Activity
        </h1>

        <p className="mt-1 text-sm text-text/60">
          Keep track of what has happened in your workspace.
        </p>
      </div>

      {/* Activity list */}
      <div className="rounded-lg border border-border bg-surface">
        <div className="border-b border-border p-6">
          <h2 className="text-lg font-medium text-text">
            Activity History
          </h2>

          <p className="mt-1 text-sm text-text/50">
            {activities.length}{" "}
            {activities.length === 1
              ? "activity"
              : "activities"}
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-text/50">
              No activity yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm text-text">
                      {activity.action}{" "}
                      {activity.entity_type}
                    </p>

                    <p className="mt-1 text-xs text-text/50">
                      {new Date(
                        activity.created_at,
                      ).toLocaleString()}
                    </p>
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

export default Activity;
