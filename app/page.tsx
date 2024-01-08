import dynamic from "next/dynamic";

import Notification from "@/components/Notification";

const DynamicNotification = dynamic(() => import("@/components/Notification"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

export default function Home() {
	return (
		<main>
			<DynamicNotification />
		</main>
	);
}
