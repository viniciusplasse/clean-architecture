const searchForProducts = require("./search_for_products")
const Product = require("../../../enterprise_business_rules/entities/product")

describe("#searchForProducts", () => {
  it("should return a list of products that match the search", async () => {
    const match = new Product({ title: "abc" })
    const notAMatch = new Product({ title: "def" })
    const otherMatch = new Product({ title: "abcdef" })

    jest.spyOn(Product, 'find').mockReturnValue(Promise.resolve([match, otherMatch]))

    const products = await searchForProducts("abc")

    expect(products).toEqual([match, otherMatch])
    expect(Product.find).toHaveBeenCalledWith({ title: { $regex: "abc" }})
  })

  it("should return an empty list when no product is found", async () => {
    jest.spyOn(Product, 'find').mockReturnValue(Promise.resolve([]))

    expect(await searchForProducts()).toEqual([])
  })
})
