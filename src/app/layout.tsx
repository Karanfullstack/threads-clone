import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomSession from "./(authPages)/CustomSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Threads",
	description: "Threads is a social media platform for sharing text posts.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<CustomSession>{children}</CustomSession>
			</body>
		</html>
	);
}
