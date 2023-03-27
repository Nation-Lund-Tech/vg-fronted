import { PropsWithChildren } from "react";

interface Props {
    signedIn: Boolean
}

export default function Layout({ children, signedIn }: PropsWithChildren<Props>) {
  return (

    <div>
        <p>Hej</p>
        {signedIn ? "Signed in": "Not signed in"}
        {children}
        <p>då</p>
    </div>
  )
}
