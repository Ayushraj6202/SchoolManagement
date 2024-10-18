import React from 'react';

export default function Loading() {
    return (
        <div className="flex justify-center items-center w-screen h-screen p-5 bg-white dark:bg-gray-800">
            <svg
                className="animate-spin h-12 w-12 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
            >
                <circle
                    className="opacity-25"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M25 5a20 20 0 0 1 0 40 20 20 0 0 1 0-40z"
                />
            </svg>
        </div>
    );
}
