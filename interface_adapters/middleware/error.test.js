const ErrorMiddleware = require("./error")

describe("#handler", () => {
  it("should send status 400 when TOO_MUCH_PARAMS is raised", () => {
    const res = { status: jest.fn(), send: jest.fn() }
    const err = new Error("TOO_MUCH_PARAMS")

    ErrorMiddleware.handler(err, null, res, null)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ message: "TOO_MUCH_PARAMS" })
  })

  it("should send status 400 when UNSUPPORTED_PARAM is raised", () => {
    const res = { status: jest.fn(), send: jest.fn() }
    const err = new Error("UNSUPPORTED_PARAM")

    ErrorMiddleware.handler(err, null, res, null)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ message: "UNSUPPORTED_PARAM" })
  })

  it("should send status 400 when INVALID_OBJECT_ID is raised", () => {
    const res = { status: jest.fn(), send: jest.fn() }
    const err = new Error("INVALID_OBJECT_ID")

    ErrorMiddleware.handler(err, null, res, null)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ message: "INVALID_OBJECT_ID" })
  })

  it("should send status 400 when LIMIT_TOO_HIGH is raised", () => {
    const res = { status: jest.fn(), send: jest.fn() }
    const err = new Error("LIMIT_TOO_HIGH")

    ErrorMiddleware.handler(err, null, res, null)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ message: "LIMIT_TOO_HIGH" })
  })

  it("should send status 400 when TITLE_FILTER_TOO_LARGE is raised", () => {
    const res = { status: jest.fn(), send: jest.fn() }
    const err = new Error("TITLE_FILTER_TOO_LARGE")

    ErrorMiddleware.handler(err, null, res, null)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ message: "TITLE_FILTER_TOO_LARGE" })
  })

  it("should send status 400 when TITLE_MUST_BE_ALPHANUMERIC is raised", () => {
    const res = { status: jest.fn(), send: jest.fn() }
    const err = new Error("TITLE_MUST_BE_ALPHANUMERIC")

    ErrorMiddleware.handler(err, null, res, null)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({ message: "TITLE_MUST_BE_ALPHANUMERIC" })
  })

  it("should send status 404 when PRODUCT_NOT_FOUND is raised", () => {
    const res = { status: jest.fn(), send: jest.fn() }
    const err = new Error("PRODUCT_NOT_FOUND")

    ErrorMiddleware.handler(err, null, res, null)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({ message: "PRODUCT_NOT_FOUND" })
  })

  it("should send status 422 when INVALID_PRODUCT is raised", () => {
    const res = { status: jest.fn(), send: jest.fn() }
    const err = new Error("INVALID_PRODUCT")

    ErrorMiddleware.handler(err, null, res, null)

    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith({ message: "INVALID_PRODUCT" })
  })

  it("should send status 500 when another error is raised", () => {
    const res = { status: jest.fn(), send: jest.fn() }
    const err = new Error("message")

    ErrorMiddleware.handler(err, null, res, null)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith({ message: "message" })
  })
})