import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema";

const yoga = createYoga({
	schema,
	graphiql: true,
});
const server = createServer(yoga);

server.listen(4000, () => {
	console.info("Server is running on http://localhost:4000/graphql");
});
