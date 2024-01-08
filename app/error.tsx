"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
	return (
		<div>
			<p>message: {error.message}</p>
			<p>name: {error.name}</p>
		</div>
	);
};

export default error;
