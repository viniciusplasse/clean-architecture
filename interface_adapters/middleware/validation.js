const { ObjectId } = require("mongoose").Types

const SUPPORTED_ATTRIBUTES = { title: true, description: true, price: true }
const SUPPORTED_FILTERS = { limit: true, offset: true, title: true }

class ValidationMiddleware {
  static create(req, res, next) {
    acceptOnlySupported(SUPPORTED_ATTRIBUTES, req.body)
  }

  static update(req, res, next) {
    acceptOnlySupported(SUPPORTED_ATTRIBUTES, req.body)
  }

  static index(req, res, next) {
    acceptOnlySupported(SUPPORTED_FILTERS, req.query)

    const title = req.query.title
    const limit = parseInt(req.query.limit) || 10
    const offset = parseInt(req.query.offset) || 0

    if (limit && limit > 50) throw new Error("LIMIT_TOO_HIGH")
    if (title && title.length > 25) throw new Error("TITLE_FILTER_TOO_LARGE")
    if (title && title != title.replace(/[^a-z0-9 ]/gi, "")) throw new Error("TITLE_MUST_BE_ALPHANUMERIC")

    req.query.limit = parseInt(limit)
    req.query.offset = parseInt(offset)

    next()
  }

  static show(req, res, next) {
    validateObjectId(req.params.id)
    next()
  }

  static delete(req, res, next) {
    validateObjectId(req.params.id)
    next()
  }
}

const acceptOnlySupported = (supported, received) => {
  const receivedParams = Object.keys(received)

  if (receivedParams.length > 3) {
    throw new Error("TOO_MUCH_PARAMS")
  }

  receivedParams.forEach((param) => {
    if (!supported[param]) throw new Error("UNSUPPORTED_PARAM")
  })
}

const validateObjectId = (id) => {
  if (id && !ObjectId.isValid(id)) {
    throw new Error("INVALID_OBJECT_ID")
  }
}

module.exports = ValidationMiddleware
