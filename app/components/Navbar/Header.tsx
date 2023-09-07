import Link from "next/link";
import { FC } from "react";
import { Logo } from "../Logo/Logo";
import { Navbar } from "./Navbar";
import styles from "./Heder.module.css";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Next.js Link syntax with an object */}
        <Link href="/" className={styles.link_logo}> {/* <a> tag within Link */}
            <Logo />
            <span className={styles.name}>Home</span>
        </Link>
        <Navbar />
      </div>
    </header>
  );
};