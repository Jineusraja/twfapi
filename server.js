const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes/index");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());



app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
