"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const NavBar = ({className} : {className : string}) => {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className={`flex-between flex-row mb-16 pt-3 w-full p-5 bg-gray-800 text-white ${className}`}>
			<div>
				<Link href={"/"} className="flex flex-center gap-2 hover:text-blue-300 transition-colors duration-200">
					Home
				</Link>
			</div>
			<div className="flex-between gap-4">
				{session ? (
					<>
						<div className="hidden md:flex md:items-center md:gap-4">
							<Link href={"/pantryitems"} className="hover:text-blue-300 transition-colors duration-200">
								Pantry Items
							</Link>
							<button onClick={() => signOut({ callbackUrl: "/" })} className="hover:text-blue-300 transition-colors duration-200">
								Sign Out
							</button>
							<p className="text-gray-300">{session.user?.name}</p>
						</div>
						<div className="relative md:hidden">
							<button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
								<Image
									src={session.user?.image ? session.user?.image : "/user.png"}
									alt="User profile picture"
									width={40}
									height={40}
									className="rounded-full"
								/>
							</button>
							{isOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-gray-700 border-2 border-gray-600 rounded-md shadow-2xl py-1 z-10">

									<p className="block px-4 py-2 text-sm text-gray-300">{session.user?.name}</p>

									<Link href={"/pantryitems"} className="block px-4 py-2 text-sm text-white hover:bg-gray-600 transition-colors duration-200">
										Pantry Items
									</Link>
									<button
										onClick={() => signOut({ callbackUrl: "/" })}
										className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 transition-colors duration-200"
									>
										Sign Out
									</button>
								</div>
							)}
						</div>
					</>
					) : (
						<Link href={"/sign-in"} className="flex flex-center gap-2 hover:text-blue-300 transition-colors duration-200">
							Sign In
						</Link>
					)}
				</div>
			</nav>
		);
	};

export default NavBar;