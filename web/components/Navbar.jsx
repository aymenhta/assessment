'use client';

import Link from "next/link"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center w-full py-3">
      <div className="">
        <Link href="/" className="text-xl font-semibold">Brand</Link>
      </div>
      <div className="flex items-center justify-center gap-x-3">
        {session ? (
          <>
            <div className="flex items-center justify-center gap-x-2">
              <Image 
                className="rounded-md "
                src={session.user?.image} alt="profile image" width={30} height={30} />
              <span className="font-semibold">{session.user?.name}</span>
            </div>
            <button className="btn btn__danger" onClick={() => signOut()}>Logout</button>
          </>
        ) : (
          <>
              <button className="btn btn__primary" onClick={() => signIn('github')}>Sign-in with github</button>
              <button className="btn btn__secondary" onClick={() => signIn('google')}>Sign-in with google</button>
          </>
        )}



      </div>
    </nav >
  )
}
