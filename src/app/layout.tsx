import Link from "next/link";
import { ReactNode } from "react";
// import "tailwindcss";
import "./globals.css";

interface Children {
  children: ReactNode;
}

const Layout = ({ children }: Children) => {
  return (
    <html>
      <body>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <h2>Root Layout</h2>
        {children}
      </body>
    </html>
  );
};

export default Layout;
