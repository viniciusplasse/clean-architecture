const Product = require("../../../enterprise_business_rules/entities/product")

const seeProduct = async (id) => {
    const product = await Product.findById(id)

    if (!product) throw new Error("PRODUCT_NOT_FOUND")

    return product
}

module.exports = seeProduct
