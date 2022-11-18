import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send({ id: 123, price: 4000 });
});

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
