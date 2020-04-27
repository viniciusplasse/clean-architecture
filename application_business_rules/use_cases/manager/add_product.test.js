const addProduct = require("./add_product")
const Product = require("../../../enterprise_business_rules/entities/product")

describe("#addProduct", () => {
  it("should save a product on the database in case of success", async () => {
    jest.spyOn(Product, 'create').mockReturnValue(Promise.resolve())

    await addProduct("title", "description", 200)

    expect(Product.create).toHaveBeenCalledWith({
      title: "title",
      description: "description",
      price: 200
    })
  })

  it("should throw error when price is invalid", async () => {
    jest.spyOn(Product, 'create').mockImplementation(() => {
      const error = new Error()
      error.name = "ValidationError"

      throw error
    })

    await expect(() =>
      addProduct("title", "description", "invalidPrice")
    ).rejects.toThrow("INVALID_PRODUCT")
  })

  it("should throw error when insertion fails", async () => {
    jest.spyOn(Product, 'create').mockImplementation(() => {
      throw new Error()
    })

    await expect(() =>
      addProduct("title", "description", "price")
    ).rejects.toThrow("UNEXPECTED_ERROR_ADD_PRODUCT")
  })
})
