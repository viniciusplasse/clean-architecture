const seeNumberOfProducts = require("./see_number_of_products")
const Product = require("../../../enterprise_business_rules/entities/product")

describe("#seeNumberOfProducts", () => {
  it("should return number of products in the store", async () => {
    jest.spyOn(Product, 'countDocuments').mockReturnValue(Promise.resolve(100))

    expect(await seeNumberOfProducts()).toEqual(100)
  })
})
