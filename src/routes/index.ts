import { Router } from "express";
import userRouter from "./users/index.js";
import productRouter from "./products/index.js";

const routes = Router();

routes.use("/api/users", userRouter);
routes.use("/api/products", productRouter);

export default routes;
