import { globalSearch } from "../services/search.service.js";
export const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Search query is required" });
    }
    const results = await globalSearch(req.user.id, q.trim());
    res.json({ success: true, query: q.trim(), results });
  } catch (error) {
    next(error);
  }
};
