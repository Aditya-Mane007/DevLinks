import React from "react"
import Link from "next/link"

const PreviewLink = ({ link }: { link: any }) => {
  const background = link.platform.toLowerCase().replace(" ", "")

  return (
    <Link
      href={link.url}
      target="_blank"
      className={`w-full h-14 bg-black my-2 rounded-lg text-white flex justify-start items-center px-5 cursor-pointer`}
    >
      {link.platform}
    </Link>
  )
}

export default PreviewLink
