// streaming.ts
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to a totally legit streaming website.</h1>

    <script>
      fetch('http://localhost:3000/savings-account')
        .then(res => res.text())
        .then(data => console.log(data));
    </script>

    <p><a href="">Watch movies</a></p>
    <p><a href="">Watch shows</a></p>
    <p><a href="">Watch specials</a></p>
  `);
});

app.listen(4000);
