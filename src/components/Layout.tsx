import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}