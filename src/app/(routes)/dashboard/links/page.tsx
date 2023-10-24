"use client"
import React, { useEffect, useState } from "react"
import Screen from "../../../../../public/assets/images/illustration-phone-mockup.svg"
import Empty from "../../../../../public/assets/images/illustration-empty.svg"
import LinkIcon from "../../../../../public/assets/images/icon-link.svg"
import toast from "react-hot-toast"
import Image from "next/image"
import axios from "axios"
import LinksComponent from "../../../../components/Links"
import Navbar from "@/components/Navbar"

function page() {
  const [links, setLinks] = useState([])
  const [linkState, setLinkState] = useState({
    platform: "Github",
    url: "",
    username: ""
  })

  const { platform, url } = linkState

  const onChange = (e: any) => {
    setLinkState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  //
  const submitHandler = async (e: any) => {
    e.preventDefault()

    if (!url) {
      const error = e.target.url.nextSibling
      const input = e.target.url
      const label = e.target.url.labels[0]

      label.style.color = "red"
      input.style.borderColor = "red"
      error.style.display = "block"
      error.style.color = "red"

      setTimeout(() => {
        label.style.color = "black"
        input.style.borderColor = "#e5e7eb"
        error.style.display = "none"
        error.style.color = "red"
      }, 3000)
    } else {
      const checkUrl = new URL(url)

      if (
        checkUrl.host.split(".")[0].trim().toLowerCase() ===
        platform.trim().toLowerCase().split(" ").join("")
      ) {
        try {
          const res = await axios.post("/api/links/create", {
            platform,
            url
          })

          toast.success("Link created successfully")
        } catch (error: any) {
          toast.error(error.message)
        } finally {
          setLinkState({
            platform: "Github",
            url: "",
            username: ""
          })
          getLinks()
        }
      } else {
        toast.error("Please add appropriate Link")
      }
    }
  }

  const getLinks = async () => {
    const res = await axios.get("/api/links/read")
    setLinks(res.data.links)
  }

  useEffect(() => {
    getLinks()
  }, [links.length])

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="w-full h-auto mt-16 flex relative p-5">
        <div className="w-[40%] h-full flex items-center justify-evenly max-md:hidden sticky top-20">
          <Image src={Screen} alt="" className="w-auto h-[10%]" />
        </div>
        <div className="w-[60%] h-auto p-[40px] max-md:w-full">
          <div className="w-full h-auto text-zinc-800 text-[32px] font-bold">
            Customize your links
          </div>
          <div className="w-full my-4 text-neutral-500 text-base font-normal leading-normal">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </div>
          <div
            className="add-link w-full h-[48px] my-4 text-violet-500 flex items-center justify-center border border-[#633CFF] hover:bg-violet-100 hover:text-violet-600 cursor-pointer rounded font-semibold"
            onClick={(e: any) => {
              e.target.nextElementSibling.style.display = "block"
            }}
          >
            + Add new link
          </div>
          <div
            className="scale-up-ver-top div w-full h-auto border border-violet-300 p-5"
            style={{ display: "none" }}
          >
            <form onSubmit={submitHandler}>
              <div className="w-full h-auto py-1 flex flex-col justify-between items-center">
                <div className="w-full flex justify-between items-center">
                  <label
                    htmlFor="platforms"
                    className="w-full block mb-2 text-zinc-800 text-base font-normal "
                  >
                    Choose a platform
                  </label>
                  <div
                    className="w-auto cursor-pointer"
                    onClick={(e: any) => {
                      e.target.offsetParent.style.display = "none"
                    }}
                  >
                    X
                  </div>
                </div>
                <select
                  id="platforms"
                  name="platform"
                  className="w-full h-12 outline-none px-5 border  border-zinc-300 focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40 text-violet-600"
                  onChange={onChange}
                  value={platform}
                >
                  <option value="GitHub">GitHub</option>
                  <option value="Frontend Mentor">Frontend Mentor</option>
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitch">Twitch</option>
                  <option value="Dev.to">Dev.to</option>
                  <option value="Codewars">Codewars</option>
                  <option value="Codepen">Codepen</option>
                  <option value="freeCodeCamp">freeCodeCamp</option>
                  <option value="GitLab">GitLab</option>
                  <option value="Hashnode">Hashnode</option>
                  <option value="StackOverflow">Stack Overflow</option>
                </select>
              </div>
              <div className="w-full h-auto py-5 ">
                <label
                  htmlFor="url"
                  className="w-full block mb-1 text-zinc-800 text-base font-normal"
                >
                  Url :
                </label>
                <div className="relative">
                  <Image
                    src={LinkIcon}
                    alt="link"
                    className="absolute top-4 mx-5"
                  />
                  <input
                    type="url"
                    name="url"
                    id="url"
                    value={url}
                    placeholder="https:://github.com/Aditya-Mane007"
                    onChange={onChange}
                    className="w-full h-12 border outline-none px-10 border-zinc-300 focus:border-violet-500 focus:shadow-lg focus:shadow-[#633CFF]/40 text-violet-600"
                  />
                  <div className="error-message absolute top-4 mx-2 right-0 text-sm hidden">
                    Can’t be empty
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full h-12 border text-violet-500 hover:text-white border-violet-500 hover:bg-violet-500 "
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          {links && links.length > 0 ? (
            <div className="w-full">
              <LinksComponent links={links!} getLinks={getLinks} />
            </div>
          ) : (
            <div className="w-full h-[375px] ">
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-[488px] text-center">
                  <div className="flex justify-center my-4">
                    <img
                      src={Empty}
                      alt=""
                      className="w-auto h-auto flex items-center"
                    />
                  </div>
                  <div>
                    <div className="text-center text-zinc-800 text-[32px] font-bold ">
                      Let’s get you started
                    </div>
                    <div className="text-center text-neutral-500 text-base font-normal leading-normal">
                      Use the “Add new link” button to get started. Once you
                      have more than one link, you can reorder and edit them.
                      We’re here to help you share your profiles with everyone!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default page
