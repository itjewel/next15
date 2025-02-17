import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Link href="/">Back Home</Link>
      <main>{children}</main>
    </>
  );
}
