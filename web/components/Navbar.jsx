'use client';

import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center w-full py-3">
      <div className="">
        <Link href="/" className="text-xl font-semibold">Brand</Link>
      </div>
      <div className="flex items-center justify-center gap-x-3">
        {session && (
          <>
            <div className="flex items-center justify-center gap-x-2">
              <Image 
                className="rounded-md "
                src={session.user?.image || '/images/default_avatar.jpeg'} alt="profile image" width={30} height={30} />
              <span className="font-semibold">{session.user?.name}</span>
            </div>
            <button className="btn btn__secondary" onClick={() => signOut()}>Logout</button>
          </>
        )}

      </div>
    </nav >
  )
}
