import { ReactNode } from "react";

interface Children {
  children: ReactNode;
}
const Layout = ({ children }: Children) => {
  return <div>{children}</div>;
};

export default Layout;
