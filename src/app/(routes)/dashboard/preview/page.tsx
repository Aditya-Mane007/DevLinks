"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import PreviewLinks from "@/components/PreviewLinks"
import axios from "axios"
import Image from "next/image"

const Preview = () => {
  const [links, setLinks] = useState([])
  const [data, setData] = useState({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    profileImage: ""
  })

  const getData = async () => {
    const res = await axios.get("/api/auth/getMe")

    setData({
      _id: res.data._id,
      email: res.data.email,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      username: res.data.username,
      profileImage: res.data.profileImage
    })
  }

  const getLink = async () => {
    const res = await axios.get("/api/links/read")
    setLinks(res.data.links)
  }

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link)
  }

  useEffect(() => {
    getLink()
    getData()
  }, [])
  return (
    <div className="w-full h-full bg-neutral-50 relative">
      <div className="top-div bg-[#633CFF] w-full h-[375px] rounded-bl-[50px] rounded-br-[50px] py-5">
        <div className="navbar bg-white w-[98%] h-[78px] mx-auto rounded flex justify-between items-center px-8">
          <Link
            href="/dashboard/links"
            className="btn rounded w-auto px-5 h-[46px] flex items-center cursor-pointer border border-[#633CFF] text-[#633CFF] font-bold"
          >
            Back to Editor
          </Link>
          <div
            // href={`/share/${data.username}`}
            className="copy-btn rounded w-auto px-5 h-[46px] flex items-center cursor-pointer text-white bg-violet-600 font-bold"
            onClick={(e) => {
              const btn = document.querySelector(".copy-btn")!
              btn.innerHTML = "Copied!"
              // e.target.innerHTML = "Copied!"
              copyLink(
                // `https://devlinks.onrender.com/${user && user.username}`
                `http://localhost:3000/share/${data.username}`
              )
            }}
          >
            Share Link
          </div>
        </div>
      </div>
      <div className="card bg-white w-[349px] h-auto absolute top-52 left-0 right-0 m-auto px-14 py-12  rounded-[15px] border">
        <div className="w-full h-auto flex flex-col justify-center items-center gap-5 bg-[#EEEEE]">
          <div className="image w-[104px] h-[104px]">
            <Image
              src={data.profileImage}
              alt="Hero"
              className="w-full h-full rounded-full"
              height={100}
              width={100}
            />
          </div>
          <div className="name font-extrabold text-3xl">
            {data && data.firstName} {data && data.lastName}
          </div>
          <div className="email text-neutral-500">{data && data.email}</div>
        </div>
        <div className="w-full h-auto my-5">
          <PreviewLinks links={links} />
        </div>
      </div>
    </div>
  )
}

export default Preview