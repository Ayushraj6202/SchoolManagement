import React from "react";
import { Link } from "react-router-dom";
export default function Home(){
    return (
        <>
            <div className="my-4">
            <div className="mb-6">
                            <Link to="/" className="block">
                                <img
                                    src="https://lh3.googleusercontent.com/p/AF1QipOlzxSsMysyPCpbaqy7InFZxJ7UoHXACp8TqEY=s1360-w1360-h1020"
                                    alt="logo"
                                    className="w-full h-[500px] object-contain"
                                />
                            </Link>
                        </div>
            </div>
        </>
    )
}