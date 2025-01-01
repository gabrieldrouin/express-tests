import { Router } from "express";
import userRouter from "./users/index.js";
import productRouter from "./products/index.js";
import authRouter from "./users/auth/index.js";

const routes = Router();

routes.use("/api/users", userRouter);
routes.use("/api/products", productRouter);
routes.use("/api/users/auth", authRouter);

export default routes;
