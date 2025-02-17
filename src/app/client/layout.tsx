import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Link href="/">Back Home</Link>
      <main>{children}</main>
    </>
  );
};

export default Layout;
