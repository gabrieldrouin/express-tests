// broker.ts
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to your broker.</h1>
    <p>Amount available to invest: <span id="amount"></span></p>

    <script>
      fetch('http://localhost:3000/savings-account')
        .then(res => res.text())
        .then(data => {
          document.getElementById('amount').textContent = data;
        });
    </script>
  `);
});

app.listen(5000);
