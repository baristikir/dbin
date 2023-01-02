import { Agent } from "@aries-framework/core";

interface WithAgent {
	agent: Agent;
}

export class ServiceWithAgent implements WithAgent {
	agent: Agent;

	constructor(agent: Agent) {
		this.agent = agent;
	}
}
