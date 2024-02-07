import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import BaseComponent from "@/components/base/BaseComponent";
export const metadata: Metadata = {
	title: "Threads",
	description: "Threads is a social media platform for sharing text posts.",
};

export default function FrontLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<BaseComponent>{children}</BaseComponent>
			<Toaster />
		</ThemeProvider>
	);
}
