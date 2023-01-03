import { Agent } from "@aries-framework/core";

type TempAgent = Agent<{}>;
interface WithAgent {
	agent: TempAgent;
}

export class ServiceWithAgent implements WithAgent {
	agent: TempAgent;

	constructor(agent: TempAgent) {
		this.agent = agent;
	}
}
