const seeProduct = require("./see_product")
const Product = require("../../../enterprise_business_rules/entities/product")

describe("#seeProduct", () => {
  it("should return product in case of success", async () => {
    const product = new Product({ _id: "id" })
    jest.spyOn(Product, 'findById').mockReturnValue(Promise.resolve(product))

    expect(await seeProduct(product._id)).toEqual(product)
  })

  it("should throw error when no product is found", async () => {
    jest.spyOn(Product, 'findById').mockReturnValue(Promise.resolve(null))

    await expect(() =>
      seeProduct("inexistentId")
    ).rejects.toThrow("PRODUCT_NOT_FOUND")
  })
})
