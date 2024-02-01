"use client";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { AuthErrorType, AuthStateT } from "@/types";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const Login = () => {
	const params = useSearchParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<AuthErrorType>({})
	const [authState, setAuthState] = useState<AuthStateT>({
		email: "",
		password: "",
	});

	// submit handler
	const submitHandler = (e: FormEvent<HTMLElement>) => {
		setError({})
		e.preventDefault();
		setLoading(true);
		axios.post("/api/auth/login", authState).then((res)=>{
			 const response = res.data;
				if(response.status == 200){
						alert("Login Successfull")
				}

				else if(response.status == 400){
					setError(response.errors)
				}
		}).catch((error)=>{
			console.log(error)
			setError(error.response.data.errors)
		}).finally(()=>setLoading(false))
	};
	return (
		<main className=" bg-background">
			<section className="w-screen h-screen flex justify-center relative items-center">
				{params.get("message") && (
					<div className="flex justify-center w-full absolute top-10 ">
						<span className="bg-green-200 p-3 mt-20 rounded-lg text-center font-semibold  max-w-md w-full">
							{params.get("message")}
						</span>
					</div>
				)}
				<div className="w-full md:w-1/3 bg-muted h-full md:max-h-max rounded-lg mx-2 p-6">
					{/* Logo */}
					<div className="flex justify-center">
						<Image src={Logo} height={50} width={50} alt="logo" />
					</div>

					<div>
						<h1 className="text-2xl font-bold ">Login</h1>
						<p className="">Welcome Back</p>
					</div>

					{/* Form */}
					<form onSubmit={submitHandler}>
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
							<span className="text-red-300 fontsemibold">{error?.email}</span>
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
							<span className="text-red-300 fontsemibold">{error?.password}</span>
						</div>
						{/* Button */}
						<div className="mt-5">
							<Button className="w-full">Login</Button>
						</div>
					</form>

					<div className="mt-5">
						<span className="">Dont' have an account?</span>
						<Link href="/register" className="text-orange-400 ml-1 font-bold">
							{" "}
							Register
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Login;
