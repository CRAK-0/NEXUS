import { getActivitiesForUser } from "../services/activities.service.js";

export const getActivities = async (req, res, next) => {
  try {
    const activities = await getActivitiesForUser(req.user.id);

    res.json({
      success: true,
      activities,
    });
  } catch (error) {
    next(error);
  }
};
