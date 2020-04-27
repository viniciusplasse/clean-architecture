const ValidationMiddleware = require("./validation")

describe("#index", () => {
  it("should throw error when there are too many params", () => {
    const req = { params: {}, query: { a: 1, b: 2, c: 3, d: 4 } }

    expect(() =>
      ValidationMiddleware.index(req, null, null)
    ).toThrow("TOO_MUCH_PARAMS")
  })

  it("should throw error when some param not supported", () => {
    const req = { params: {}, query: { foo: "bar" } }

    expect(() =>
      ValidationMiddleware.index(req, null, null)
    ).toThrow("UNSUPPORTED_PARAM")
  })

  it("should throw error when pagination limit is above 50", () => {
    const req = { params: {}, query: { limit: 51 } }

    expect(() =>
      ValidationMiddleware.index(req, null, null)
    ).toThrow("LIMIT_TOO_HIGH")
  })

  it("should throw error when title filter has more than 25 characters", () => {
    const req = { params: {}, query: { title: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" } }

    expect(() =>
      ValidationMiddleware.index(req, null, null)
    ).toThrow("TITLE_FILTER_TOO_LARGE")
  })

  it("should throw error when title filter contains non-alphanumeric characters", () => {
    const req = { params: {}, query: { title: "1=1;/rgx/" } }

    expect(() =>
      ValidationMiddleware.index(req, null, null)
    ).toThrow("TITLE_MUST_BE_ALPHANUMERIC")
  })
})

describe("#show", () => {
  it("should throw error when id is not a valid mongo id", () => {
    const req = { params: { id: "foo" }, query: {} }

    expect(() =>
      ValidationMiddleware.show(req, null, null)
    ).toThrow("INVALID_OBJECT_ID")
  })
})