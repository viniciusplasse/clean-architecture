const Product = require("../../../enterprise_business_rules/entities/product")

const editProduct = async (id, title, description, price) => {
  const product = await Product.findByIdAndUpdate(id, { title, description, price })

  if (!product) throw new Error("PRODUCT_NOT_FOUND")
}

module.exports = editProduct
