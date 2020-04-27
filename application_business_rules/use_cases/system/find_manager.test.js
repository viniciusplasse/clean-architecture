const findManager = require("./find_manager")
const Manager = require("../../../enterprise_business_rules/entities/manager")

describe("#findManager", () => {
  it("should return a manager", async () => {
    const managerMock = new Manager({ name: "Henrique", token: "123" })
    jest.spyOn(Manager, 'findOne').mockReturnValue(Promise.resolve(managerMock))

    const manager = await findManager("123")

    expect(manager).toEqual(managerMock)
    expect(Manager.findOne).toHaveBeenCalledWith({ token: "123" })
  })

  it("should throw error when no manager is found", async () => {
    jest.spyOn(Manager, 'findOne').mockReturnValue(Promise.resolve(null))

    await expect(() =>
      findManager("inexistentToken")
    ).rejects.toThrow("MANAGER_NOT_FOUND")
  })
})
