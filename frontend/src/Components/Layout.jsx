import React from "react";
import { useSelector } from "react-redux";

export default function Layout({ children, role, status = false }) {
    const admin = useSelector((state) => state.admin);
    if (role === 'SuperAdmin' && admin.role === 'SuperAdmin') {
        return (
            <>{children}</>
        )
    }
    if (status && admin.status) {
        return (
            <>{children}</>
        )
    }
    if (!status && !admin.status) {
        return (
            <>{children}</>
        )
    }
    return (
        <>
            <div className="h-screen flex justify-center bg-blue-300 text-4xl p-2">You are Not authorised</div>
        </>
    )
}