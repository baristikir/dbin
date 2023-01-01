import { initServer } from "./server";

const port = Number(process.env.PORT) || 8000;
initServer(port);
