"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useSubscribe } from "react-pwa-push-notifications";
import toast, { Toaster } from "react-hot-toast";
// import TextInput from "./components/Input";
import axios from "axios";
// import Links from "./components/Links";
// import { QRCode, QRSvg } from "sexy-qr";

// in PROD use from .env
const PUBLIC_KEY = process.env.PUBLIC_KEY;

function App() {
	const [loadingSubscribe, setLoadingSubscribe] = useState<boolean>(false);
	const [loadingPush, setLoadingPush] = useState<boolean>(false);
	const [pushId, setPushId] = useState<string>("");
	const [message, setMessage] = useState<string>("World");
	const [title, setTitle] = useState<string>("Hello");
	const [subscribeId, setSubscribeId] = useState<string>("");
	const [showSubscribe, setShowSubscribe] = useState<boolean>(true);

	const onShowSubscribe = () => {
		setShowSubscribe(true);
	};
	const onShowPush = () => {
		setShowSubscribe(false);
	};

	// const qrCode = useMemo(() => {
	// 	const qr = new QRCode({
	// 		content: window.location.href,
	// 		ecl: "M",
	// 	});
	// 	return new QRSvg(qr, {
	// 		fill: "#182026",
	// 		cornerBlocksAsCircles: true,
	// 		size: 200,
	// 		radiusFactor: 0.75,
	// 		cornerBlockRadiusFactor: 2,
	// 		roundOuterCorners: true,
	// 		roundInnerCorners: true,
	// 	}).svg;
	// }, []);

	console.log(PUBLIC_KEY);
	const { getSubscription } = useSubscribe({
		publicKey:
			"BEY8-HDPGU44GHHbF95zfqovsjwJrTD4g9G-X85Vvj25BqknU2wEyzoxsNoKc09u0a9aaLf5-C5y_NHrVI9Ytec",
	});

	const onSubmitSubscribe = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setLoadingSubscribe(true);
			console.log("here");

			try {
				console.log("1");
				const subscription = await getSubscription();
				// console.log(Errors);
				console.log(subscription);
				await axios.post("/api/subscribe", {
					subscription: subscription,
					id: subscribeId,
				});
				toast.success("Subscribe success");
			} catch (e) {
				console.warn(e);
				toast.error("Details console");
				console.log(e);
			} finally {
				setLoadingSubscribe(false);
			}
		},
		[getSubscription, subscribeId]
	);

	const onSubmitPush = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setLoadingPush(true);
			try {
				await axios.post("/api/send", {
					message,
					title,
					id: pushId,
				});
				toast.success("Push success");
			} catch (e) {
				toast.error("Error in console");
			} finally {
				setLoadingPush(false);
			}
		},
		[pushId, message, title]
	);

	const onChange = useCallback(
		(setState: React.Dispatch<React.SetStateAction<string>>) =>
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setState(e.target.value);
			},
		[]
	);

	useEffect(() => {
		FingerprintJS.load()
			.then((fp) => fp.get())
			.then((result) => {
				setSubscribeId(result.visitorId);
				setPushId(result.visitorId);
			});
	}, []);

	return (
		<div>
			<main className="space-y-10">
				<div>
					<div className="message">
						<div className="title"> Use as PWA</div>
						<div>
							You need to install the site on your home screen. Subscribe to
							push notifications. Then you can test sending notifications.
						</div>
					</div>
					{/* <div
						className={"qrCode"}
						dangerouslySetInnerHTML={{ __html: qrCode }}
					/> */}
				</div>
				<div className="tabs">
					<div className={`tab-item`}>
						<button
							className={`tab ${showSubscribe ? "active" : ""}`}
							onClick={onShowSubscribe}
						>
							Subscribe
						</button>
					</div>
					<div className={`tab-item`}>
						<button
							className={`tab ${!showSubscribe ? "active" : ""}`}
							onClick={onShowPush}
						>
							Push
						</button>
					</div>
				</div>
				{!showSubscribe && (
					<div className="send">
						<form onSubmit={onSubmitPush}>
							<div className="title">Notification</div>
							<input
								id="idSubscribe"
								placeholder="id"
								value={pushId}
								onChange={onChange(setPushId)}
							/>
							<input
								id="title"
								placeholder="title"
								value={title}
								onChange={onChange(setTitle)}
							/>
							<input
								id="message"
								placeholder="message"
								value={message}
								onChange={onChange(setMessage)}
							/>
							<button
								className="px4 py-2 bg-indigo-500 text-white"
								type="submit"
							>
								{loadingPush ? "loading" : "Send"}
							</button>
						</form>
					</div>
				)}
				{showSubscribe && (
					<div className="outline outline-lime-500">
						<form
							className="grid grid-cols-1 gap-4 place-items-center"
							onSubmit={onSubmitSubscribe}
						>
							<div className="">Your Id</div>
							<input
								className="border border-red-400 w-fit px-4 py-2"
								id="fingerprint"
								placeholder="Your id"
								value={subscribeId}
								onChange={onChange(setSubscribeId)}
							/>
							<button className="" type="submit">
								{loadingSubscribe ? "loading" : "Send"}
							</button>
						</form>
					</div>
				)}
				<div>{/* <Links /> */}</div>
			</main>
			<Toaster />
		</div>
	);
}

export default App;
