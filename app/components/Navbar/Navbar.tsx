"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.css";

// Define the Navbar component
export const Navbar = () => {
  // Fetch the user session using useSession()
  const session = useSession();
  const { status } = session;

  // Access the user's role from the session data, if available
  const role = session?.data?.user?.data?.role;

  // If the session status is "loading," show a loading message
  if (status === "loading") {
    // Handle loading state, e.g., show a loading spinner
    return <div>Loading...</div>;
  }

  return (
    <nav className={styles.navWrap}>
      {/* Conditionally render navigation links based on user session and role */}
      {session && role === "author" && (
        <div className={styles.link_wrap}>
          <Link href="/blog" className={styles.link}>
            Feed
          </Link>
          <Link href="/blog/authfeed" className={styles.link}>
            Auth feed
          </Link>
        </div>
      )}
      {session && role === "commentator" && (
        <div>
          <Link href="/blog">Feed</Link>
        </div>
      )}
      {/* Conditionally render links for unauthenticated users */}
      {status === "unauthenticated" && (
        <>
          <Link href="/registration">Registration</Link>
          <Link href="/login">Login</Link>
        </>
      )}
      {/* Conditionally render a logout button for authenticated users */}
      {status === "authenticated" && (
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={styles.logoutBtn}
        >
          Logout
        </button>
      )}
    </nav>
  );
};
