const listProducts = require("./list_products")
const Product = require("../../../enterprise_business_rules/entities/product")

describe("#listProducts", () => {
  it("should return a list of products", async () => {
    const products = [new Product(), new Product(), new Product()]
    jest.spyOn(Product, 'find').mockReturnValue(Promise.resolve(products))

    expect(await listProducts()).toEqual(products)
  })

  it("should return an empty list when no product is found", async () => {
    jest.spyOn(Product, 'find').mockReturnValue(Promise.resolve([]))

    expect(await listProducts()).toEqual([])
  })
})
