const listProducts = require("./customer/list_products")
const searchForProducts = require("./customer/search_for_products")
const seeProduct = require("./customer/see_product")
const seeNumberOfProducts = require("./customer/see_number_of_products")
const addProduct = require("./manager/add_product")
const editProduct = require("./manager/edit_product")
const removeProduct = require("./manager/remove_product")
const findManager = require("./system/find_manager")

module.exports = {
  customer: {
    listProducts,
    searchForProducts,
    seeProduct,
    seeNumberOfProducts,
  },
  manager: {
    addProduct,
    editProduct,
    removeProduct,
  },
  system: {
    findManager,
  }
}
