"use client"
import "../app/globals.css"
import React, { useEffect, useState } from "react"
import Logo from "../../public/assets/images/logo-devlinks-large.svg"
import Logo1 from "../../public/assets/images/logo-devlinks-small.svg"
import Person from "../../public/assets/images/icon-profile-details-header.svg"
import LinkIcon from "../../public/assets/images/icon-link.svg"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

const Navbar = () => {
  const pathname = usePathname()
  const [username, setUsername] = useState("")

  useEffect(() => {
    const url = window.location.pathname.split("/")[1]
    setUsername(url || "")
  }, [])
  return (
    <div className="w-full h-[48px] my-5 px-5 flex items-center justify-between max-md:w-full">
      <div className="w-full h-full flex justify-end items-center max-md:w-[30%]">
        <div className="w-full h-full flex justify-start items-center">
          <Image src={Logo} alt="" className="w-auto h-full max-md:hidden" />
          <Image
            src={Logo1}
            alt=""
            className="w-auto h-full max-md:visible md:hidden"
          />
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center gap-10 max-sm:gap-5 ">
        <Link
          href="/dashboard/links"
          className={`w-[122px] h-full ml-2 flex justify-center items-center rounded max-sm:w-14 max-sm:px-0 ${
            pathname === "/dashboard/links"
              ? "active active:bg-[#efebff] active:text-[#633cff]"
              : ""
          }`}

          // {pathname === `${username}/links` ? active:bg-[#efebff] active:text-[#633cff] : ""}
        >
          <div className="w-full flex justify-center items-center">
            <Image src={LinkIcon} alt="" className="w-auto mr-2 max-sm:mr-0" />
            <span className="max-sm:hidden">Links</span>
          </div>
        </Link>
        <Link
          href="/dashboard/profile"
          className={`w-[148px] h-full flex justify-center items-center rounded max-sm:w-14 max-sm:px-0 ${
            pathname === "/dashboard/profile"
              ? "active active:bg-[#efebff] active:text-[#633cff]"
              : ""
          }`}
        >
          <div className="w-full flex justify-center items-center">
            <Image src={Person} alt="" className="" />
            <span className="max-sm:hidden ml-1">Profile Details</span>
          </div>
        </Link>
      </div>
      <div className="w-full h-full flex justify-end items-center max-sm:w-auto max-md:w-[30%]">
        <Link
          href="/dashboard/preview"
          className="w-auto h-full px-10 text-[#633CFF] rounded border border-[#633CFF] flex items-center cursor-pointer max-sm:w-auto max-sm:px-2"
        >
          <div>Preview</div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
