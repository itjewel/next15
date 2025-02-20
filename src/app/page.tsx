import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 text-color-600 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ul>
        <li>
          <Link href="/server">Server Componet</Link>
        </li>
        <li>
          <Link href="/client">Client Componet</Link>
        </li>
      </ul>
    </div>
  );
}
