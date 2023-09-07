"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useEffect } from "react";

// Define metadata for the error page
export const metadata: Metadata = {
    title: "Something went wrong",
    description: "Please try again",
};

// Error component that receives error and reset function as props
export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    // Log the error to the console for debugging
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                {/* Display a heading indicating an error */}
                <h2>Something went wrong</h2>
                {/* Provide a message to the user */}
                <p>
                    Sorry, we encountered an error. Please try again.
                </p>
                {/* Button to allow the user to retry */}
                <button onClick={() => reset()}>Try again</button>
                {/* Link to return to the Home page */}
                <Link href='/'>Return to the Home page</Link>
            </body>
        </html>
    );
}
