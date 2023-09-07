import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import { Header } from "./components/Navbar/Header";
import { Footer } from "./components/Footer/Footer"; 
import { Providers } from "./components/Providers/Providers";
import "./globals.css";
import styles from "./page.module.css";

// Define a constant variable for fetch cache control
export const fetchCache = "force-no-store";

// Initialize the Poppins font with specific subsets and weights
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

// Define metadata for the page
export const metadata: Metadata = {
  title: "Micro Blog",
  description: "The Home page of Micro Blog",
};

// Define the RootLayout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
        style={{ backgroundColor: "rgb(45, 55, 72)" }}
      >
        {/* Wrap the content in the Providers component */}
        <Providers>
          <div className="main_wrapper">
            {/* Include the Header component */}
            <Header />
            {/* Render the main content */}
            <main className={styles.main}>{children}</main>
            {/* Include the Footer component */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}