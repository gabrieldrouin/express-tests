// bank.ts
import express from "express";
const app = express();

const savings = "42$";

app.get("/savings-account", (req, res) => {
  res.send(savings);
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to your bank.</h1>
    <p>Savings account: ${savings}</p>
  `);
});

app.listen(3000);
