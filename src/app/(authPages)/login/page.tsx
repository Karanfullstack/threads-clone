"use client";

import LoginComponent from "@/components/LoginComponent";
import { Suspense } from "react";

const Login = () => {
	return (
		<Suspense fallback="loading...">
			<LoginComponent />
		</Suspense>
	);
};

export default Login;
