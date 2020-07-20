export default (error, req, res, next) => {
  console.log(error);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stacktrace: process.env.NODE_ENV === 'production' ? '🍖' : error.stack,
  });
}