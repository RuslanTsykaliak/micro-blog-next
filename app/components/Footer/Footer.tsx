import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { Logo } from "../Logo/Logo";
import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Link to the homepage */}
        <Link href="/" className={styles.link_logo}>
          <Logo />
          <span className={styles.name}>Home</span>
        </Link>
        {/* List of contact information and social links */}
        <ul className={styles.linkWrap}>
          <li className={styles.link_item}>
            {/* Email link */}
            <Link href="mailto:ruslan.tsykaliak@gmail.com" target="_blank">
              ruslan.tsykaliak@gmail.com
            </Link>
          </li>
          <li className={styles.link_item}>
            {/* Phone number link */}
            <Link href="tel:+380501501808" target="_blank">
              +38 050 150 18 08
            </Link>
          </li>
          <li className={styles.link_item}>
            {/* GitHub link with Font Awesome icon */}
            <Link href="https://github.com/RuslanTsykaliak" target="_blank">
              <FaGithub size={32} /> {/* Font Awesome GitHub icon */}
            </Link>
          </li>
          <li className={styles.link_item}>
            {/* LinkedIn link with Font Awesome icon */}
            <Link
              href="https://www.linkedin.com/in/ruslan-tsykaliak-09a054232/"
              target="_blank"
            >
              <FaLinkedin size={32} /> {/* Font Awesome LinkedIn icon */}
            </Link>
          </li>
          <li className={styles.link_item}>
            {/* Resume link with an Image */}
            <Link
              href="https://drive.google.com/file/d/1BsHjnFRr5OdDvZ6JXK_3jfy0pPfwyIdK/view"
              target="_blank"
            >
              <Image src="/resume.svg" alt="resume" width={32} height={32} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
