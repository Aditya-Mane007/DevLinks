import React from "react"
import PreviewLink from "./PreviewLink"

const PreviewLinks = ({ links }: { links: any }) => {
  return (
    <>
      {links &&
        links.map((link: any) => <PreviewLink link={link} key={link._id} />)}
    </>
  )
}

export default PreviewLinks
