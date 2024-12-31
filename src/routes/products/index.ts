import { Router } from "express";

const productRouter = Router();

interface Cookies {
  name?: string;
  name2?: string;
}

productRouter.get("/", (req, res) => {
  const cookies = req.signedCookies as Cookies;
  if (cookies.name) console.log(cookies.name);
  if (cookies.name2) console.log(cookies.name2);

  const product = { id: "1", name: "keyboard", quantity: 42 };
  res.send(product);
});
export default productRouter;
