const express = require("express")
const env = process.env.NODE_ENV
const config = require("../../config")[env]
const ProductsController = require("../../interface_adapters/controllers/products")
const ErrorMiddleware = require("../../interface_adapters/middleware/error")
const AuthMiddleware = require("../../interface_adapters/middleware/auth")
const ValidationMiddleware = require("../../interface_adapters/middleware/validation")

class Express {
  static start() {
    const app = express()

    app.use(express.json())

    app.post("/products", AuthMiddleware.authenticate, ProductsController.create)
    app.get("/products", ValidationMiddleware.index, ProductsController.index)
    app.get("/products/:id", ValidationMiddleware.show, ProductsController.show)
    app.put("/products/:id", AuthMiddleware.authenticate, ProductsController.update)
    app.delete("/products/:id", AuthMiddleware.authenticate, ProductsController.destroy)

    app.use(ErrorMiddleware.handler)

    app.listen(config.server.port, () => {
      console.log(`Express server running on port ${config.server.port}`)
    })

    return app
  }
}

module.exports = Express
