const Product = require("../../../enterprise_business_rules/entities/product")

const listProducts = () => {
  return Product.find()
}

module.exports = listProducts
