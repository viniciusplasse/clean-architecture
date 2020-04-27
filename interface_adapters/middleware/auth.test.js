const AuthMiddleware = require("./auth")
const { system } = require("../../application_business_rules/use_cases")

describe("#authenticate", () => {
  it("should send status 401 when MANAGER_NOT_FOUND is raised", () => {
    const req = { headers: { authorization: "token" } }
    const res = { status: jest.fn(), send: jest.fn() }

    jest.spyOn(system, 'findManager').mockImplementation(() => {
      throw new Error("MANAGER_NOT_FOUND")
    })

    AuthMiddleware.authenticate(req, res, null)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.send).toHaveBeenCalledWith({ message: "MANAGER_NOT_FOUND" })
  })
})