import dotenv from "dotenv";
import { initServer } from "./server";
dotenv.config();

const port = Number(process.env.PORT) || 8000;
initServer(port);
