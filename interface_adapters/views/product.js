class ProductView {
  static render(product) {
    const { id, title, description, price, createdAt, updatedAt } = product

    return {
      id,
      title,
      description,
      price,
      createdAt,
      updatedAt
    }
  }

  static renderMany(products, pagination) {
    return {
      data: products.map(p => this.render(p)),
      pagination
    }
  }
}

module.exports = ProductView
