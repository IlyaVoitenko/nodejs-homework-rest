const errorMesages = {
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const ErrorHttp = (status, massage = errorMesages[status]) => {
  const error = new Error(massage);
  error.status = status;
  throw error;
};

module.exports = ErrorHttp;
