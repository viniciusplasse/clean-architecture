const Product = require("../../../enterprise_business_rules/entities/product")

const addProduct = async (title, description, price) => {
  try {
    return await Product.create({ title, description, price })
  } catch (e) {
    if (e.name == "ValidationError") {
      throw new Error("INVALID_PRODUCT")
    }

    throw new Error(e.message)
  }
}

module.exports = addProduct
