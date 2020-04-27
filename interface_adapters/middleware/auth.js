const { system } = require("../../application_business_rules/use_cases")
const ErrorView = require("../views/error")

class AuthMiddleware {
  static async authenticate(req, res, next) {
    const { authorization } = req.headers

    try {
      await system.findManager(authorization)
      next()
    } catch (err) {
      res.status(401)
      res.send(ErrorView.render(err))
    }
  }
}

module.exports = AuthMiddleware
