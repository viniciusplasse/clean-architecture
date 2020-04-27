const Product = require("../../../enterprise_business_rules/entities/product")

const seeNumberOfProducts = () => {
  return Product.countDocuments()
}

module.exports = seeNumberOfProducts
