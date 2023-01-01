import { Agent } from "@aries-framework/core";

export class AgentServices {
	agent: Agent;

	constructor(agent: Agent) {
		this.agent = agent;
	}
}
