const { customer, manager } = require("../../application_business_rules/use_cases")
const ProductView = require("../views/product")

class ProductsController {
  static async create(req, res) {
    const { title, description, price } = req.body

    await manager.addProduct(title, description, price)

    res.sendStatus(201)
  }

  static async index(req, res) {
    const { title, limit, offset } = req.query
    const pagination = await getPaginationInfo(limit, offset)
    const products = await getProducts(title).limit(limit).skip(offset)

    res.status(200).send(ProductView.renderMany(products, pagination))
  }

  static async show(req, res) {
    const { id } = req.params
    const product = await customer.seeProduct(id)

    res.status(200).send(ProductView.render(product))
  }

  static async update(req, res) {
    const { id } = req.params
    const { title, description, price } = req.body

    await manager.editProduct(id, title, description, price)

    res.sendStatus(204)
  }

  static async destroy(req, res) {
    const { id } = req.params

    await manager.removeProduct(id)

    res.sendStatus(204)
  }
}

const getProducts = (titleFilter) => {
  return titleFilter
    ? customer.searchForProducts(titleFilter)
    : customer.listProducts()
}

const getPaginationInfo = async (limit, offset) => {
  return {
    limit,
    offset,
    total: await customer.seeNumberOfProducts()
  }
}

module.exports = ProductsController
