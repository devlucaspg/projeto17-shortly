import cors from "cors";
import express from "express";
import urlRoutes from "./routers/urlRouter.js";
import authRoutes from "./routers/authRouter.js";
import userRoutes from "./routers/userRouter.js";
import rankingRoutes from "./routers/rankingRouter.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use(urlRoutes);
server.use(authRoutes);
server.use(userRoutes);
server.use(rankingRoutes);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server running in port: ${port}`));
