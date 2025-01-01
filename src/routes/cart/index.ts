import { Router } from "express";
import { UserBody } from "#utils/constants.js";

const cartRouter = Router();

interface Product {
  product: string;
}

declare module "express-session" {
  interface SessionData {
    user: UserBody;
    cart: Record<string, number>;
  }
}

cartRouter.post("/", (req, res) => {
  if (!req.session.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  const { product } = req.body as Product;
  if (!req.session.cart) {
    req.session.cart = {};
    req.session.cart[product] = 1;
  } else {
    req.session.cart[product] += 1;
  }

  res.sendStatus(200);
});

cartRouter.get("/", (req, res) => {
  if (!req.session.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  res.status(200).send(req.session.cart);
});

export default cartRouter;
