const fs = require("fs");
module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync("./.cert/key.pem"),
      cert: fs.readFileSync("./.cert/cert.pem"),
    },
    public: "https://localhost:8080/",
  },
};
