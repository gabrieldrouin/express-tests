import { Router } from "express";

import cartRouter from "./cart/index.js";
import productRouter from "./products/index.js";
import authRouter from "./users/auth/index.js";
import userRouter from "./users/index.js";

const routes = Router();

routes.use("/api/users", userRouter);
routes.use("/api/products", productRouter);
routes.use("/api/users/auth", authRouter);
routes.use("/api/cart", cartRouter);

export default routes;
