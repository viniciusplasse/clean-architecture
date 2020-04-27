const removeProduct = require("./remove_product")
const Product = require("../../../enterprise_business_rules/entities/product")

describe("#removeProduct", () => {
  it("should remove the product from the database", async () => {
    const product = new Product({ _id: "id" })

    jest.spyOn(Product, 'findByIdAndDelete').mockReturnValue(Promise.resolve(product))

    await removeProduct(product._id)

    expect(Product.findByIdAndDelete).toHaveBeenCalledWith(product._id)
  })

  it("should throw error when no product is found", async () => {
    jest.spyOn(Product, 'findByIdAndDelete').mockReturnValue(Promise.resolve(null))

    await expect(() =>
      removeProduct("inexistentId")
    ).rejects.toThrow("PRODUCT_NOT_FOUND")
  })
})
