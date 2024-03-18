const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes/index");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/api/calculate-delivery", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Delivery Partner REST API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin: 40px;
                }
                h1 {
                    color: #0275d8;
                }
                p {
                    margin: 20px auto;
                    max-width: 600px;
                }
                a {
                    display: inline-block;
                    background-color: #0275d8;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                a:hover {
                    background-color: #025aa5;
                }
                footer {
                    margin-top: 40px;
                    font-size: 0.8em;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to REST API Project</h1>
            <p>This project is about a delivery partner using the most optimized way to ensure delivery is faster with adequate cost.</p>
            <a href="https://deliverypartnerrestapi.onrender.com/api/calculate-delivery" target="_blank">Test API using Postman</a>
            <footer>
                © Aryan Tripathi
            </footer>
        </body>
        </html>
    `);
});

app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
