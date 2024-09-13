import express from "express";
import router from "./routes/indexRouter";
import cors from "cors";
import morgan from "morgan";

const server = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
};

server.use(cors(corsOptions));
server.use(express.json());

server.use(morgan('dev'));

server.use(router);

export default server;
