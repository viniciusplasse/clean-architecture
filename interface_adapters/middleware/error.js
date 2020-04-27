require('express-async-errors')
const ErrorView = require("../views/error")

class ErrorMiddleware {
  static handler(err, req, res, next) {
    switch (err.message) {
      case "TOO_MUCH_PARAMS":
      case "UNSUPPORTED_PARAM":
      case "INVALID_OBJECT_ID":
      case "LIMIT_TOO_HIGH":
      case "TITLE_FILTER_TOO_LARGE":
      case "TITLE_MUST_BE_ALPHANUMERIC":
        res.status(400)
        break;
      case "PRODUCT_NOT_FOUND":
        res.status(404)
        break;
      case "INVALID_PRODUCT":
        res.status(422)
        break;
      default:
        res.status(500)
    }

    res.send(ErrorView.render(err))
  }
}

module.exports = ErrorMiddleware
