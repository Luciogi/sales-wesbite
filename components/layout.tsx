import { Nav } from "./navbar";
import Foot from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <main class="md:container md:mx-auto">
        <Nav />
        <main>{children}</main>
        <Foot />
      </main>
    </>
  );
}

