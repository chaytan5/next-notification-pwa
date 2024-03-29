import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Serwist example";
const APP_DESCRIPTION = "This is an example of using Serwist with Next.js";

export const metadata: Metadata = {
	applicationName: "Next PWA",
	title: {
		default: "Next PWA",
		template: "%s - PWA App",
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_NAME,
	},
	formatDetection: {
		telephone: false,
	},
	icons: {
		shortcut: "/favicon.ico",
		apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
	},
};

export const viewport: Viewport = {
	themeColor: "#FFFFFF",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
