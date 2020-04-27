const Product = require("../../../enterprise_business_rules/entities/product")

const searchForProducts = (title) => {
  return Product.find({ title: { $regex: title } })
}

module.exports = searchForProducts
