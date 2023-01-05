export const CONNECTION_REQUEST = "connection_request";
export const CONNECTION_ACCEPTED = "connection_accepted";
export const CONNECTION_REJECTED = "connection_rejected";
export const CONNECTION_CLOSED = "connection_closed";

export const CONNECTION_TOPICS = [
	CONNECTION_REQUEST,
	CONNECTION_ACCEPTED,
	CONNECTION_REJECTED,
	CONNECTION_CLOSED,
] as const;
