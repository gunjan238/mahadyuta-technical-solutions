import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Scroll } from "lucide-react";
import ScrollToTopButton from "./ScrollToTopButton";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <div style={{ height: 64 }} />
    <Header />
    <main className="flex-1">{children}</main>
    <ScrollToTopButton />
    <Footer />
  </div>
);

export default Layout;
