export const validate = (schema, source) => {
  return (req, res, next) => {
    // validation here
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: `Invalid ${source} parameters`,
        errors,
      });
    }
    req.validated = {
      ...req.validated,
      [source]: result.data,
    };
    next();
  };
};
