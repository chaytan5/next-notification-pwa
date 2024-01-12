import dynamic from "next/dynamic";

// const DynamicNotification = dynamic(() => import("@/components/Notification"), {
// 	ssr: false,
// 	loading: () => <p>Loading...</p>,
// });

const DynamicNew = dynamic(() => import("@/components/New"), {
	ssr: false,
	loading: () => <p>Loading... please wait</p>,
});

export default function Home() {
	return (
		<main>
			{/* <DynamicNotification /> */}
			<DynamicNew />
		</main>
	);
}
