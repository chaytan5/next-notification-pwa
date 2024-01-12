"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useSubscribe } from "react-pwa-push-notifications";
import toast, { Toaster } from "react-hot-toast";
// import TextInput from "./components/Input";
import axios from "axios";
import { uuid } from "uuidv4";

// in PROD use from .env
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;

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

	const { getSubscription } = useSubscribe({
		publicKey: PUBLIC_KEY,
	});

	const onSubmitSubscribe = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setLoadingSubscribe(true);

			try {
				const subscription = await getSubscription();
				console.log(subscription);
				await axios.post("/api/subscribe", {
					subscription: subscription,
					id: subscribeId,
				});
				toast.success("Subscribe success");
			} catch (e: any) {
				console.warn(e);
				toast(e.errorCode);
			} finally {
				setLoadingSubscribe(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[getSubscription]
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
		// FingerprintJS.load()
		// 	.then((fp) => fp.get())
		// 	.then((result) => {
		// 		setSubscribeId(result.visitorId);
		// 		setPushId(result.visitorId);
		// 	});

		const id = uuid();
		setSubscribeId(id);
		setPushId(id);
	}, []);

	return (
		<div className="">
			<div className="space-y-10 p-6 max-w-screen-sm mx-auto">
				<div>
					<div className="space-y-4">
						<div className="text-3xl text-slate-800 font-semibold text-center">
							NextJS PWA
						</div>
						<p className="text-xl text-center text-balance">
							You need to install the site on your home screen. Subscribe to
							push notifications. Then you can test sending notifications.
						</p>
					</div>
					{/* <div
						className={"qrCode"}
						dangerouslySetInnerHTML={{ __html: qrCode }}
					/> */}
				</div>
				<div className="grid grid-cols-2 gap-4 place-items-center">
					<div className="">
						<button
							className={`rounded px-4 py-2 border border-slate-400 ${
								showSubscribe ? "bg-slate-300" : "bg-white"
							}`}
							onClick={onShowSubscribe}
						>
							Subscribe
						</button>
					</div>
					<div>
						<button
							className={`rounded px-4 py-2 border border-slate-400 ${
								!showSubscribe ? "bg-slate-300" : "bg-white"
							}`}
							onClick={onShowPush}
						>
							Push
						</button>
					</div>
				</div>
				{!showSubscribe && (
					<div className="">
						<form className="grid grid-cols-1 gap-6" onSubmit={onSubmitPush}>
							<div className="text-lg text-center">Notification</div>
							<input
								className="border border-slate-500 py-2 px-4 rounded"
								id="idSubscribe"
								placeholder="id"
								value={pushId}
								onChange={onChange(setPushId)}
							/>
							<input
								className="border border-slate-500 py-2 px-4 rounded"
								id="title"
								placeholder="title"
								value={title}
								onChange={onChange(setTitle)}
							/>
							<input
								className="border border-slate-500 py-2 px-4 rounded"
								id="message"
								placeholder="message"
								value={message}
								onChange={onChange(setMessage)}
							/>
							<button
								className="px-4 py-2 bg-slate-700 text-white rounded hover:opacity-80 transition"
								type="submit"
							>
								{loadingPush ? "loading" : "Send"}
							</button>
						</form>
					</div>
				)}
				{showSubscribe && (
					<div className="">
						<form
							className="grid grid-cols-1 gap-4 place-items-center"
							onSubmit={onSubmitSubscribe}
						>
							<div className="w-full flex gap-2 items-center">
								<label htmlFor="fingerprint" className="text-lg">
									Your ID:
								</label>
								<input
									className="flex-grow px-4 py-2 border border-slate-500 rounded"
									id="fingerprint"
									placeholder="Your id"
									value={subscribeId}
									onChange={onChange(setSubscribeId)}
								/>
							</div>
							<button
								className="px-4 py-2 bg-slate-700 text-white rounded hover:opacity-80 transition"
								type="submit"
							>
								{loadingSubscribe ? "loading" : "Subscribe"}
							</button>
						</form>
					</div>
				)}
				<div>{/* <Links /> */}</div>
			</div>
			<Toaster />
		</div>
	);
}

export default App;
