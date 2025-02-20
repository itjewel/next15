import { ReactNode } from "react";

interface ServiceLayout {
  children: ReactNode;
}
const Layout = ({ children }: ServiceLayout) => {
  return (
    <div>
      <h1>Header</h1>
      {children}
    </div>
  );
};

export default Layout;
