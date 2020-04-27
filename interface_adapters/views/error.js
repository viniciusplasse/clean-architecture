class ErrorView {
  static render(error) {
    const { message } = error

    return { message }
  }
}

module.exports = ErrorView
