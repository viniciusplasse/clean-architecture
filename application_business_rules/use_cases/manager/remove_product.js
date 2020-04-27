const Product = require("../../../enterprise_business_rules/entities/product")

const removeProduct = async (id) => {
  const removedProduct =  await Product.findByIdAndDelete(id)

  if (!removedProduct) throw new Error("PRODUCT_NOT_FOUND")
}

module.exports = removeProduct
