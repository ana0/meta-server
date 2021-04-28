const logger = (req, res, next) => {
  console.log(req.body);
  console.log(req.params);
  next();
};

export default logger;
