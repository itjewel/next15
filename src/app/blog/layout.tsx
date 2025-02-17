import Link from "next/link";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Link href="/">Back Home</Link>
        <main>{children}</main>
      </body>
    </html>
  );
}
