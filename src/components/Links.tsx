"use client"
import React from "react"
import Link from "./Link"

const Links = ({ links, getLinks }: { links: any; getLinks: any }) => {
  return (
    <>
      {links?.map((link: any, index: number) => (
        <Link link={link} index={index} key={link._id} getLinks={getLinks} />
      ))}
    </>
  )
}

export default Links
