import dotenv from "dotenv";
dotenv.config();
import { initServer } from "./server";

const port = Number(process.env.PORT) || 8001;
initServer(port);
