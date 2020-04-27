const request = require("supertest")
const { database, server } = require("../../")
const Product = require("../../enterprise_business_rules/entities/product")
const Manager = require("../../enterprise_business_rules/entities/Manager")

describe("POST /products", () => {
  it("should return 201 in case of success", async () => {
    const product = { title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet", price: 399.99 }

    const res = await request(server)
      .post(`/products`)
      .send(product)
      .set("Authorization", "123")

    const persistedProducts = await Product.find()
    expect(persistedProducts).toHaveLength(1)
    expect(persistedProducts[0]).toMatchObject(product)
    expect(res.statusCode).toEqual(201)
  })

  it("should return 422 when attributes are supported but do not satisfy the validations", async () => {
    const res = await request(server)
      .post("/products")
      .send({
        title: "Lorem ipsum",
        description: "Lorem ipsum dolor sit amet",
        price: "INVALID PRICE"
      })
      .set("Authorization", "123")

    expect(res.statusCode).toEqual(422)
  })
})

describe("GET /products", () => {
  it("should return 200 and a list of products in case of success", async () => {
    const product1 = { title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet", price: 100 }
    const product2 = { title: "Duis aute", description: "Duis aute irure dolor", price: 200 }
    await Product.insertMany([product1, product2])

    const res = await request(server).get("/products")

    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toHaveLength(2)
    expect(res.body.data[0]).toMatchObject(product1)
    expect(res.body.data[1]).toMatchObject(product2)
  })

  it("should return 200 and a list of products when filtered by title", async () => {
    const product1 = { title: "Lorem", description: "Lorem ipsum dolor sit amet", price: 100 }
    const product2 = { title: "Duis aute", description: "Duis aute irure dolor", price: 200 }
    const product3 = { title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet", price: 300 }
    await Product.insertMany([product1, product2, product3])

    const res = await request(server).get(`/products?title=Lorem`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toHaveLength(2)
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Lorem" }),
        expect.objectContaining({ title: "Lorem ipsum" }),
      ])
    )
  })

  it("should return 200 and an empty list when no products are found", async () => {
    const res = await request(server).get("/products")

    expect(res.statusCode).toEqual(200)
    expect(res.body.data).toEqual([])
  })
})

describe("GET /products/:id", () => {
  it("should return 200 and a product in case of success", async () => {
    const attributes = { title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet", price: 100 }
    const product = new Product(attributes)
    await product.save()

    const res = await request(server).get(`/products/${product._id}`)

    expect(res.body).toMatchObject(attributes)
    expect(res.statusCode).toEqual(200)
  })

  it("should return 404 when no product was found", async () => {
    const INEXISTENT_OBJECT_ID = "5ea46eaa6ce5314d60b70986"
    const res = await request(server).get(`/products/${INEXISTENT_OBJECT_ID}`)

    expect(res.statusCode).toEqual(404)
  })
})

describe("PUT /products/:id", () => {
  it("should return 204 in case of success", async () => {
    const product = new Product({ title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet", price: 100 })
    await product.save()

    const newProduct = { title: "Lorem ipsum UPDATED", description: "Lorem ipsum dolor sit amet", price: 399.99 }

    const res = await request(server)
      .put(`/products/${product._id}`)
      .send(newProduct)
      .set("Authorization", "123")

    const persistedProducts = await Product.find()
    expect(persistedProducts).toHaveLength(1)
    expect(persistedProducts[0]).toMatchObject(newProduct)
    expect(res.statusCode).toEqual(204)
  })

  it("should return 404 if targeted product was found", async () => {
    const INEXISTENT_OBJECT_ID = "5ea46eaa6ce5314d60b70986"
    const newProduct = { title: "Lorem ipsum UPDATED", description: "Lorem ipsum dolor sit amet", price: 399.99 }

    const res = await request(server)
      .put(`/products/${INEXISTENT_OBJECT_ID}`)
      .send(newProduct)
      .set("Authorization", "123")

    expect(res.statusCode).toEqual(404)
  })
})

describe("DELETE /products/:id", () => {
  it("should return 204 in case of success", async () => {
    const product = new Product({ title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet", price: 100 })
    await product.save()

    const res = await request(server)
      .delete(`/products/${product._id}`)
      .set("Authorization", "123")

    const persistedProducts = await Product.find()
    expect(persistedProducts).toHaveLength(0)
    expect(res.statusCode).toEqual(204)
  })

  it("should return 404 if targeted product was not found", async () => {
    const INEXISTENT_OBJECT_ID = "5ea46eaa6ce5314d60b70986"

    const res = await request(server)
      .delete(`/products/${INEXISTENT_OBJECT_ID}`)
      .set("Authorization", "123")

    expect(res.statusCode).toEqual(404)
  })
})

beforeAll(async () => {
  database.connection.dropDatabase()
  await Manager.create({ name: "admin", token: "123" })
})

afterEach(() => Product.collection.deleteMany({}))
afterAll(() => database.connection.dropDatabase())
