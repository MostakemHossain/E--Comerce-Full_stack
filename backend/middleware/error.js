const ErrorHandler = require("../utils/ErrorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found in this id...Invilid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  // error jwt error
  if(err.name==='JsonWebTokenError'){
    const message=`Your URL is invilid please try again later`;
    err = new ErrorHandler(message, 400);
  }
  // jwt expired
  if(err.name==='JsonWebTokenError'){
    const message=`Your URL is invilid please try again later`;
    err = new ErrorHandler(message, 400);
  }
  if(err.name==="TokenExpiredError"){
    const message="Session Expired Please Login Again"
    err = new ErrorHandler(message, 400);

  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  })
};
