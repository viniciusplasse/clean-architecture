const editProduct = require("./edit_product")
const Product = require("../../../enterprise_business_rules/entities/product")

describe("#editProduct", () => {
  it("should update the product stored on the database", async () => {
    const product = new Product({
      _id: "id",
      title: "title",
      description: "description",
      price: 200
    })

    jest.spyOn(Product, 'findByIdAndUpdate').mockReturnValue(Promise.resolve(product))

    await editProduct(product._id, "newTitle", "newDescription", 200)

    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(product._id, {
      title: "newTitle",
      description: "newDescription",
      price: 200
    })
  })

  it("should throw error when no product is found", async () => {
    jest.spyOn(Product, 'findByIdAndUpdate').mockReturnValue(Promise.resolve(null))

    await expect(() =>
      editProduct("inexistentId", {
        title: "any",
        description: "any",
        price: 200
      })
    ).rejects.toThrow("PRODUCT_NOT_FOUND")
  })
})
