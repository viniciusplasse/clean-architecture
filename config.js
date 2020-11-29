const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

module.exports = {
  test: {
    server: {
      port: 9000,
    },
    database: {
      uri: "mongodb://localhost:27017/store_test",
      options: MONGOOSE_OPTIONS,
    }
  },
  dev: {
    server: {
      port: 3000,
    },
    database: {
      uri: "mongodb://localhost:27017/store",
      options: MONGOOSE_OPTIONS,
    }
  },
  prod: {
    server: {
      port: 8080,
    },
    database: {
      uri: "mongodb://henrique:atividade1nfra4ws@ds129233.mlab.com:29233/trabalhoinfra",
      options: MONGOOSE_OPTIONS,
    }
  }
}
