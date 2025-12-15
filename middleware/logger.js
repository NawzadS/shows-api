function requestLogger(req, res, next) {
  const time = new Date().toISOString();
  console.log(${time} -  );
  next();
}

module.exports = { requestLogger };
