"use client";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { AuthErrorType, AuthStateT } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
	const router = useRouter();

	console.log(status);
	const [loading, setLoading] = useState<boolean>(false);
	const [authState, setAuthState] = useState<AuthStateT>({
		email: "",
		password: "",
		name: "",
		username: "",
		password_confirmation: "",
	});
	const [error, setError] = useState<AuthErrorType>({});

	// submit handler
	const submitHandler = (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		setLoading(true);
		setError({});

		axios
			.post("/api/auth/register", authState)
			.then((res) => {
				const response = res.data;
				if (response.status == 200) {
					console.log(response);
					router.push(`/login?message=${response.message}`);
				} else if (response.status == 400) {
					setError(response.errors);
				}
			})
			.catch((error) => {
				console.log(error.response.status);
				setError(error.response.data.errors);
			})
			.finally(() => setLoading(false));
	};
	return (
		<main className=" bg-background">
			<section className="w-screen h-screen flex justify-center items-center">
				<div className="w-full md:w-1/3 bg-muted h-full md:max-h-max rounded-lg mx-2 p-6">
					{/* Logo */}
					<div className="flex justify-center">
						<Image src={Logo} height={50} width={50} alt="logo" />
					</div>

					<div>
						<h1 className="text-2xl font-bold ">Register</h1>
						<p className="">Welcome To Threads</p>
					</div>

					{/* Form */}
					<form onSubmit={submitHandler}>
						{/* name */}
						<div className="mt-5">
							<Label htmlFor="name">Name</Label>
							<Input
								type="text"
								placeholder="Enter Your Name"
								id="name"
								onChange={(e) =>
									setAuthState({ ...authState, name: e.target.value })
								}
							/>
							<span className="text-red-400 text-xs font-bold">
								{error?.name}
							</span>
						</div>
						{/* username */}
						<div className="mt-5">
							<Label htmlFor="username">Username</Label>
							<Input
								type="text"
								placeholder="Enter Your Username"
								id="username"
								onChange={(e) =>
									setAuthState({ ...authState, username: e.target.value })
								}
							/>
							<span className="text-red-400 text-xs font-bold">
								{error?.username}
							</span>
						</div>
						{/* email */}
						<div className="mt-5">
							<Label htmlFor="email">Email</Label>
							<Input
								type="text"
								placeholder="Enter Your Email"
								id="email"
								onChange={(e) =>
									setAuthState({ ...authState, email: e.target.value })
								}
							/>
							<span className="text-red-400 text-xs font-bold">
								{error?.email}
							</span>
						</div>
						{/* password */}
						<div className="mt-5">
							<Label htmlFor="password">Password</Label>
							<Input
								type="password"
								placeholder="Enter Your Password"
								id="password"
								onChange={(e) =>
									setAuthState({ ...authState, password: e.target.value })
								}
							/>
							<span className="text-red-400 text-xs font-bold">
								{error?.password}
							</span>
						</div>
						{/* confirm password */}
						<div className="mt-5">
							<Label htmlFor="password">Confirm Your Password</Label>
							<Input
								type="password"
								placeholder="Confirm Your Password"
								id="confirm_password"
								onChange={(e) =>
									setAuthState({
										...authState,
										password_confirmation: e.target.value,
									})
								}
							/>
						</div>
						{/* Button */}
						<div className="mt-5">
							<Button disabled={loading} className="w-full">
								{loading ? "Loading...." : "Login"}
							</Button>
						</div>
					</form>

					<div className="mt-5">
						<span className="">Have an account?</span>
						<Link href="/login" className="text-orange-400 ml-1 font-bold">
							{" "}
							Login
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Register;
