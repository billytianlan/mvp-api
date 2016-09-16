const handleError = (err, message) => {
  /********************************
    If error has a statusCode property it is an HTTP request error
    Send 503 status code "Error in upstream provider"
    Otherwise it is an error in normalizing the data
    Send 500 status code "Application Error"
  *********************************/
  let statusCode;
  if (err.statusCode) {
    console.log(`${message}: ${err.message}`)
    statusCode = 502;
    message = err.message;
  } else {
    console.log(message);
    statusCode = 500;
    message = message;
  }

  return {
    status: statusCode,
    data: {
      status: statusCode,
      reason: message
    }
  }
}

module.exports = handleError;
