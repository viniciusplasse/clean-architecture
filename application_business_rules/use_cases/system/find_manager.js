const Manager = require("../../../enterprise_business_rules/entities/manager")

const findManager = async (token) => {
  const manager = await Manager.findOne({ token })

  if (!manager) throw new Error("MANAGER_NOT_FOUND")

  return manager
}

module.exports = findManager
