import React from "react";
import { Link } from "react-router-dom";
import AllAdmins from "./AllAdmins";
export default function Home() {
    return (
        <>
            <div>
                {/* <div className="mb-6"> */}
                    <AllAdmins />
                {/* </div> */}
            </div>
        </>
    )
}