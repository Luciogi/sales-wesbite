import { Nav } from "./navbar";
import Foot from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="md:container md:mx-auto">
        <Nav />
        <main>{children}</main>
        <Foot />
      </main>
    </>
  );
}
