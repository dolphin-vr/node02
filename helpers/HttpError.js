class HttpError extends Error {
   constructor(status, message){
      super(message);
      this.status = status;
   }
}

export default HttpError;

// const HttpError = (status, message) => {
//    const error = new Error(message);
//    error.status = status;
//    return error;
// };
