import { Nav } from "./navbar";
import  Foot  from "./footer";

export default function Layout({children}) {
    return (
        <>
            <Nav/>
                <main>
                    { children } 
                </main>
            <Foot/>
        </>
    );
}