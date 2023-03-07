export function EmptyConnections() {
	return (
		<div className="h-24 w-full max-w-md rounded-md bg-gray-50 p-4 dark:bg-gray-800">
			<h6 className="font-medium">No Connections Found</h6>
			<p>No available connections found in agent.</p>
		</div>
	);
}

export function EmptyCredentials() {
	return (
		<div className="h-24 w-full max-w-md rounded-md bg-gray-50 p-4 dark:bg-gray-800">
			<h6 className="font-medium">No Credentials Available</h6>
			<p>No available credentials found in agent secret storage.</p>
		</div>
	);
}
