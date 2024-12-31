import { Router } from "express";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  res.send({ id: "1", name: "keyboard", quantity: 42 });
});

export default productRouter;
