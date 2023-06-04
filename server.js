const app = require("./app");
const mongoose = require("mongoose");
const { HOST_DB, PORT } = process.env;
mongoose
  .connect(HOST_DB)
  .then(() =>
    app.listen(PORT, () => console.log(`Database connection successful`))
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
