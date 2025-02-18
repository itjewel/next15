import { ReactNode } from "react";

interface ShopLayoutProps {
  children: ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="bg-blue-100 p-4">
      <nav className="p-2 bg-white shadow-md">🛒 Shop Navigation</nav>
      <main>{children}</main>
    </div>
  );
}
